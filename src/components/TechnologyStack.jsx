import React, { useState } from 'react';
import { Cloud, Server, ShieldCheck, Globe, FileCode2, Terminal, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function TechnologyStack() {
  const { techStack } = workshopConfig;
  const [activeTier, setActiveTier] = useState(null);
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });

  const stackIcons = {
    Cloud: Cloud,
    Server: Server,
    ShieldCheck: ShieldCheck,
    Globe: Globe,
    FileCode2: FileCode2
  };

  const techSpecs = [
    { tier: "01", tag: "FOUNDATION", spec: "VPC Boundary · Multi-AZ Elasticity", relationship: "Provides network isolation & global compute targets" },
    { tier: "02", tag: "COMPUTE", spec: "Amazon Linux 2023 · t2.micro", relationship: "Executes workload inside on-demand virtual hardware" },
    { tier: "03", tag: "ZERO-TRUST", spec: "IAM Authenticated · No Port 22", relationship: "Provides secure keyless terminal access without SSH keys" },
    { tier: "04", tag: "APPLICATION", spec: "httpd daemon · Port 80 Live", relationship: "Hosts customized HTML webpage & serves web traffic" },
    { tier: "05", tag: "AUTOMATION", spec: "Declarative YAML · Deterministic", relationship: "Codifies all 4 tiers into automated CloudFormation code" }
  ];

  return (
    <section id="stack" className="section-wrapper stack-blueprint-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${isInView ? 'section-revealed' : ''}`}>
          <span className="section-badge">
            <Layers size={13} />
            Cloud Architecture Stack
          </span>
          <h2 className="section-title">THE ENGINEERING STACK</h2>
          <p className="section-description">
            Five precision AWS primitives and services connected into one production-grade infrastructure pipeline.
          </p>
        </div>

        {/* Blueprint Architecture Matrix */}
        <div className={`stack-matrix-container ${isInView ? 'stack-cards-revealed' : ''}`} role="region" aria-label="AWS Infrastructure Architecture Stack">
          {/* Top Circuit Ribbon with Animated Signal Pulse */}
          <div className="stack-circuit-ribbon" aria-hidden="true">
            <div className="circuit-line">
              <div className="circuit-signal-pulse" />
            </div>
            <div className="circuit-nodes">
              {techStack.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`circuit-node-dot ${activeTier === idx ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* 5 Architecture Columns */}
          <div className="stack-tiers-grid">
            {techStack.map((tech, idx) => {
              const Icon = stackIcons[tech.icon] || Server;
              const meta = techSpecs[idx] || { tier: `0${idx + 1}`, tag: tech.category, spec: "AWS Cloud", relationship: "" };
              const isHovered = activeTier === idx;

              return (
                <div
                  key={tech.name}
                  className={`stack-tier-panel ${isHovered ? 'tier-hovered' : ''}`}
                  onMouseEnter={() => setActiveTier(idx)}
                  onMouseLeave={() => setActiveTier(null)}
                  tabIndex={0}
                  role="article"
                  aria-label={`${tech.name} - ${meta.tag}`}
                >
                  {/* Tier Meta Header */}
                  <div className="tier-header-strip">
                    <span className="tier-index">{meta.tier}</span>
                    <span className="tier-tag-pill">{meta.tag}</span>
                  </div>

                  {/* Icon & Service Name */}
                  <div className="tier-main-content">
                    <div className="tier-icon-shield">
                      <Icon size={22} />
                    </div>
                    <h3 className="tier-service-name">{tech.name}</h3>
                    <p className="tier-service-role">{tech.role}</p>
                  </div>

                  {/* Relationship highlight on hover */}
                  <div className="tier-relationship-strip">
                    <span className="relationship-text">{meta.relationship}</span>
                  </div>

                  {/* Technical Spec Chip */}
                  <div className="tier-spec-footer">
                    <Terminal size={12} className="spec-icon" />
                    <span className="tier-spec-text">{meta.spec}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
