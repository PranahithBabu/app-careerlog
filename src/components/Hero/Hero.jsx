import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => (
  <main className="hero-landing">
    <div className="hero-bg-shape" aria-hidden="true"></div>
    <section className="hero-content-grid compact">
      <div className="hero-text">
        <h1 className="hero-main-title">
          Welcome to <span className="hero-highlight">CareerLog</span>
        </h1>
        <p className="hero-tagline">
          Your personal productivity and career growth companion
        </p>
        <div className="hero-description compact-desc">
          <p>
            <strong>CareerLog</strong> helps you capture your daily work highlights, organize them with tags and categories, and instantly turn them into STAR stories for interviews and reviews—all 100% private, on your device.
          </p>
          <ul className="hero-benefits-list compact-list">
            <li><span className="benefit-icon">📝</span> Log your work in seconds</li>
            <li><span className="benefit-icon">🏷️</span> Organize with tags & categories</li>
            <li><span className="benefit-icon">✨</span> AI-powered STAR stories</li>
            <li><span className="benefit-icon">🔒</span> Private & local—no sign up</li>
          </ul>
          <div className="hero-cta-row">
            <Link to="/dashboard" className="btn btn-primary btn-lg hero-cta">Get Started</Link>
            <span className="hero-cta-tip">No sign up required</span>
          </div>
        </div>
      </div>
      <div className="hero-illustration">
        <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="130" cy="110" rx="120" ry="90" fill="#e0e7ff" />
          <rect x="60" y="60" width="140" height="100" rx="18" fill="#fff" stroke="#6366f1" strokeWidth="3" />
          <rect x="80" y="80" width="100" height="16" rx="8" fill="#c7d2fe" />
          <rect x="80" y="105" width="60" height="12" rx="6" fill="#a5b4fc" />
          <rect x="80" y="125" width="80" height="12" rx="6" fill="#a5b4fc" />
          <rect x="80" y="145" width="50" height="12" rx="6" fill="#c7d2fe" />
          <circle cx="180" cy="150" r="10" fill="#6366f1" />
        </svg>
      </div>
    </section>
  </main>
);

export default Hero;