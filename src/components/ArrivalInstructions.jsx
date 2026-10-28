import React, { useState, useEffect } from 'react';
import { Check, ClipboardList, CheckCircle2, AlertCircle, Laptop, ShieldCheck, UserCheck, Cloud, RotateCcw } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function ArrivalInstructions() {
  const { checklist } = workshopConfig;
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });

  // Load verified checklist state from localStorage with safe fallback
  const [checkedState, setCheckedState] = useState(() => {
    try {
      const saved = localStorage.getItem('sbg_workshop_checklist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      'arrive-early': true,
      'bring-laptop': true,
      'rsvp-meetup': true,
      'aws-account': true
    };
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sbg_workshop_checklist', JSON.stringify(checkedState));
    } catch {
      // ignore
    }
  }, [checkedState]);

  const categoryIcons = {
    'arrive-early': UserCheck,
    'bring-laptop': Laptop,
    'rsvp-meetup': ShieldCheck,
    'aws-account': Cloud
  };

  const toggleCheck = (id) => {
    setCheckedState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalItems = checklist.length;
  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const isFullyCleared = completedCount === totalItems;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  const handleToggleAll = () => {
    const nextState = !isFullyCleared;
    const updated = {};
    checklist.forEach(item => {
      updated[item.id] = nextState;
    });
    setCheckedState(updated);
  };

  return (
    <section id="checklist" className="section-wrapper checklist-console-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${isInView ? 'section-revealed' : ''}`}>
          <span className="section-badge">
            <ClipboardList size={13} />
            Pre-Flight Readiness
          </span>
          <h2 className="section-title">BEFORE YOU ARRIVE</h2>
          <p className="section-description">
            Complete your readiness checklist so your machine, credentials, and venue check-in are 100% prepared to build.
          </p>
        </div>

        {/* Readiness Console Container */}
        <div className={`readiness-console-board ${isInView ? 'console-revealed' : ''}`}>
          {/* Top Console Status Bar */}
          <div className="readiness-top-bar">
            <div className="readiness-status-indicator">
              <span className={`status-lamp ${isFullyCleared ? 'lamp-cleared' : 'lamp-pending'}`}></span>
              <span className="readiness-status-label">
                {isFullyCleared
                  ? 'FLIGHT READINESS: 100% CLEARED TO BUILD'
                  : `PRE-FLIGHT STATUS: ${completedCount} OF ${totalItems} VERIFIED (${progressPercent}%)`}
              </span>
            </div>

            <div className="readiness-actions">
              <div className="readiness-progress-track" aria-hidden="true">
                <div
                  className="readiness-progress-bar"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <button
                type="button"
                className="btn-toggle-all"
                onClick={handleToggleAll}
                aria-label={isFullyCleared ? "Reset all checklist items" : "Verify all checklist items"}
              >
                <RotateCcw size={12} />
                <span>{isFullyCleared ? 'Reset Checklist' : 'Verify All (4/4)'}</span>
              </button>
            </div>
          </div>

          {/* 4 Interactive Pre-Flight Gate Cards */}
          <div className="checklist-gates-grid" role="group" aria-label="Pre-flight checklist gates">
            {checklist.map((item, idx) => {
              const isChecked = !!checkedState[item.id];
              const Icon = categoryIcons[item.id] || CheckCircle2;

              return (
                <div
                  key={item.id}
                  className={`readiness-gate-card ${isChecked ? 'gate-cleared' : 'gate-pending'}`}
                  onClick={() => toggleCheck(item.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleCheck(item.id)}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                >
                  {/* Gate Top Header */}
                  <div className="gate-header-row">
                    <span className="gate-index-tag">GATE 0{idx + 1}</span>
                    <span className={`gate-status-pill ${isChecked ? 'pill-cleared' : 'pill-pending'}`}>
                      {isChecked ? 'VERIFIED' : item.badge}
                    </span>
                  </div>

                  {/* Gate Main Body */}
                  <div className="gate-main-body">
                    <div className="gate-icon-bubble">
                      <Icon size={18} />
                    </div>
                    <div className="gate-text-col">
                      <h3 className="gate-title">{item.title}</h3>
                      <p className="gate-instruction">{item.instruction}</p>
                    </div>
                  </div>

                  {/* Tactile Check Trigger */}
                  <div className="gate-action-strip">
                    <div className={`gate-checkbox ${isChecked ? 'checked' : ''}`} aria-hidden="true">
                      {isChecked && <Check size={13} className="check-svg" />}
                    </div>
                    <span className="gate-action-label">
                      {isChecked ? 'Requirement Verified' : 'Click to Verify'}
                    </span>
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
