import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = signup(name, email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <h1>CareerLog</h1>
            <p>Create your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="auth-links">
            <Link to="/login" className="auth-link">
              Already have an account? Login
            </Link>
          </div>
        </form>

        <div className="auth-footer">
          <p>By signing up you agree to our Terms and Privacy Policy.</p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-unit);
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        }

        .auth-card {
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 400px;
          overflow: hidden;
        }

        .auth-header {
          padding: calc(var(--spacing-unit) * 4);
          text-align: center;
          background: var(--bg-secondary);
        }

        .logo h1 {
          color: var(--primary-color);
          margin-bottom: calc(var(--spacing-unit));
        }

        .logo p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .auth-form {
          padding: calc(var(--spacing-unit) * 4);
        }

        .error-message {
          background-color: rgb(239 68 68 / 0.1);
          color: var(--error-color);
          padding: calc(var(--spacing-unit) * 1.5);
          border-radius: var(--border-radius);
          margin-bottom: calc(var(--spacing-unit) * 2);
          font-size: 0.875rem;
          text-align: center;
        }

        .auth-links {
          margin-top: calc(var(--spacing-unit) * 3);
          text-align: center;
        }

        .auth-link {
          color: var(--primary-color);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .auth-link:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }

        .auth-footer {
          padding: calc(var(--spacing-unit) * 3);
          background: var(--bg-secondary);
          text-align: center;
          border-top: 1px solid var(--border-light);
        }

        .auth-footer p {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        @media (max-width: 480px) {
          .auth-container {
            align-items: flex-start;
            padding-top: calc(var(--spacing-unit) * 6);
          }
          
          .auth-card {
            max-width: none;
            margin: 0 calc(var(--spacing-unit));
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;