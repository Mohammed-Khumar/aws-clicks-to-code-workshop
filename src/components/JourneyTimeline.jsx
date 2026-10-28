import React, { useState } from 'react';
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
  Terminal, 
  ExternalLink,
  Layers,
  Cpu
} from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function JourneyTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const { journeySteps, cloudFormationSnippet } = workshopConfig;
  const [journeyRef, isInView] = useInView({ threshold: 0.15 });

  const stepIcons = {
    cloud: Cloud,
    ec2: Server,
    terminal: ShieldCheck,
    browser: Globe,
    code: FileCode2
  };

  const currentStep = journeySteps[activeStepIndex];
  const CurrentIcon = stepIcons[currentStep.visualType] || Cloud;

  const handlePrev = () => {
    setActiveStepIndex(prev => (prev > 0 ? prev - 1 : journeySteps.length - 1));
  };

  const handleNext = () => {
    setActiveStepIndex(prev => (prev < journeySteps.length - 1 ? prev + 1 : 0));
  };

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(cloudFormationSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  // Render authentic interactive technical visualization based on step
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
                  <span className="az-dot"></span>
                  <span>AZ: ap-south-1a</span>
                </div>
                <div className="blueprint-subnet">
                  <span className="subnet-label">Public Subnet 10.0.1.0/24</span>
                  <div className="blueprint-resource">
                    <Server size={14} className="text-green-highlight" />
                    <span>Target Compute Zone</span>
                  </div>
                </div>
              </div>
              <div className="blueprint-meta-strip">
                <div className="blueprint-meta-item">
                  <span className="meta-key">IGW:</span>
                  <span className="meta-val">igw-08a9b2c3 (Attached)</span>
                </div>
                <div className="blueprint-meta-item">
                  <span className="meta-key">Multi-AZ:</span>
                  <span className="meta-val">Elastic & Resilient</span>
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
                <span className="live-beacon"></span>
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
              <div className="window-dots">
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
              <div className="window-dots">
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
          <h2 className="section-title">The 5-Step Cloud Journey</h2>
          <p className="section-description">
            Follow one connected cloud workflow from fundamental concepts to automated Infrastructure as Code.
          </p>
        </div>

        {/* Step Progress Connecting Line & Desktop Step Navigation */}
        <div className="journey-nav-wrapper">
          <div className="journey-desktop-nav" role="tablist" aria-label="5-Step Journey Navigation">
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
                  className={`journey-step-btn ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                >
                  <div className="step-btn-badge">
                    <span className="step-btn-num">{step.step}</span>
                    <Icon size={15} />
                  </div>
                  <span className="step-btn-label">{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper Progress Bar */}
          <div className="journey-progress-track" aria-hidden="true">
            <div 
              className="journey-progress-fill" 
              style={{ width: `${(activeStepIndex / (journeySteps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Mobile Step Segment Indicator */}
        <div className="journey-mobile-stepper" aria-label="Mobile Step Selector">
          {journeySteps.map((step, idx) => (
            <button
              key={step.step}
              type="button"
              className={`mobile-step-pip ${idx === activeStepIndex ? 'active' : ''}`}
              onClick={() => setActiveStepIndex(idx)}
              aria-label={`Go to Step ${step.step}: ${step.title}`}
            >
              <span>{step.step}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Card with Live Interactive Architecture Sandbox */}
        <div className={`journey-detail-card ${isInView ? 'journey-card-revealed' : ''}`} aria-live="polite">
          <div className="journey-left">
            <div className="journey-tag-row">
              <span className="journey-tag">{currentStep.badgeText}</span>
              <span className="journey-tag journey-tag-sub">
                {currentStep.tag}
              </span>
            </div>

            <h3 className="journey-stage-title">
              {currentStep.step} — {currentStep.title}
            </h3>

            <h4 className="journey-stage-subtitle">
              {currentStep.subtitle}
            </h4>

            <p className="journey-stage-desc">
              {currentStep.description}
            </p>

            <div className="journey-flow-chip">
              <CurrentIcon size={17} className="text-green-highlight" />
              <span>{currentStep.summary}</span>
            </div>

            {/* Step Navigation Controls (Prev / Next) */}
            <div className="journey-nav-controls">
              <button
                type="button"
                className="journey-control-btn"
                onClick={handlePrev}
                aria-label="Previous step"
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>
              
              <div className="journey-step-counter">
                <span>Stage <strong>0{activeStepIndex + 1}</strong> of 05</span>
              </div>

              <button
                type="button"
                className="journey-control-btn journey-control-next"
                onClick={handleNext}
                aria-label="Next step"
              >
                <span>Next Step</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Side: Authentic Technical Architecture Simulator */}
          <div className="journey-right-preview">
            {renderTechnicalVisual()}
          </div>
        </div>
      </div>
    </section>
  );
}
