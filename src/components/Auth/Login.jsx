import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during login');
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
            <p>Your personal work tracker</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="auth-links">
            <Link to="/signup" className="auth-link">
              Don't have an account? Sign up
            </Link>
            <a href="#" className="auth-link forgot-password">
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="auth-footer">
          <p>By logging in you agree to our Terms and Privacy Policy.</p>
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
          display: flex;
          flex-direction: column;
          gap: calc(var(--spacing-unit));
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

        .forgot-password {
          color: var(--text-secondary);
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

export default Login;