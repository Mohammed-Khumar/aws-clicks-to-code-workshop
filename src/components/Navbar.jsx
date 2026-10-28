import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useScrollSpy } from '../hooks/useScrollSpy';

export default function Navbar({ currentTheme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { organization, event } = workshopConfig;
  const { scrollProgress, isScrolled } = useScrollProgress(25);

  const sectionIds = ['journey', 'comparison', 'stack', 'speaker', 'checklist'];
  const activeSection = useScrollSpy(sectionIds, 90);

  const closeMenu = () => setMobileMenuOpen(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth scroll handler with offset for sticky navbar
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navHeight = 70;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight + 5;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      // Update hash in browser without jumping
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const navLinks = [
    { id: 'journey', label: 'Journey' },
    { id: 'comparison', label: 'Clicks to Code' },
    { id: 'stack', label: 'The Stack' },
    { id: 'speaker', label: 'Your Guide' },
    { id: 'checklist', label: 'Checklist' }
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Scroll Reading Progress Bar */}
      <div 
        className="nav-scroll-progress-track" 
        role="progressbar" 
        aria-valuenow={Math.round(scrollProgress)} 
        aria-valuemin="0" 
        aria-valuemax="100"
        aria-label="Reading progress"
      >
        <div 
          className="nav-scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>

      <div className="container navbar-inner">
        {/* Brand Lockup */}
        <a 
          href="#" 
          className="nav-brand-lockup" 
          aria-label="AWS SBG MHSSCE Workshop Home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src={organization.programEmblem}
            alt="AWS SBG MHSSCE Program Emblem"
            className="nav-brand-emblem"
          />
          <div className="nav-brand-text">
            <span className="nav-brand-title">{organization.brandmarkText}</span>
            <span className="nav-brand-sub">{organization.chapter}</span>
          </div>
        </a>

        {/* Desktop Navigation Links with Active State Tracking */}
        <nav aria-label="Primary Navigation">
          <ul className="nav-links-desktop">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`nav-link-item ${isActive ? 'nav-link-active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="nav-link-pill-indicator" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {currentTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Primary Meetup RSVP CTA */}
          <a
            href={event.meetupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary-green nav-cta-btn"
          >
            <span>RSVP ON MEETUP</span>
            <img
              src={`${import.meta.env.BASE_URL}assets/meetup-icon.png`}
              alt="Meetup"
              className="btn-meetup-icon"
            />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-drawer-backdrop" onClick={closeMenu} aria-hidden="true" />
          <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
            <nav className="mobile-nav-list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="mobile-active-dot" aria-hidden="true" />}
                  </a>
                );
              })}
            </nav>
            <div className="mobile-drawer-cta">
              <a
                href={event.meetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-green mobile-drawer-btn"
                onClick={closeMenu}
              >
                <span>RSVP ON MEETUP</span>
                <img
                  src={`${import.meta.env.BASE_URL}assets/meetup-icon.png`}
                  alt="Meetup"
                  className="btn-meetup-icon"
                />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
