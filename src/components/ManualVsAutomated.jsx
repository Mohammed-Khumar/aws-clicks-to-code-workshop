import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, Zap, RefreshCw, Clock, ShieldAlert, ShieldCheck } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function ManualVsAutomated() {
  const { comparison } = workshopConfig;
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });
  const [hoveredSide, setHoveredSide] = useState(null);

  const metrics = [
    {
      label: "Provisioning Speed",
      manual: "15+ Minutes",
      automated: "45 Seconds",
      icon: Clock
    },
    {
      label: "Configuration Drift",
      manual: "High Risk",
      automated: "Zero Drift",
      icon: ShieldAlert
    },
    {
      label: "Replication Effort",
      manual: "Manual Repeat",
      automated: "Deterministic",
      icon: RefreshCw
    }
  ];

  return (
    <section id="comparison" className="section-wrapper comparison-section" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isInView ? 'section-revealed' : ''}`}>
          <span className="section-badge">
            <Zap size={13} />
            {comparison.tagline}
          </span>
          <h2 className="section-title">{comparison.title}</h2>
          <p className="section-description">
            Experience the architectural leap from repetitive, error-prone console clicks to reproducible, version-controlled Infrastructure as Code.
          </p>
        </div>

        {/* Quick Comparative Impact Matrix */}
        <div className="comparison-metrics-strip" aria-label="Key Performance Comparison">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-compare-cell">
              <span className="metric-compare-label">{metric.label}</span>
              <div className="metric-compare-values">
                <span className="metric-val-manual">{metric.manual}</span>
                <span className="metric-compare-arrow">→</span>
                <span className="metric-val-automated">{metric.automated}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Showcase */}
        <div className={`comparison-showcase ${isInView ? 'comparison-cards-revealed' : ''}`}>
          {/* Left: MANUAL CONSOLE (Friction & Repetition) */}
          <div 
            className={`comp-panel panel-manual ${hoveredSide === 'manual' ? 'panel-focused' : ''}`}
            onMouseEnter={() => setHoveredSide('manual')}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div className="comp-panel-top">
              <div className="comp-header-left">
                <div className="comp-status-icon icon-manual">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="comp-title">{comparison.manual.title}</h3>
                  <span className="comp-panel-subtitle">AWS Management Console</span>
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
              <ShieldAlert size={14} className="text-amber-highlight" />
              <span>Fragile · Manual drift risk · Hard to replicate</span>
            </div>
          </div>

          {/* Center Transformation Indicator */}
          <div className="comp-shift-arrow" aria-hidden="true">
            <div className="shift-arrow-track">
              <div className="shift-pulse-particle" />
            </div>
            <div className="shift-arrow-circle">
              <ArrowRight size={20} />
            </div>
            <span className="shift-arrow-text">TRANSFORM</span>
          </div>

          {/* Right: AUTOMATED (IaC & Speed) */}
          <div 
            className={`comp-panel panel-automated ${hoveredSide === 'automated' ? 'panel-focused' : ''}`}
            onMouseEnter={() => setHoveredSide('automated')}
            onMouseLeave={() => setHoveredSide(null)}
          >
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
              <ShieldCheck size={14} className="text-green-highlight" />
              <span>Deterministic · Auditable · Replicate anywhere in seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
