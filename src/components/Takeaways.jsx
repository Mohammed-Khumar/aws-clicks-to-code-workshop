import React from 'react';
import { workshopConfig } from '../data/workshopConfig';

export default function Takeaways() {
  const { takeaways } = workshopConfig;

  return (
    <section id="takeaways" className="section-wrapper ambient-glow-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Student Takeaways</span>
          <h2 className="section-title">What You'll Walk Away With</h2>
          <p className="section-description">
            Practical, industry-relevant capabilities developed by building live cloud infrastructure end-to-end.
          </p>
        </div>

        <div className="takeaways-grid">
          {takeaways.map((item) => (
            <div key={item.title} className="takeaway-card">
              <span className="takeaway-stage-badge">{item.stage}</span>
              <h3 className="takeaway-title">{item.title}</h3>
              <p className="takeaway-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
