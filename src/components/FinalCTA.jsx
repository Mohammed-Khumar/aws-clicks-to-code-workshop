import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Ticket, ShieldCheck, Copy, Check, Sparkles } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useInView } from '../hooks/useInView';

export default function FinalCTA() {
  const { finalCta, event, organization } = workshopConfig;
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });
  const [copiedVenue, setCopiedVenue] = useState(false);

  const handleCopyVenue = () => {
    navigator.clipboard.writeText(event.venueAddress);
    setCopiedVenue(true);
    setTimeout(() => setCopiedVenue(false), 2200);
  };

  return (
    <section id="final-cta" className="section-wrapper launch-pass-section" ref={sectionRef}>
      <div className="container">
        {/* Admission Boarding Pass Terminal */}
        <div className={`event-pass-card ${isInView ? 'pass-revealed' : ''}`}>
          {/* Top Perforated Bar */}
          <div className="pass-perforated-header">
            <div className="pass-header-brand">
              <Ticket size={16} className="text-green-highlight" />
              <span className="pass-code-label">{organization.brandmarkText} × {organization.chapter} // ADMISSION PASS</span>
            </div>
            <div className="pass-header-meta">
              <span className="pass-batch-code">BATCH // 2026-SEP-24</span>
              <span className="pass-rsvp-status">
                <span className="live-beacon" aria-hidden="true" />
                <span>OFFICIAL MEETUP RSVP REQUIRED</span>
              </span>
            </div>
          </div>

          {/* Pass Body Content */}
          <div className="pass-main-body">
            <div className="pass-lead-block">
              <div className="pass-eyebrow-pill">
                <Sparkles size={11} className="text-green-highlight" />
                <span>READY TO BUILD ON AWS?</span>
              </div>
              <h2 className="pass-headline">{event.title}</h2>
              <p className="pass-subheading">{event.topic}</p>
            </div>

            {/* Event Coordinates Stub — Date, Time & Venue */}
            <div className="pass-coordinates-grid" role="region" aria-label="Event Schedule and Venue">
              <div className="coordinate-cell">
                <div className="coordinate-label">
                  <Calendar size={14} className="text-green-highlight" />
                  <span>DATE</span>
                </div>
                <strong className="coordinate-value">{event.date}</strong>
                <span className="coordinate-note">Mark Your Calendar</span>
              </div>

              <div className="coordinate-cell">
                <div className="coordinate-label">
                  <Clock size={14} className="text-blue-highlight" />
                  <span>TIME</span>
                </div>
                <strong className="coordinate-value">{event.time}</strong>
                <span className="coordinate-note">Arrive 15 Mins Prior</span>
              </div>

              <div 
                className="coordinate-cell coordinate-cell-interactive" 
                onClick={handleCopyVenue}
                title="Click to copy full campus address"
              >
                <div className="coordinate-label">
                  <MapPin size={14} className="text-green-highlight" />
                  <span>VENUE</span>
                </div>
                <strong className="coordinate-value">{event.venue}</strong>
                <button 
                  type="button" 
                  className="coordinate-copy-action"
                  aria-label="Copy venue address"
                >
                  {copiedVenue ? <Check size={11} className="text-green-highlight" /> : <Copy size={11} />}
                  <span>{copiedVenue ? 'Address Copied!' : 'Click to Copy Address'}</span>
                </button>
              </div>
            </div>

            {/* High Conversion RSVP Action */}
            <div className="pass-action-center">
              <a
                href={event.meetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-green pass-primary-cta"
                id="final-meetup-cta-btn"
              >
                <span>{finalCta.buttonText}</span>
                <img
                  src={`${import.meta.env.BASE_URL}assets/meetup-icon.png`}
                  alt="Meetup"
                  className="btn-meetup-icon"
                />
              </a>

              <div className="pass-advisory-note">
                <ShieldCheck size={15} className="text-green-highlight" />
                <span>Zero Admission Fee · Free Admission via Meetup RSVP · Limited Seating at MHSSCE Byculla</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
