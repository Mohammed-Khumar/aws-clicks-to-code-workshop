import React, { useState, useEffect } from 'react';
import { Check, ClipboardList, CheckCircle2, AlertCircle, Laptop, ShieldCheck, UserCheck, Cloud, RotateCcw, Sparkles } from 'lucide-react';
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

        {/* Readiness Verification Board */}
        <div className={`readiness-board ${isInView ? 'console-revealed' : ''}`}>
          {/* Top Console Status Ribbon */}
          <div className="readiness-status-ribbon">
            <div className="status-ribbon-left">
              <span className={`status-lamp ${isFullyCleared ? 'lamp-cleared' : 'lamp-pending'}`} aria-hidden="true" />
              <div className="status-text-wrap">
                <span className="status-headline">
                  {isFullyCleared
                    ? 'PRE-FLIGHT STATUS: 100% CLEARED TO BUILD'
                    : `PRE-FLIGHT STATUS: ${completedCount} OF ${totalItems} VERIFIED (${progressPercent}%)`}
                </span>
                <span className="status-subline">
                  {isFullyCleared
                    ? 'All requirements satisfied. Your workstation and credentials are ready.'
                    : 'Please review and verify remaining pre-requisites before heading to the venue.'}
                </span>
              </div>
            </div>

            <div className="status-ribbon-actions">
              <div className="readiness-gauge-track" aria-hidden="true">
                <div
                  className="readiness-gauge-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <button
                type="button"
                className="btn-toggle-status"
                onClick={handleToggleAll}
                aria-label={isFullyCleared ? "Reset all checklist items" : "Verify all checklist items"}
              >
                <RotateCcw size={12} />
                <span>{isFullyCleared ? 'Reset Checklist' : 'Verify All (4/4)'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Pre-Flight Gate Rows */}
          <div className="readiness-gates-list" role="group" aria-label="Pre-flight checklist gates">
            {checklist.map((item, idx) => {
              const isChecked = !!checkedState[item.id];
              const Icon = categoryIcons[item.id] || CheckCircle2;

              return (
                <div
                  key={item.id}
                  className={`readiness-gate-row ${isChecked ? 'gate-cleared' : 'gate-pending'}`}
                  onClick={() => toggleCheck(item.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleCheck(item.id)}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                >
                  {/* Left: Tactile Checkbox */}
                  <div className="gate-check-trigger">
                    <div className={`tactile-checkbox ${isChecked ? 'checked' : ''}`} aria-hidden="true">
                      {isChecked && <Check size={14} className="check-mark-icon" />}
                    </div>
                  </div>

                  {/* Icon & Gate Code */}
                  <div className="gate-icon-col">
                    <div className="gate-category-icon">
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="gate-detail-col">
                    <div className="gate-headline-row">
                      <span className="gate-index-code">GATE 0{idx + 1}</span>
                      <h3 className="gate-headline-title">{item.title}</h3>
                      <span className={`gate-status-tag ${isChecked ? 'tag-verified' : 'tag-pending'}`}>
                        {isChecked ? 'VERIFIED' : item.badge}
                      </span>
                    </div>
                    <p className="gate-instruction-text">{item.instruction}</p>
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
