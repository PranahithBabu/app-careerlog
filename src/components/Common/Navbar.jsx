import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on navigation
  const handleNav = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <h2 style={{ color: '#6366f1' }}>CareerLog</h2>
        </Link>
        {/* Desktop menu */}
        <div className="navbar-menu">
          <Link to="/star-stories" className="navbar-link">
            STAR Stories
          </Link>
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="navbar-hamburger"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
            <div className="mobile-menu" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button className="mobile-menu-link" onClick={() => handleNav('/star-stories')}>
                <span style={{ marginRight: 8, fontSize: '1.2em', verticalAlign: 'middle' }}>⭐</span>
                Stories
              </button>
              <button className="mobile-menu-link" onClick={() => handleNav('/profile')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', fontSize: '1.25em', marginRight: 8 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'block'}}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"/></svg>
                </span>
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .navbar {
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 calc(var(--spacing-unit) * 2);
          height: 64px;
          position: relative;
        }
        .navbar-brand {
          text-decoration: none;
          color: var(--primary-color);
        }
        .navbar-brand h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .navbar-menu {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-unit) * 3);
        }
        .navbar-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          padding: calc(var(--spacing-unit)) calc(var(--spacing-unit) * 2);
          border-radius: var(--border-radius);
          transition: all 0.2s ease;
        }
        .navbar-link:hover {
          color: var(--primary-color);
          background-color: var(--bg-secondary);
        }
        .star-menu {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color);
          font-weight: 700;
          font-size: 1.75rem;
        }
        .navbar-profile {
          position: relative;
        }
        .profile-button {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-unit));
          background: none;
          border: none;
          cursor: pointer;
          padding: calc(var(--spacing-unit)) calc(var(--spacing-unit) * 1.5);
          border-radius: var(--border-radius);
          transition: background-color 0.2s ease;
        }
        .profile-button:hover {
          background-color: var(--bg-secondary);
        }
        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }
        .profile-name {
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.875rem;
        }
        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          margin-left: 8px;
        }
        /* Mobile menu overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.2);
          z-index: 9999;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }
        .mobile-menu {
          background: var(--bg-primary);
          box-shadow: var(--shadow-md);
          border-radius: var(--border-radius-lg);
          margin: 1rem;
          padding: 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 180px;
        }
        .mobile-menu-link {
          background: none;
          border: none;
          color: var(--primary-color);
          font-size: 1.1rem;
          font-weight: 600;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.5rem 0;
          border-radius: var(--border-radius);
          transition: background 0.2s;
        }
        .mobile-menu-link:hover {
          background: var(--bg-secondary);
        }
        @media (max-width: 768px) {
          .navbar-menu {
            display: none;
          }
          .navbar-hamburger {
            display: block;
          }
          .profile-name {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;