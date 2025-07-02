import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <h2>CareerLog</h2>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/star-stories" className="navbar-link">
            STAR Stories
          </Link>
          <div className="navbar-profile">
            <button className="profile-button" onClick={() => navigate('/profile')}>
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="profile-name">{user?.name}</span>
            </button>
          </div>
        </div>
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

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 calc(var(--spacing-unit) * 2);
          }

          .navbar-menu {
            gap: calc(var(--spacing-unit) * 2);
          }

          .navbar-link {
            display: none;
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