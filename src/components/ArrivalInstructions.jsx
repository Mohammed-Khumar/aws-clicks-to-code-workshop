import React, { useState } from 'react';
import { Check, ClipboardList, CheckCircle2, AlertCircle, Laptop, ShieldCheck, UserCheck, Cloud } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function ArrivalInstructions() {
  const { checklist } = workshopConfig;

  const [checkedState, setCheckedState] = useState({
    'arrive-early': true,
    'bring-laptop': true,
    'rsvp-meetup': true,
    'aws-account': true
  });

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

  const handleToggleAll = () => {
    const nextState = !isFullyCleared;
    const updated = {};
    checklist.forEach(item => {
      updated[item.id] = nextState;
    });
    setCheckedState(updated);
  };

  return (
    <section id="checklist" className="section-wrapper checklist-console-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <ClipboardList size={14} />
            Pre-Flight Readiness
          </span>
          <h2 className="section-title">BEFORE YOU ARRIVE</h2>
          <p className="section-description">
            Complete your readiness checklist so your machine, credentials, and venue check-in are 100% prepared to build.
          </p>
        </div>

        {/* Readiness Console Container */}
        <div className="readiness-console-board">
          {/* Top Console Status Bar */}
          <div className="readiness-top-bar">
            <div className="readiness-status-indicator">
              <span className={`status-lamp ${isFullyCleared ? 'lamp-cleared' : 'lamp-pending'}`}></span>
              <span className="readiness-status-label">
                {isFullyCleared
                  ? 'FLIGHT READINESS: 100% CLEARED TO BUILD'
                  : `PRE-FLIGHT STATUS: ${completedCount} OF ${totalItems} COMPLETED`}
              </span>
            </div>

            <div className="readiness-actions">
              <div className="readiness-progress-track" aria-hidden="true">
                <div
                  className="readiness-progress-bar"
                  style={{ width: `${(completedCount / totalItems) * 100}%` }}
                />
              </div>
              <button
                type="button"
                className="btn-toggle-all"
                onClick={handleToggleAll}
                aria-label={isFullyCleared ? "Clear all check items" : "Check all items"}
              >
                {isFullyCleared ? 'Reset All' : 'Clear All (4/4)'}
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
                      {isChecked ? 'CLEARED' : item.badge}
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
                    <div className="gate-checkbox" aria-hidden="true">
                      {isChecked ? <Check size={14} /> : null}
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
