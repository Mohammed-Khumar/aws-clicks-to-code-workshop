import React, { useState } from 'react';
import { Cloud, Server, ShieldCheck, Globe, FileCode2, CheckCircle, Terminal } from 'lucide-react';

export default function InfrastructurePipeline() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(1);

  const pipelineStages = [
    {
      id: 'cloud',
      name: 'CLOUD',
      sub: 'AWS Global Infrastructure',
      status: 'PROVISIONING',
      icon: Cloud,
      detail: 'Initiating AWS resource context, VPC boundary, and on-demand compute target.'
    },
    {
      id: 'ec2',
      name: 'EC2',
      sub: 'Amazon Elastic Compute Cloud',
      status: 'RUNNING',
      icon: Server,
      detail: 'Instance t2.micro provisioned with Amazon Linux 2023 AMI. Compute active.'
    },
    {
      id: 'ssm',
      name: 'SESSION MANAGER',
      sub: 'AWS Systems Manager',
      status: 'CONNECTED',
      icon: ShieldCheck,
      detail: 'Zero-trust IAM terminal session established. No SSH key pairs or port 22 exposed.'
    },
    {
      id: 'apache',
      name: 'APACHE & LIVE WEB',
      sub: 'httpd daemon & Custom HTML',
      status: 'WEB LIVE',
      icon: Globe,
      detail: 'Apache daemon running on port 80. Custom HTML webpage accessible via browser.'
    },
    {
      id: 'cfn',
      name: 'CLOUDFORMATION & CODE',
      sub: 'Infrastructure as Code (IaC)',
      status: 'AUTOMATED',
      icon: FileCode2,
      detail: 'Entire server stack translated into declarative YAML for deterministic replication.'
    }
  ];

  const currentNode = pipelineStages[activeNodeIndex];

  return (
    <div className="hero-pipeline-container" aria-label="Interactive Cloud Infrastructure Pipeline">
      {/* Visual Window Bar */}
      <div className="pipeline-window-header">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot dot-red"></span>
          <span className="window-dot dot-yellow"></span>
          <span className="window-dot dot-green"></span>
        </div>
        <span className="pipeline-window-title">infrastructure-pipeline.aws</span>
        <span className="node-status-pill">{currentNode.status}</span>
      </div>

      {/* Pipeline Content */}
      <div className="pipeline-content">
        {/* Nodes Sequence with Continuous Circuit Rail */}
        <div className="pipeline-nodes-flow" role="tablist" aria-label="Pipeline Stage Selector">
          <div className="pipeline-rail-track" aria-hidden="true" />
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = idx === activeNodeIndex;
            const isCompleted = idx < activeNodeIndex;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`infra-node-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setActiveNodeIndex(idx)}
              >
                <div className="node-left-col">
                  <div className="node-icon-bubble">
                    <Icon size={17} />
                  </div>
                  <div className="node-text-col">
                    <span className="node-name">{stage.name}</span>
                    <span className="node-desc">{stage.sub}</span>
                  </div>
                </div>
                <div className="node-status-pill">
                  {stage.status}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Active Node Terminal Log */}
        <div className="pipeline-footer-info" aria-live="polite">
          <Terminal size={16} className="terminal-log-icon" />
          <div className="terminal-log-content">
            <span className="terminal-prompt">$ state &gt;</span>
            <span className="terminal-log-detail">{currentNode.detail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
