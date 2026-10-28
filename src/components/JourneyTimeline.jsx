import React, { useState, useRef } from 'react';
import { 
  Cloud, 
  Server, 
  ShieldCheck, 
  Globe, 
  FileCode2, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function JourneyTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const { journeySteps, cloudFormationSnippet } = workshopConfig;
  const [journeyRef, isInView] = useInView({ threshold: 0.1 });
  const railRef = useRef(null);

  const stepIcons = {
    cloud: Cloud,
    ec2: Server,
    terminal: ShieldCheck,
    browser: Globe,
    code: FileCode2
  };

  // Stage concrete technical takeaways
  const stageTakeaways = [
    [
      "Define regional boundaries and Multi-AZ resilience in Mumbai (ap-south-1).",
      "Configure VPC CIDR block (10.0.0.0/16) and target public subnets.",
      "Attach Internet Gateway (IGW) for route-table managed public accessibility."
    ],
    [
      "Choose instance sizing (t2.micro) on the AWS Management Console.",
      "Select Amazon Linux 2023 AMI with optimized kernel performance.",
      "Configure Security Group rules authorizing inbound web traffic on port 80."
    ],
    [
      "Eliminate SSH key pair distribution and open inbound port 22.",
      "Authenticate via AWS IAM Zero-Trust roles with instant audit trails.",
      "Access interactive web shell directly inside the browser using AWS Systems Manager."
    ],
    [
      "Install and activate Apache HTTP Server (httpd) daemon in Amazon Linux.",
      "Create and style a custom HTML index document for the workshop.",
      "Validate public web delivery over port 80 with live HTTP 200 responses."
    ],
    [
      "Translate all manual console choices into a single declarative YAML template.",
      "Automate compute, networking, and UserData bootstrapping.",
      "Achieve instant deterministic replication across any AWS Region with zero drift."
    ]
  ];

  const currentStep = journeySteps[activeStepIndex];

  const handlePrev = () => {
    setActiveStepIndex(prev => (prev > 0 ? prev - 1 : journeySteps.length - 1));
  };

  const handleNext = () => {
    setActiveStepIndex(prev => (prev < journeySteps.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(cloudFormationSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  // Render authentic interactive technical visualization based on active step
  const renderTechnicalVisual = () => {
    switch (currentStep.visualType) {
      case 'cloud':
        return (
          <div className="tech-visual-card visual-blueprint" aria-label="AWS Architecture Blueprint">
            <div className="blueprint-header">
              <span className="blueprint-title">REGION: ap-south-1 (MUMBAI)</span>
              <span className="blueprint-tag">VPC: 10.0.0.0/16</span>
            </div>
            <div className="blueprint-body">
              <div className="blueprint-az-box">
                <div className="az-header">
                  <span className="az-dot" aria-hidden="true"></span>
                  <span>AZ: ap-south-1a</span>
                </div>
                <div className="blueprint-subnet">
                  <span className="subnet-label">Public Subnet 10.0.1.0/24</span>
                  <div className="blueprint-resource">
                    <Server size={14} className="text-green-highlight" />
                    <span>Target Compute Zone · Elastic Workload</span>
                  </div>
                </div>
              </div>
              <div className="blueprint-meta-strip">
                <div className="blueprint-meta-item">
                  <span className="meta-key">IGW:</span>
                  <span className="meta-val">igw-08a9b2c3 (Attached)</span>
                </div>
                <div className="blueprint-meta-item">
                  <span className="meta-key">High Availability:</span>
                  <span className="meta-val">Multi-AZ Ready</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ec2':
        return (
          <div className="tech-visual-card visual-console" aria-label="Amazon EC2 Console Inspector">
            <div className="console-spec-header">
              <span className="console-spec-title">EC2 / Instance Details</span>
              <span className="status-badge-running">
                <span className="live-beacon" aria-hidden="true"></span>
                running
              </span>
            </div>
            <div className="console-spec-grid">
              <div className="spec-row">
                <span className="spec-label">Instance ID:</span>
                <span className="spec-value mono">i-08ab34f9ec2</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Instance Type:</span>
                <span className="spec-value highlight">t2.micro (1 vCPU, 1 GiB)</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">AMI:</span>
                <span className="spec-value">Amazon Linux 2023 (x86_64)</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Public IPv4:</span>
                <span className="spec-value mono">13.233.94.102</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Security Group:</span>
                <span className="spec-value">launch-wizard-1 (Inbound: 80, 443)</span>
              </div>
            </div>
          </div>
        );

      case 'terminal':
        return (
          <div className="tech-visual-card visual-terminal" aria-label="AWS Systems Manager Terminal Session">
            <div className="ssm-terminal-bar">
              <div className="window-dots" aria-hidden="true">
                <span className="window-dot dot-red"></span>
                <span className="window-dot dot-yellow"></span>
                <span className="window-dot dot-green"></span>
              </div>
              <span className="ssm-title">aws-ssm-session-manager</span>
              <span className="ssm-auth-pill">IAM Zero-Trust</span>
            </div>
            <div className="ssm-terminal-content">
              <p className="terminal-line text-muted"># Connected via AWS Systems Manager</p>
              <p className="terminal-line text-muted"># Port 22 Closed · No SSH key pairs</p>
              <p className="terminal-line"><span className="text-green-highlight">sh-5.2$</span> whoami</p>
              <p className="terminal-line text-accent">ssm-user (UID=1001)</p>
              <p className="terminal-line"><span className="text-green-highlight">sh-5.2$</span> aws sts get-caller-identity</p>
              <p className="terminal-line text-muted">{"Arn: .../role/EC2SSMAccessRole"}</p>
              <p className="terminal-line terminal-cursor"><span className="text-green-highlight">sh-5.2$</span> <span className="blinking-caret">_</span></p>
            </div>
          </div>
        );

      case 'browser':
        return (
          <div className="tech-visual-card visual-browser" aria-label="Live Webpage Rendered in Browser">
            <div className="browser-address-bar">
              <div className="window-dots" aria-hidden="true">
                <span className="window-dot dot-red"></span>
                <span className="window-dot dot-yellow"></span>
                <span className="window-dot dot-green"></span>
              </div>
              <div className="url-bar-display">
                <Globe size={12} className="text-green-highlight" />
                <span className="url-text">http://13.233.94.102:80/</span>
              </div>
              <span className="http-status-pill">200 OK</span>
            </div>
            <div className="browser-page-preview">
              <div className="preview-page-hero">
                <span className="preview-page-badge">AWS SBG EC2 Workshop</span>
                <h4 className="preview-page-h1">Web Server Live</h4>
                <p className="preview-page-p">Powered by Apache httpd on Amazon Linux 2023</p>
              </div>
            </div>
          </div>
        );

      case 'code':
      default:
        return (
          <div className="tech-visual-card visual-code" aria-label="Declarative CloudFormation YAML Template">
            <div className="code-viewer-bar">
              <div className="code-viewer-left">
                <FileCode2 size={14} className="text-blue-highlight" />
                <span className="code-filename">template.yaml</span>
              </div>
              <button
                type="button"
                className="code-copy-btn"
                onClick={handleCopyYaml}
                aria-label="Copy CloudFormation YAML"
                title="Copy template"
              >
                {copiedCode ? (
                  <>
                    <Check size={13} className="text-green-highlight" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy YAML</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-pre-stream">
              <code>{cloudFormationSnippet.slice(0, 360)}...</code>
            </pre>
          </div>
        );
    }
  };

  return (
    <section id="journey" className="section-wrapper journey-section" ref={journeyRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${isInView ? 'section-revealed' : ''}`}>
          <span className="section-badge">
            <Layers size={13} />
            The Core Experience
          </span>
          <h2 className="section-title">THE 5-STEP CLOUD JOURNEY</h2>
          <p className="section-description">
            A continuous engineering journey: from foundational cloud concepts to hands-on compute, secure IAM terminal access, and automated Infrastructure as Code.
          </p>
        </div>

        {/* Continuous Interactive Highway Rail */}
        <div 
          className="journey-highway-container"
          ref={railRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Interactive 5-Stage Infrastructure Timeline (Use Left and Right arrow keys to navigate)"
        >
          {/* Continuous Connected Progress Track */}
          <div className="journey-rail-track" aria-hidden="true">
            <div 
              className="journey-rail-fill" 
              style={{ width: `${(activeStepIndex / (journeySteps.length - 1)) * 100}%` }}
            />
          </div>

          {/* 5 Milestone Highway Nodes */}
          <div className="journey-milestones-row" role="tablist">
            {journeySteps.map((step, idx) => {
              const Icon = stepIcons[step.visualType] || Cloud;
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`journey-milestone-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                  title={`Stage ${step.step}: ${step.title}`}
                >
                  <div className="milestone-badge-bubble">
                    {isPast ? (
                      <Check size={14} className="milestone-past-check" />
                    ) : (
                      <span className="milestone-step-num">{step.step}</span>
                    )}
                    <Icon size={14} className="milestone-icon" />
                  </div>
                  <div className="milestone-label-col">
                    <span className="milestone-title">{step.title}</span>
                    <span className="milestone-domain">{step.tag}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Architectural Workbench Showcase */}
        <div className={`journey-workbench ${isInView ? 'journey-card-revealed' : ''}`} aria-live="polite">
          {/* Left Column: Editorial Deep-Dive */}
          <div className="journey-editorial-col">
            <div className="journey-editorial-eyebrow">
              <span className="stage-counter-pill">STAGE {currentStep.step} OF 05</span>
              <span className="stage-domain-tag">{currentStep.tag}</span>
            </div>

            <h3 className="journey-editorial-title">
              {currentStep.title} — {currentStep.subtitle}
            </h3>

            <p className="journey-editorial-desc">
              {currentStep.description}
            </p>

            {/* Key Technical Takeaways */}
            <div className="stage-takeaways-block">
              <h4 className="takeaways-header">
                <Sparkles size={13} className="text-green-highlight" />
                <span>Key Technical Capabilities:</span>
              </h4>
              <ul className="takeaways-list">
                {stageTakeaways[activeStepIndex]?.map((takeaway, i) => (
                  <li key={i} className="takeaway-item">
                    <CheckCircle2 size={14} className="takeaway-icon text-green-highlight" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stage Navigation & Controls */}
            <div className="journey-controls-row">
              <button
                type="button"
                className="journey-nav-btn btn-prev"
                onClick={handlePrev}
                aria-label="Previous stage"
              >
                <ArrowLeft size={15} />
                <span>Previous Stage</span>
              </button>

              <span className="journey-nav-hint" aria-hidden="true">
                Press <strong>←</strong> or <strong>→</strong> to navigate
              </span>

              <button
                type="button"
                className="journey-nav-btn btn-next"
                onClick={handleNext}
                aria-label="Next stage"
              >
                <span>Next Stage</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Architecture Sandbox */}
          <div className="journey-canvas-col">
            {renderTechnicalVisual()}
          </div>
        </div>
      </div>
    </section>
  );
}
