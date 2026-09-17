import React from 'react';
import { ArrowRight } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function TheHook() {
  const { hook } = workshopConfig;

  return (
    <section id="hook" className="section-wrapper hook-editorial-section">
      <div className="container">
        <div className="hook-editorial-inner">
          {/* Subtitle / Eyebrow Label */}
          <span className="editorial-label">THE WORKSHOP PHILOSOPHY</span>

          {/* Bold Impact Statement */}
          <h2 className="hook-headline">
            <span className="hook-line-nowrap">{hook.largeStatementLine1}</span> <br />
            <span className="hook-highlight">{hook.largeStatementLine2}</span>
          </h2>

          <p className="hook-subtext">
            {hook.subtext}
          </p>

          {/* Minimalist Linear Progression Track */}
          <div className="hook-narrative-track" aria-label="Conceptual Workshop Progression">
            {hook.journeyPillars.map((pillar, idx) => (
              <React.Fragment key={pillar.step}>
                <div className="narrative-node">
                  <span className="narrative-index">0{idx + 1}</span>
                  <div className="narrative-content">
                    <span className="narrative-step">{pillar.step}</span>
                    <span className="narrative-label">{pillar.label}</span>
                  </div>
                </div>
                {idx < hook.journeyPillars.length - 1 && (
                  <div className="narrative-connector" aria-hidden="true">
                    <ArrowRight size={16} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
