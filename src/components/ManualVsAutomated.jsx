import React from 'react';
import { 
  ArrowRight, 
  Zap, 
  RefreshCw, 
  Clock, 
  ShieldAlert, 
  ShieldCheck,
  MousePointerClick,
  FileCode2,
  Sparkles
} from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function ManualVsAutomated() {
  const { comparison } = workshopConfig;
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });

  const metrics = [
    {
      label: "Provisioning Speed",
      manual: "15+ Minutes",
      automated: "45 Seconds",
      icon: Clock,
      note: "20x Faster Execution"
    },
    {
      label: "Configuration Drift",
      manual: "High Risk",
      automated: "Zero Drift",
      icon: ShieldAlert,
      note: "100% Deterministic"
    },
    {
      label: "Replication Effort",
      manual: "Manual Repeat",
      automated: "1-Click Deploy",
      icon: RefreshCw,
      note: "Infinite Repeatability"
    }
  ];

  const manualSteps = [
    { num: "01", action: "Console Navigation", detail: "Log into AWS console and browse to EC2 service dashboard." },
    { num: "02", action: "Manual Form Wizard", detail: "Click through 15+ form fields, sizing parameters, and AMI dropdowns." },
    { num: "03", action: "Unverified Network Config", detail: "Hand-select VPC, subnet, and open inbound port rules." },
    { num: "04", action: "Key Pair Generation", detail: "Download and safeguard fragile PEM private keys onto local drive." },
    { num: "05", action: "Manual Repetition", detail: "Must repeat every manual step from scratch for each environment." }
  ];

  const automatedSteps = [
    { num: "01", action: "Single Declarative Template", detail: "Write infrastructure requirements as code in template.yaml." },
    { num: "02", action: "Version Control Integration", detail: "Commit template into Git with complete audit history and team reviews." },
    { num: "03", action: "Automated UserData Scripts", detail: "Bootstrap Apache, dependencies, and web pages automatically upon boot." },
    { num: "04", action: "Zero-Trust IAM Governance", detail: "Standardized Session Manager IAM policies deployed with instance." },
    { num: "05", action: "Instant Replication", detail: "Deploy identical production stack anywhere via one CLI command." }
  ];

  return (
    <section id="comparison" className="section-wrapper comparison-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${isInView ? 'section-revealed' : ''}`}>
          <span className="section-badge">
            <Zap size={13} />
            {comparison.tagline}
          </span>
          <h2 className="section-title">{comparison.title}</h2>
          <p className="section-description">
            Experience the architectural breakthrough: replace repetitive, error-prone console clicks with auditable, version-controlled Infrastructure as Code.
          </p>
        </div>

        {/* Quick Comparative Impact Matrix */}
        <div className="comparison-metrics-strip" aria-label="Key Performance Comparison">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-compare-cell">
              <div className="metric-cell-top">
                <span className="metric-compare-label">{metric.label}</span>
                <span className="metric-note-tag">{metric.note}</span>
              </div>
              <div className="metric-compare-values">
                <span className="metric-val-manual" title="Manual console approach">
                  {metric.manual}
                </span>
                <span className="metric-compare-arrow" aria-hidden="true">→</span>
                <span className="metric-val-automated" title="Automated CloudFormation approach">
                  {metric.automated}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* The Transformation Runway */}
        <div className={`transformation-runway ${isInView ? 'comparison-cards-revealed' : ''}`}>
          {/* Left: MANUAL CONSOLE WORKFLOW (Friction & Drift) */}
          <div className="runway-lane lane-manual" role="region" aria-label="Manual Console Workflow">
            <div className="lane-header">
              <div className="lane-header-left">
                <div className="lane-icon-bubble icon-manual">
                  <MousePointerClick size={20} />
                </div>
                <div>
                  <h3 className="lane-title">{comparison.manual.title}</h3>
                  <span className="lane-badge badge-manual">5 Manual Friction Steps</span>
                </div>
              </div>
            </div>

            <p className="lane-description">
              {comparison.manual.description}
            </p>

            {/* Sequential Visual Chain */}
            <div className="lane-steps-chain" role="list">
              {manualSteps.map((step) => (
                <div key={step.num} className="step-chain-node node-manual" role="listitem">
                  <div className="node-indicator">
                    <span className="node-num manual-num">{step.num}</span>
                    <span className="node-connector-line" aria-hidden="true" />
                  </div>
                  <div className="node-content">
                    <strong className="node-action">{step.action}</strong>
                    <span className="node-detail">{step.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lane-footer footer-manual">
              <ShieldAlert size={15} className="text-amber-highlight" />
              <span>Fragile · High risk of human error · Cannot be peer-reviewed</span>
            </div>
          </div>

          {/* Center Transformation Bridge */}
          <div className="runway-transformation-bridge" aria-hidden="true">
            <div className="bridge-track">
              <div className="bridge-pulse-particle" />
            </div>
            <div className="bridge-badge">
              <Sparkles size={14} className="text-green-highlight" />
              <span>TRANSFORM</span>
              <ArrowRight size={14} className="text-green-highlight" />
            </div>
          </div>

          {/* Right: AUTOMATED CLOUDFORMATION WORKFLOW (Deterministic IaC) */}
          <div className="runway-lane lane-automated" role="region" aria-label="Automated Infrastructure as Code Workflow">
            <div className="lane-header">
              <div className="lane-header-left">
                <div className="lane-icon-bubble icon-automated">
                  <FileCode2 size={20} />
                </div>
                <div>
                  <h3 className="lane-title">{comparison.automated.title}</h3>
                  <span className="lane-badge badge-automated">1 Declarative Action</span>
                </div>
              </div>
            </div>

            <p className="lane-description">
              {comparison.automated.description}
            </p>

            {/* Sequential Visual Chain */}
            <div className="lane-steps-chain" role="list">
              {automatedSteps.map((step) => (
                <div key={step.num} className="step-chain-node node-automated" role="listitem">
                  <div className="node-indicator">
                    <span className="node-num automated-num">{step.num}</span>
                    <span className="node-connector-line" aria-hidden="true" />
                  </div>
                  <div className="node-content">
                    <strong className="node-action">{step.action}</strong>
                    <span className="node-detail">{step.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lane-footer footer-automated">
              <ShieldCheck size={15} className="text-green-highlight" />
              <span>Deterministic · Auditable in Git · Replicate in 45 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
