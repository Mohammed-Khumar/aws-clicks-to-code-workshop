import React, { useState } from 'react';
import { Cloud, Server, ShieldCheck, Globe, FileCode2, Cpu, Terminal, Layers } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function TechnologyStack() {
  const { techStack } = workshopConfig;
  const [activeTier, setActiveTier] = useState(null);

  const stackIcons = {
    Cloud: Cloud,
    Server: Server,
    ShieldCheck: ShieldCheck,
    Globe: Globe,
    FileCode2: FileCode2
  };

  const techSpecs = [
    { tier: "01", tag: "FOUNDATION", spec: "VPC Boundary · Multi-AZ Elasticity" },
    { tier: "02", tag: "COMPUTE", spec: "Amazon Linux 2023 · t2.micro" },
    { tier: "03", tag: "ZERO-TRUST ACCESS", spec: "IAM Authenticated · No Port 22" },
    { tier: "04", tag: "APPLICATION", spec: "httpd daemon · Port 80 Live" },
    { tier: "05", tag: "AUTOMATION", spec: "Declarative YAML · Deterministic" }
  ];

  return (
    <section id="stack" className="section-wrapper stack-blueprint-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <Layers size={14} />
            Cloud Architecture Stack
          </span>
          <h2 className="section-title">THE ENGINEERING STACK</h2>
          <p className="section-description">
            Five precision AWS primitives and services connected into one production-grade infrastructure pipeline.
          </p>
        </div>

        {/* Blueprint Architecture Matrix */}
        <div className="stack-matrix-container" role="region" aria-label="AWS Infrastructure Architecture Stack">
          {/* Top Circuit Ribbon */}
          <div className="stack-circuit-ribbon" aria-hidden="true">
            <div className="circuit-line"></div>
            <div className="circuit-nodes">
              {techStack.map((_, idx) => (
                <span key={idx} className={`circuit-node-dot ${activeTier === idx ? 'active' : ''}`} />
              ))}
            </div>
          </div>

          {/* 5 Architecture Columns */}
          <div className="stack-tiers-grid">
            {techStack.map((tech, idx) => {
              const Icon = stackIcons[tech.icon] || Server;
              const meta = techSpecs[idx] || { tier: `0${idx + 1}`, tag: tech.category, spec: "AWS Cloud" };
              const isHovered = activeTier === idx;

              return (
                <div
                  key={tech.name}
                  className={`stack-tier-panel ${isHovered ? 'tier-hovered' : ''}`}
                  onMouseEnter={() => setActiveTier(idx)}
                  onMouseLeave={() => setActiveTier(null)}
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
