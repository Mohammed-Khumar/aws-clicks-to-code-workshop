import React from 'react';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

function LinkedinIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#0a66c2"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6c0-.88-.72-1.6-1.6-1.6a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.6 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function MeetupIcon({ size = 18, ...props }) {
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

function InstagramIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <defs>
        <radialGradient id="ig-gradient-footer-dup" r="150%" cx="30%" cy="107%">
          <stop stopColor="#fdf497" offset="0%" />
          <stop stopColor="#fdf497" offset="5%" />
          <stop stopColor="#fd5949" offset="45%" />
          <stop stopColor="#d6249f" offset="60%" />
          <stop stopColor="#285AEB" offset="90%" />
        </radialGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" ry="5" stroke="url(#ig-gradient-footer-dup)" strokeWidth="2" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#ig-gradient-footer-dup)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-gradient-footer-dup)" />
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
