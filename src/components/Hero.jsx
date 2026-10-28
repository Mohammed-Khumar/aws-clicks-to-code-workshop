import React from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import InfrastructurePipeline from './InfrastructurePipeline';
import { useInView } from '../hooks/useInView';

export default function Hero() {
  const { event, speaker } = workshopConfig;
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
      {/* Subtle Architectural Grid Backdrop */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left: Event Typography & Core Conversion Engine */}
        <div className={`hero-copy ${isInView ? 'hero-revealed' : ''}`}>
          {/* Eyebrow / Chapter Identification */}
          <div className="hero-eyebrow-row">
            <span className="hero-eyebrow-badge">
              <Sparkles size={13} className="text-green-highlight" />
              <span>AWS SBG × MHSSCE</span>
            </span>
            <span className="hero-badge-pill">
              <span className="live-beacon" aria-hidden="true"></span>
              <span>Hands-on Cloud Workshop</span>
            </span>
          </div>

          {/* Magnetic Primary Headline */}
          <h1 className="hero-h1">
            <span className="hero-h1-prefix">AWS FROM</span>
            <span className="hero-h1-highlight">CLICKS TO CODE</span>
          </h1>

          {/* Signature Action Manifesto */}
          <p className="hero-manifesto">
            See the Cloud. Build It. Access It. Automate It.
          </p>

          {/* Workshop Description */}
          <p className="hero-topic">
            {event.topic}
          </p>

          {/* Open Technical Spec Row — No Clunky Nested Cards */}
          <div className="hero-specs-row" role="region" aria-label="Event Schedule and Location">
            <div className="spec-item">
              <Calendar size={15} className="spec-item-icon text-green-highlight" />
              <div className="spec-item-content">
                <span className="spec-label">Date</span>
                <span className="spec-value">{event.date}</span>
              </div>
            </div>

            <div className="spec-divider" aria-hidden="true" />

            <a 
              href="#final-cta" 
              className="spec-item spec-item-link"
              onClick={(e) => scrollToSection(e, 'final-cta')}
              title="Jump to venue and directions"
            >
              <MapPin size={15} className="spec-item-icon text-blue-highlight" />
              <div className="spec-item-content">
                <span className="spec-label">Venue</span>
                <span className="spec-value">{event.venue}</span>
              </div>
            </a>

            <div className="spec-divider" aria-hidden="true" />

            <a 
              href="#speaker" 
              className="spec-item spec-item-link"
              onClick={(e) => scrollToSection(e, 'speaker')}
              title="View speaker bio"
            >
              <UserCheck size={15} className="spec-item-icon text-green-highlight" />
              <div className="spec-item-content">
                <span className="spec-label">Speaker</span>
                <span className="spec-value">{speaker.name}</span>
              </div>
            </a>
          </div>

          {/* Primary & Secondary CTAs */}
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

          {/* Micro Trust Indicator */}
          <div className="hero-trust-indicator">
            <ShieldCheck size={14} className="text-green-highlight" />
            <span>Zero Admission Fee · Free Admission via Meetup RSVP · Live AWS Cloud Environment</span>
          </div>
        </div>

        {/* Right: Technical Infrastructure Sandbox Interface */}
        <div className={`hero-visual-col ${isInView ? 'hero-visual-revealed' : ''}`}>
          <InfrastructurePipeline />
        </div>
      </div>
    </section>
  );
}
