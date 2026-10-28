import React from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, UserCheck, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import InfrastructurePipeline from './InfrastructurePipeline';
import { useInView } from '../hooks/useInView';

export default function Hero() {
  const { event, organization, speaker } = workshopConfig;
  const [heroRef, isInView] = useInView({ threshold: 0.1 });

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight + 5;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      {/* Subtle Engineering Grid Backdrop */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left: Event Typography & Conversion */}
        <div className={`hero-copy ${isInView ? 'hero-revealed' : ''}`}>
          {/* Eyebrow / Chapter Lockup */}
          <div className="hero-eyebrow-row">
            <span className="hero-eyebrow-badge">
              <Sparkles size={13} className="text-green-highlight" />
              <span>AWS SBG × MHSSCE</span>
            </span>
            <span className="hero-badge-pill">
              <span className="live-beacon"></span>
              <span>Hands-on Cloud Masterclass</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="hero-h1">
            <span className="hero-h1-line hero-h1-primary">AWS FROM</span>{' '}
            <span className="hero-h1-line hero-h1-gradient">CLICKS TO CODE</span>
          </h1>

          {/* Workshop Topic */}
          <p className="hero-topic">
            {event.topic}
          </p>

          {/* Tagline */}
          <p className="hero-tagline">
            {event.tagline}
          </p>

          {/* Compact Event Metadata Strip with Interactive Micro-actions */}
          <div className="hero-meta-box" role="region" aria-label="Key Event Details">
            <div className="meta-chip">
              <Calendar size={16} className="meta-chip-icon text-green-highlight" />
              <span>Date: <strong>{event.date}</strong></span>
            </div>
            
            <a 
              href="#final-cta" 
              className="meta-chip meta-chip-interactive"
              onClick={(e) => scrollToSection(e, 'final-cta')}
              title="View venue details"
            >
              <MapPin size={16} className="meta-chip-icon text-blue-highlight" />
              <span>Venue: <strong>{event.venue}</strong></span>
            </a>

            <a 
              href="#speaker" 
              className="meta-chip meta-chip-interactive"
              onClick={(e) => scrollToSection(e, 'speaker')}
              title="Learn about your speaker"
            >
              <UserCheck size={16} className="meta-chip-icon text-green-highlight" />
              <span>Guide: <strong>{speaker.name}</strong></span>
            </a>
          </div>

          {/* CTA Group */}
          <div className="hero-cta-group">
            <a
              href={event.meetupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-green hero-primary-btn"
              id="hero-primary-meetup-btn"
            >
              <span>{event.primaryCtaLabel}</span>
              <img
                src={`${import.meta.env.BASE_URL}assets/meetup-icon.png`}
                alt="Meetup"
                className="btn-meetup-icon"
              />
            </a>

            <a
              href="#journey"
              className="btn btn-outline-subtle hero-secondary-btn"
              onClick={(e) => scrollToSection(e, 'journey')}
            >
              <span>Explore 5-Step Journey</span>
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Micro trust indicator */}
          <div className="hero-trust-indicator">
            <ShieldCheck size={13} className="text-green-highlight" />
            <span>Zero Admission Fee · Hands-on Live AWS Cloud Environment</span>
          </div>
        </div>

        {/* Right: Interactive Infrastructure Visualization */}
        <div className={`hero-visual-col ${isInView ? 'hero-visual-revealed' : ''}`}>
          <InfrastructurePipeline />
        </div>
      </div>
    </section>
  );
}
