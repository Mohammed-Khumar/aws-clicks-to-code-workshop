import React, { useState } from 'react';
import { 
  Cloud, 
  Server, 
  ShieldCheck, 
  Globe, 
  FileCode2, 
  Terminal, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function TechnologyStack() {
  const [activeTier, setActiveTier] = useState(null);
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });

  const architectureLayers = [
    {
      tier: "01",
      name: "AWS Global Cloud",
      category: "FOUNDATION & REGION",
      icon: Cloud,
      role: "Provides regional boundary in Mumbai (ap-south-1), Multi-AZ resilience, and isolated VPC routing.",
      spec: "VPC: 10.0.0.0/16 · IGW Attached",
      connectorToNext: "Hosts Compute Hardware"
    },
    {
      tier: "02",
      name: "Amazon EC2",
      category: "COMPUTE CAPACITY",
      icon: Server,
      role: "Virtual compute instance (t2.micro) running Amazon Linux 2023 with elastic hardware sizing.",
      spec: "1 vCPU · 1 GiB RAM · AL2023",
      connectorToNext: "Secured via IAM Roles"
    },
    {
      tier: "03",
      name: "AWS Systems Manager",
      category: "ZERO-TRUST CONTROL PLANE",
      icon: ShieldCheck,
      role: "Enables keyless terminal administration directly through the browser. Port 22 is closed with zero SSH keys.",
      spec: "IAM Policy Access · Encrypted Channel",
      connectorToNext: "Bootstraps Web Daemon"
    },
    {
      tier: "04",
      name: "Apache HTTP Server",
      category: "APPLICATION DELIVERY",
      icon: Globe,
      role: "Runs httpd web service on port 80 to deliver customized workshop HTML pages across the public internet.",
      spec: "Daemon: httpd · Port 80 Live",
      connectorToNext: "Codified into Declarative Template"
    },
    {
      tier: "05",
      name: "AWS CloudFormation",
      category: "INFRASTRUCTURE AS CODE",
      icon: FileCode2,
      role: "Translates all compute, networking, and security configurations into a single reproducible YAML template.",
      spec: "Deterministic IaC · 45s Deployment",
      connectorToNext: null
    }
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
            How five AWS primitives and software layers interlock into a unified, production-grade cloud delivery pipeline.
          </p>
        </div>

        {/* Connected Architecture Blueprint Pipeline */}
        <div 
          className={`stack-architecture-flow ${isInView ? 'stack-cards-revealed' : ''}`} 
          role="region" 
          aria-label="Connected AWS Cloud Architecture Pipeline"
        >
          {/* Top Bus Line with Traveling Signal Pulse */}
          <div className="stack-bus-track" aria-hidden="true">
            <div className="bus-signal-pulse" />
          </div>

          {/* Sequential Interlocking Layers */}
          <div className="architecture-layers-grid">
            {architectureLayers.map((layer, idx) => {
              const Icon = layer.icon;
              const isHovered = activeTier === idx;
              const isRelated = activeTier !== null && (activeTier === idx || activeTier === idx - 1 || activeTier === idx + 1);

              return (
                <div
                  key={layer.name}
                  className={`architecture-tier-card ${isHovered ? 'tier-active' : ''} ${isRelated ? 'tier-related' : ''}`}
                  onMouseEnter={() => setActiveTier(idx)}
                  onMouseLeave={() => setActiveTier(null)}
                  tabIndex={0}
                  role="article"
                  aria-label={`${layer.name} (${layer.category}): ${layer.role}`}
                >
                  {/* Tier Sequence & Domain Tag */}
                  <div className="tier-meta-bar">
                    <span className="tier-sequence-code">LAYER {layer.tier}</span>
                    <span className="tier-category-pill">{layer.category}</span>
                  </div>

                  {/* Icon & Core Title */}
                  <div className="tier-hero-block">
                    <div className="tier-service-icon-wrap">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="tier-display-name">{layer.name}</h3>
                      <div className="tier-spec-chip">
                        <Terminal size={11} className="spec-chip-icon text-green-highlight" />
                        <span>{layer.spec}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role & Workshop Participation */}
                  <p className="tier-narrative-role">
                    {layer.role}
                  </p>

                  {/* Inter-Service Relationship Connector */}
                  {layer.connectorToNext && (
                    <div className="tier-downstream-bridge" aria-hidden="true">
                      <span className="bridge-arrow-icon">↓</span>
                      <span className="bridge-text">{layer.connectorToNext}</span>
                      <ArrowRight size={13} className="bridge-arrow-desktop" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
