import React from 'react';
import { UserCheck, ShieldCheck, Award, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function SpeakerSection() {
  const { speaker } = workshopConfig;

  const focusAreas = [
    {
      title: "Cloud Infrastructure Architecture",
      desc: "Deep dive into on-demand compute, VPC context, and scalable cloud primitives."
    },
    {
      title: "Zero-Trust Instance Access",
      desc: "Replacing vulnerable port 22 and SSH key pairs with IAM-governed Session Manager."
    },
    {
      title: "From Clicks to Declarative IaC",
      desc: "Codifying manual console steps into production-grade CloudFormation YAML templates."
    }
  ];

  return (
    <section id="speaker" className="section-wrapper speaker-editorial-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <Award size={14} />
            Guest Speaker &amp; Guide
          </span>
          <h2 className="section-title">Guiding Your Cloud Journey</h2>
          <p className="section-description">
            Learn directly from an experienced technology leader in an intensive, hands-on masterclass.
          </p>
        </div>

        {/* Editorial Masterclass Showcase */}
        <div className="speaker-spotlight-card">
          {/* Left Column: Portrait & Technical Reticle Framing */}
          <div className="speaker-portrait-col">
            <div className="portrait-frame">
              {/* Technical Reticle Corners */}
              <div className="reticle-corner reticle-tl" aria-hidden="true">+</div>
              <div className="reticle-corner reticle-tr" aria-hidden="true">+</div>
              <div className="reticle-corner reticle-bl" aria-hidden="true">+</div>
              <div className="reticle-corner reticle-br" aria-hidden="true">+</div>

              <img
                src={speaker.image}
                alt={`${speaker.name} - ${speaker.role}`}
                className="speaker-portrait-img"
                loading="lazy"
              />

              {/* Chapter Leadership Badge */}
              <div className="portrait-chapter-tag">
                <Sparkles size={13} className="text-green-highlight" />
                <span>Lead @ HerTechEra – Pune</span>
              </div>
            </div>

            {/* Quick Expertise Ticker */}
            <div className="speaker-skills-ticker">
              <span className="skill-tag">AWS Cloud</span>
              <span className="skill-tag">DevSecOps</span>
              <span className="skill-tag">CloudFormation</span>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Focus Areas */}
          <div className="speaker-editorial-col">
            <div className="speaker-header-meta">
              <span className="speaker-role-badge">
                <UserCheck size={13} />
                {speaker.role}
              </span>
              <h3 className="speaker-display-name">{speaker.name}</h3>
            </div>

            {/* Authentic Bio Paragraphs */}
            <div className="speaker-narrative-bio">
              {speaker.bio.map((paragraph, idx) => (
                <p key={idx} className="bio-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Workshop Focus Areas */}
            <div className="speaker-focus-grid">
              {focusAreas.map((area, idx) => (
                <div key={idx} className="focus-area-item">
                  <CheckCircle2 size={16} className="focus-icon text-green-highlight" />
                  <div className="focus-text">
                    <strong className="focus-title">{area.title}</strong>
                    <span className="focus-desc">{area.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
