import React, { useState, useEffect, useRef } from 'react';
import { Cloud, Server, ShieldCheck, Globe, FileCode2, Terminal, Play, Pause, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function InfrastructurePipeline() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const pipelineStages = [
    {
      id: 'cloud',
      name: 'CLOUD',
      sub: 'AWS Global Infrastructure',
      status: 'PROVISIONING',
      statusType: 'blue',
      icon: Cloud,
      command: 'aws ec2 create-vpc --cidr-block 10.0.0.0/16 --region ap-south-1',
      output: 'VPC vpc-09a8f2 initialized [available · ap-south-1 Mumbai]',
      detail: 'Initiating AWS resource context, VPC boundary, and on-demand compute target.'
    },
    {
      id: 'ec2',
      name: 'EC2',
      sub: 'Amazon Elastic Compute Cloud',
      status: 'RUNNING',
      statusType: 'green',
      icon: Server,
      command: 'aws ec2 run-instances --instance-type t2.micro --image-id ami-al2023',
      output: 'Instance i-08ab34f9ec2 is active [t2.micro · 13.233.94.102]',
      detail: 'Instance t2.micro provisioned with Amazon Linux 2023 AMI. Compute active.'
    },
    {
      id: 'ssm',
      name: 'SESSION MANAGER',
      sub: 'AWS Systems Manager',
      status: 'CONNECTED',
      statusType: 'green',
      icon: ShieldCheck,
      command: 'aws ssm start-session --target i-08ab34f9ec2',
      output: 'Zero-trust IAM terminal connected [Port 22 Closed · No SSH keys]',
      detail: 'Zero-trust IAM terminal session established. No SSH key pairs or port 22 exposed.'
    },
    {
      id: 'apache',
      name: 'APACHE & LIVE WEB',
      sub: 'httpd daemon & Custom HTML',
      status: 'WEB LIVE',
      statusType: 'green',
      icon: Globe,
      command: 'sudo systemctl start httpd && curl -I http://localhost:80',
      output: 'HTTP/1.1 200 OK · Web service live at http://13.233.94.102:80',
      detail: 'Apache daemon running on port 80. Custom HTML webpage accessible via browser.'
    },
    {
      id: 'cfn',
      name: 'CLOUDFORMATION & CODE',
      sub: 'Infrastructure as Code (IaC)',
      status: 'AUTOMATED',
      statusType: 'blue',
      icon: FileCode2,
      command: 'aws cloudformation deploy --template-file template.yaml --stack-name EC2-Stack',
      output: 'Stack EC2-Stack: CREATE_COMPLETE [100% deterministic & repeatable]',
      detail: 'Entire server stack translated into declarative YAML for deterministic replication.'
    }
  ];

  // Auto-play through stages smoothly
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    timerRef.current = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % pipelineStages.length);
    }, 4200);

    return () => clearInterval(timerRef.current);
  }, [isAutoPlaying, isHovered, pipelineStages.length]);

  const handleStageSelect = (idx) => {
    setActiveNodeIndex(idx);
    // Pause auto-play temporarily on manual click
    setIsAutoPlaying(false);
  };

  const currentNode = pipelineStages[activeNodeIndex];
  const CurrentIcon = currentNode.icon;

  return (
    <div 
      className="hero-pipeline-container" 
      aria-label="Interactive Cloud Infrastructure Pipeline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Window Bar */}
      <div className="pipeline-window-header">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot dot-red"></span>
          <span className="window-dot dot-yellow"></span>
          <span className="window-dot dot-green"></span>
        </div>
        <div className="pipeline-window-title-wrap">
          <span className="pipeline-window-title">infrastructure-pipeline.aws</span>
          <span className="pipeline-region-pill">ap-south-1</span>
        </div>
        
        <div className="pipeline-window-actions">
          {/* Autoplay toggle */}
          <button
            type="button"
            className={`pipeline-mode-btn ${isAutoPlaying ? 'active' : ''}`}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pause automatic progression" : "Play automatic progression"}
            title={isAutoPlaying ? "Pause progression" : "Auto-cycle progression"}
          >
            {isAutoPlaying ? (
              <>
                <span className="pulse-beacon" aria-hidden="true" />
                <span>LIVE</span>
              </>
            ) : (
              <>
                <Play size={10} />
                <span>STEP</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pipeline Content */}
      <div className="pipeline-content">
        {/* Nodes Sequence with Continuous Circuit Rail */}
        <div className="pipeline-nodes-flow" role="tablist" aria-label="Pipeline Stage Selector">
          {/* Dynamic connecting rail line */}
          <div className="pipeline-rail-track" aria-hidden="true">
            <div 
              className="pipeline-rail-fill" 
              style={{ height: `${(activeNodeIndex / (pipelineStages.length - 1)) * 100}%` }}
            />
          </div>

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
                tabIndex={isActive ? 0 : -1}
                className={`infra-node-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleStageSelect(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    handleStageSelect((idx + 1) % pipelineStages.length);
                  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    handleStageSelect((idx - 1 + pipelineStages.length) % pipelineStages.length);
                  }
                }}
              >
                <div className="node-left-col">
                  <div className="node-icon-bubble">
                    <Icon size={17} />
                  </div>
                  <div className="node-text-col">
                    <div className="node-title-row">
                      <span className="node-step-index">0{idx + 1}</span>
                      <span className="node-name">{stage.name}</span>
                    </div>
                    <span className="node-desc">{stage.sub}</span>
                  </div>
                </div>

                <div className={`node-status-pill status-${stage.statusType}`}>
                  {stage.status}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Active Node Terminal Log */}
        <div className="pipeline-footer-info" aria-live="polite">
          <div className="terminal-header-bar">
            <div className="terminal-header-left">
              <Terminal size={14} className="terminal-log-icon" />
              <span className="terminal-console-tab">bash — aws-cli</span>
            </div>
            <span className="terminal-active-step">Stage 0{activeNodeIndex + 1} of 05</span>
          </div>

          <div className="terminal-body-stream">
            <div className="terminal-cmd-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-cmd-text">{currentNode.command}</span>
            </div>
            <div className="terminal-res-line">
              <span className="terminal-arrow">&gt;</span>
              <span className="terminal-res-text">{currentNode.output}</span>
            </div>
            <div className="terminal-detail-note">
              <span className="terminal-note-tag">STATE</span>
              <span className="terminal-log-detail">{currentNode.detail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
