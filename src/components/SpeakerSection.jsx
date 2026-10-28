import React from 'react';
import { UserCheck, ShieldCheck, Award, Sparkles, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function SpeakerSection() {
  const { speaker } = workshopConfig;
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });

  const focusAreas = [
    {
      title: "Cloud Infrastructure Architecture",
      desc: "Deep dive into on-demand compute capacity, VPC regional context, and scalable AWS primitives."
    },
    {
      title: "Zero-Trust Instance Administration",
      desc: "Eliminating vulnerable port 22 and fragile SSH keys through IAM-governed AWS Systems Manager."
    },
    {
      title: "From Manual Clicks to Declarative IaC",
      desc: "Codifying manual console operations into production-grade, reproducible CloudFormation YAML templates."
    }
  ];

  return (
    <section id="speaker" className="section-wrapper speaker-editorial-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${isInView ? 'section-revealed' : ''}`}>
          <span className="section-badge">
            <Award size={13} />
            Guest Speaker &amp; Guide
          </span>
          <h2 className="section-title">GUIDING YOUR CLOUD JOURNEY</h2>
          <p className="section-description">
            Learn directly from an accomplished community leader and cloud practitioner in an intensive, hands-on masterclass.
          </p>
        </div>

        {/* Editorial Masterclass Layout — Open, Asymmetric & Card-Free */}
        <div className={`speaker-editorial-feature ${isInView ? 'speaker-feature-revealed' : ''}`}>
          {/* Left Column: Portrait & Reticle Viewfinder Framing */}
          <div className="speaker-portrait-wrap">
            <div className="portrait-cinematic-frame">
              {/* Technical Reticle Framing */}
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

              {/* Verified Chapter Tag */}
              <div className="portrait-chapter-tag">
                <Sparkles size={13} className="text-green-highlight" />
                <span>Lead @ HerTechEra – Pune</span>
              </div>
            </div>

            {/* Core Domain Badges */}
            <div className="speaker-domain-tags">
              <span className="domain-pill">AWS Cloud</span>
              <span className="domain-pill">CloudFormation</span>
              <span className="domain-pill">DevSecOps</span>
            </div>
          </div>

          {/* Right Column: Editorial Typography & Guided Focus Areas */}
          <div className="speaker-bio-col">
            <div className="speaker-title-block">
              <div className="speaker-role-strip">
                <UserCheck size={14} className="text-green-highlight" />
                <span>{speaker.role}</span>
              </div>
              <h3 className="speaker-headline-name">{speaker.name}</h3>
              <p className="speaker-creds-sub">
                Community Builder · Cloud Infrastructure Guide · AWS SBG Guest Mentor
              </p>
            </div>

            {/* Authentic Narrative Bio */}
            <div className="speaker-story-prose">
              {speaker.bio.map((paragraph, idx) => (
                <p key={idx} className="story-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Workshop Focus Areas — Open Technical Highlights List */}
            <div className="speaker-focus-runway">
              <h4 className="focus-runway-heading">
                <span>What Afreen Will Guide You Through:</span>
              </h4>
              <div className="focus-runway-list">
                {focusAreas.map((area, idx) => (
                  <div key={idx} className="focus-highlight-row">
                    <div className="highlight-index-bullet">
                      <span className="bullet-num">0{idx + 1}</span>
                    </div>
                    <div className="highlight-text-block">
                      <strong className="highlight-title">{area.title}</strong>
                      <p className="highlight-desc">{area.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
