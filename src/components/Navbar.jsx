import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function Navbar({ currentTheme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { organization, event } = workshopConfig;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="container navbar-inner">
        {/* Brand Lockup */}
        <a href="#" className="nav-brand-lockup" aria-label="AWS SBG MHSSCE Workshop Home">
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

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary Navigation">
          <ul className="nav-links-desktop">
            <li><a href="#journey" className="nav-link-item">Journey</a></li>
            <li><a href="#comparison" className="nav-link-item">Clicks to Code</a></li>
            <li><a href="#stack" className="nav-link-item">The Stack</a></li>
            <li><a href="#speaker" className="nav-link-item">Your Guide</a></li>
            <li><a href="#checklist" className="nav-link-item">Checklist</a></li>
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
            {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
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
              <a href="#journey" className="mobile-drawer-link" onClick={closeMenu}>Journey</a>
              <a href="#comparison" className="mobile-drawer-link" onClick={closeMenu}>Clicks to Code</a>
              <a href="#stack" className="mobile-drawer-link" onClick={closeMenu}>The Stack</a>
              <a href="#speaker" className="mobile-drawer-link" onClick={closeMenu}>Your Guide</a>
              <a href="#checklist" className="mobile-drawer-link" onClick={closeMenu}>Checklist</a>
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
