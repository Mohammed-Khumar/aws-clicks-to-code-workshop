import React, { useState } from 'react';
import { ArrowRight, Sparkles, Terminal, Code2 } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function TheHook() {
  const { hook } = workshopConfig;
  const [hookRef, isInView] = useInView({ threshold: 0.2 });
  const [activePillarIndex, setActivePillarIndex] = useState(null);

  return (
    <section id="hook" className="section-wrapper hook-editorial-section" ref={hookRef}>
      <div className="container">
        <div className={`hook-editorial-inner ${isInView ? 'hook-revealed' : ''}`}>
          {/* Subtitle / Eyebrow Label */}
          <div className="editorial-label-row">
            <span className="editorial-label">
              <Sparkles size={12} className="text-green-highlight" />
              THE WORKSHOP PHILOSOPHY
            </span>
          </div>

          {/* Bold Impact Statement */}
          <h2 className="hook-headline">
            <span className="hook-line-nowrap">{hook.largeStatementLine1}</span>{' '}
            <span className="hook-highlight">{hook.largeStatementLine2}</span>
          </h2>

          <p className="hook-subtext">
            {hook.subtext}
          </p>

          {/* Minimalist Linear Progression Track */}
          <div className="hook-narrative-track" aria-label="Conceptual Workshop Progression">
            {hook.journeyPillars.map((pillar, idx) => {
              const isHovered = activePillarIndex === idx;
              return (
                <React.Fragment key={pillar.step}>
                  <div 
                    className={`narrative-node ${isHovered ? 'active' : ''}`}
                    onMouseEnter={() => setActivePillarIndex(idx)}
                    onMouseLeave={() => setActivePillarIndex(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${pillar.step}: ${pillar.label}`}
                  >
                    <div className="narrative-index-badge">
                      <span className="narrative-index">0{idx + 1}</span>
                    </div>
                    <div className="narrative-content">
                      <span className="narrative-step">{pillar.step}</span>
                      <span className="narrative-label">{pillar.label}</span>
                      {pillar.desc && (
                        <span className="narrative-detail">{pillar.desc}</span>
                      )}
                    </div>
                  </div>

                  {idx < hook.journeyPillars.length - 1 && (
                    <div className="narrative-connector" aria-hidden="true">
                      <div className="connector-pulse-line" />
                      <ArrowRight size={15} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
