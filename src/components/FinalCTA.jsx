import React from 'react';
import { ArrowUpRight, Calendar, Clock, MapPin, Ticket, ShieldCheck } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function FinalCTA() {
  const { finalCta, event, organization } = workshopConfig;

  return (
    <section id="final-cta" className="section-wrapper launch-pass-section">
      <div className="container">
        {/* Boarding Pass / Launch Terminal Card */}
        <div className="launch-pass-container">
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
              <span className="pass-eyebrow-tag">READY TO BUILD?</span>
              <h2 className="pass-headline">{event.title}</h2>
              <p className="pass-subheading">{event.topic}</p>
            </div>

            {/* Event Coordinates Strip */}
            <div className="pass-coordinates-strip">
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

              <div className="coordinate-block">
                <div className="coordinate-label">
                  <MapPin size={13} className="text-green-highlight" />
                  <span>VENUE</span>
                </div>
                <strong className="coordinate-val">{event.venue}</strong>
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
                  src="/assets/meetup-icon.png"
                  alt="Meetup"
                  className="btn-meetup-icon"
                />
              </a>

              <div className="pass-advisory-note">
                <ShieldCheck size={14} className="text-green-highlight" />
                <span>Zero Admission Fee · RSVP Strictly Verified at Entrance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
