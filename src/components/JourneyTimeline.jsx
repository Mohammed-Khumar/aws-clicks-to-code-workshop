import React, { useState } from 'react';
import { Cloud, Server, ShieldCheck, Globe, FileCode2, ArrowRight, ArrowLeft } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function JourneyTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { journeySteps } = workshopConfig;

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

  return (
    <section id="journey" className="section-wrapper journey-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">The Core Experience</span>
          <h2 className="section-title">The 5-Step Cloud Journey</h2>
          <p className="section-description">
            Follow one connected cloud workflow from fundamental concepts to automated Infrastructure as Code.
          </p>
        </div>

        {/* Desktop Step Navigation */}
        <div className="journey-desktop-nav" role="tablist" aria-label="5-Step Journey Navigation">
          {journeySteps.map((step, idx) => {
            const Icon = stepIcons[step.visualType] || Cloud;
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.step}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`journey-step-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
              >
                <span className="step-btn-num">{step.step}</span>
                <Icon size={16} />
                <span className="step-btn-label">{step.title}</span>
              </button>
            );
          })}
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

        {/* Active Step Showcase Card */}
        <div className="journey-detail-card" aria-live="polite">
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
              <CurrentIcon size={18} className="text-green-highlight" />
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
              <span className="journey-step-counter">
                {activeStepIndex + 1} / {journeySteps.length}
              </span>
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

          <div className="journey-right-preview">
            <div className="preview-icon-wrapper">
              <CurrentIcon size={36} />
            </div>
            <div className="preview-badge-label">
              {currentStep.badgeText}
            </div>
            <p className="preview-badge-sub">
              {currentStep.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
