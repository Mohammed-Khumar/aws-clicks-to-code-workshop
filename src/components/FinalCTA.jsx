import React, { useState } from 'react';
import { ArrowUpRight, Calendar, Clock, MapPin, Ticket, ShieldCheck, Copy, Check, Sparkles } from 'lucide-react';
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
        {/* Boarding Pass / Launch Terminal Card */}
        <div className={`launch-pass-container ${isInView ? 'pass-revealed' : ''}`}>
          {/* Top Technical Pass Header */}
          <div className="launch-pass-header">
            <div className="pass-header-left">
              <Ticket size={16} className="text-green-highlight" />
              <span className="pass-title-code">{organization.brandmarkText} × {organization.chapter} // EVENT PASS</span>
            </div>
            <div className="pass-header-right">
              <span className="live-beacon"></span>
              <span className="pass-status-text">OFFICIAL MEETUP RSVP REQUIRED</span>
            </div>
          </div>

          {/* Pass Main Body */}
          <div className="launch-pass-body">
            <div className="pass-main-copy">
              <div className="pass-eyebrow-row">
                <span className="pass-eyebrow-tag">
                  <Sparkles size={11} className="text-green-highlight" />
                  READY TO BUILD?
                </span>
                <span className="pass-batch-code">BATCH // 2026-SEP-24</span>
              </div>
              <h2 className="pass-headline">{event.title}</h2>
              <p className="pass-subheading">{event.topic}</p>
            </div>

            {/* Event Coordinates Strip with Interactive Micro-action */}
            <div className="pass-coordinates-strip" role="region" aria-label="Event Schedule and Venue">
              <div className="coordinate-block">
                <div className="coordinate-label">
                  <Calendar size={13} className="text-green-highlight" />
                  <span>DATE</span>
                </div>
                <strong className="coordinate-val">{event.date}</strong>
              </div>

              <div className="coordinate-block">
                <div className="coordinate-label">
                  <Clock size={13} className="text-blue-highlight" />
                  <span>TIME</span>
                </div>
                <strong className="coordinate-val">{event.time}</strong>
              </div>

              <div className="coordinate-block coordinate-block-interactive" onClick={handleCopyVenue} title="Click to copy full address">
                <div className="coordinate-label">
                  <MapPin size={13} className="text-green-highlight" />
                  <span>VENUE</span>
                </div>
                <div className="coordinate-venue-wrap">
                  <strong className="coordinate-val">{event.venue}</strong>
                  <button 
                    type="button" 
                    className="coordinate-copy-btn" 
                    aria-label="Copy venue address"
                  >
                    {copiedVenue ? <Check size={11} className="text-green-highlight" /> : <Copy size={11} />}
                    <span>{copiedVenue ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* High Conversion Action Row */}
            <div className="pass-action-row">
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
                <span>Zero Admission Fee · RSVP Strictly Verified at Entrance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
