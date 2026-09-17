import React from 'react';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function ManualVsAutomated() {
  const { comparison } = workshopConfig;

  return (
    <section id="comparison" className="section-wrapper comparison-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">{comparison.tagline}</span>
          <h2 className="section-title">{comparison.title}</h2>
          <p className="section-description">
            Experience the architectural leap from repetitive, error-prone console clicks to reproducible, version-controlled Infrastructure as Code.
          </p>
        </div>

        <div className="comparison-showcase">
          {/* Left: MANUAL CONSOLE (Friction & Repetition) */}
          <div className="comp-panel panel-manual">
            <div className="comp-panel-top">
              <div className="comp-header-left">
                <div className="comp-status-icon icon-manual">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="comp-title">{comparison.manual.title}</h3>
                  <span className="comp-panel-subtitle">AWS Console Management</span>
                </div>
              </div>
              <span className="comp-badge badge-manual">5 Manual Steps</span>
            </div>

            <p className="comp-desc">{comparison.manual.description}</p>

            <div className="comp-steps-list">
              {comparison.manual.steps.map((step, idx) => (
                <div key={step.label} className="comp-step-item item-manual">
                  <span className="comp-step-index manual-idx">0{idx + 1}</span>
                  <div className="comp-step-text">
                    <strong>{step.label}</strong>
                    <span>{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="comp-panel-footer footer-manual">
              <span>⚠️ Fragile · Manual drift risk · Hard to replicate</span>
            </div>
          </div>

          {/* Center Transformation Indicator */}
          <div className="comp-shift-arrow" aria-hidden="true">
            <div className="shift-arrow-circle">
              <ArrowRight size={20} />
            </div>
            <span className="shift-arrow-text">CODIFIED</span>
          </div>

          {/* Right: AUTOMATED (IaC & Speed) */}
          <div className="comp-panel panel-automated">
            <div className="comp-panel-top">
              <div className="comp-header-left">
                <div className="comp-status-icon icon-automated">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="comp-title">{comparison.automated.title}</h3>
                  <span className="comp-panel-subtitle">Infrastructure as Code</span>
                </div>
              </div>
              <span className="comp-badge badge-automated">1 Declarative Action</span>
            </div>

            <p className="comp-desc">{comparison.automated.description}</p>

            <div className="comp-steps-list">
              {comparison.automated.steps.map((step, idx) => (
                <div key={step.label} className="comp-step-item item-automated">
                  <span className="comp-step-index automated-idx">0{idx + 1}</span>
                  <div className="comp-step-text">
                    <strong>{step.label}</strong>
                    <span>{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="comp-panel-footer footer-automated">
              <span>✓ Deterministic · Auditable · Replicate anywhere in seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
