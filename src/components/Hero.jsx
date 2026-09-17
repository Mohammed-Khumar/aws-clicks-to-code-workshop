import React from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import InfrastructurePipeline from './InfrastructurePipeline';

export default function Hero() {
  const { event, organization, speaker } = workshopConfig;

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-grid">
        {/* Left: Event Typography & Conversion */}
        <div className="hero-copy">
          {/* Eyebrow / Chapter Lockup */}
          <div className="hero-eyebrow-row">
            <span className="hero-eyebrow-badge">
              <Sparkles size={13} />
              AWS SBG × MHSSCE
            </span>
            <span className="hero-badge-pill">
              <span className="live-beacon"></span>
              Hands-on Cloud Workshop
            </span>
          </div>

          {/* Main Title */}
          <h1 className="hero-h1">
            {event.title}
          </h1>

          {/* Workshop Topic */}
          <p className="hero-topic">
            {event.topic}
          </p>

          {/* Tagline */}
          <p className="hero-tagline">
            {event.tagline}
          </p>

          {/* Compact Event Metadata Strip */}
          <div className="hero-meta-box">
            <div className="meta-chip">
              <Calendar size={17} className="meta-chip-icon text-green-highlight" />
              <span>Date: <strong>{event.date}</strong></span>
            </div>
            <div className="meta-chip">
              <MapPin size={17} className="meta-chip-icon text-blue-highlight" />
              <span>Venue: <strong>{event.venue}</strong></span>
            </div>
            <div className="meta-chip">
              <UserCheck size={17} className="meta-chip-icon text-green-highlight" />
              <span>Guide: <strong>{speaker.name}</strong></span>
            </div>
          </div>

          {/* CTA Group */}
          <div className="hero-cta-group">
            <a
              href={event.meetupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-green"
              id="hero-primary-meetup-btn"
            >
              <span>{event.primaryCtaLabel}</span>
            </a>
            <a
              href="#journey"
              className="btn btn-outline-subtle"
            >
              <span>Explore 5-Step Journey</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Right: Interactive Infrastructure Visualization */}
        <div className="hero-visual-col">
          <InfrastructurePipeline />
        </div>
      </div>
    </section>
  );
}
