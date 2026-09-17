import React from 'react';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

function LinkedinIcon({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MeetupIcon({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="#f64060"
        d="M19.34 9.54a4.13 4.13 0 0 0-3.66-2.09 4.39 4.39 0 0 0-3.68 2.06 4.3 4.3 0 0 0-3.68-2.06 4.17 4.17 0 0 0-4.14 4.22c0 2.21 1.63 4.14 3.79 4.22a4.42 4.42 0 0 0 4.03-2.12 4.43 4.43 0 0 0 4.03 2.12 4.17 4.17 0 0 0 4.14-4.22 4.1 4.1 0 0 0-.83-2.13z"
      />
    </svg>
  );
}

function InstagramIcon({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function AwsSbgFooter() {
  const { organization, event } = workshopConfig;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Column 1: Organization Lockup & Socials */}
          <div className="footer-col">
            <a href="https://awssbg-mhssce.in/" className="footer-logo" target="_blank" rel="noopener noreferrer">
              <img
                src={organization.programEmblem}
                alt="AWS SBG MHSSCE Emblem"
                className="footer-logo-icon"
              />
              <div className="footer-logo-text">
                <span className="footer-logo-title">AWS SBG</span>
                <span className="footer-logo-subtitle">MHSSCE</span>
              </div>
            </a>

            <p className="footer-description">
              AWS Student Builder Group at<br />
              M.H. Saboo Siddik College of Engineering
            </p>

            <div className="footer-socials">
              <a
                href={organization.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={event.meetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Meetup"
                title="Meetup"
              >
                <MeetupIcon size={16} />
              </a>
              <a
                href={organization.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <a href="https://awssbg-mhssce.in/" target="_blank" rel="noopener noreferrer">Home</a>
              </li>
              <li>
                <a href="https://awssbg-mhssce.in/#about" target="_blank" rel="noopener noreferrer">About</a>
              </li>
              <li>
                <a href="https://awssbg-mhssce.in/#events" target="_blank" rel="noopener noreferrer">Events</a>
              </li>
              <li>
                <a href="https://awssbg-mhssce.in/#articles" target="_blank" rel="noopener noreferrer">Articles</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-list">
              <div className="contact-item">
                <MapPin size={18} className="contact-item-icon" />
                <span>MHSSCE, 8 Saboo Siddik Polytechnic Rd, Mumbai 400008</span>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-item-icon" />
                <a href={`mailto:${organization.email}`}>{organization.email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Bar: Copyright & Back-to-Top Button */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © 2026 AWS Student Builder Group, MHSSCE. All rights reserved.
          </p>
          <button
            type="button"
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
