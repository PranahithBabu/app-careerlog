import { useNavigate } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { logs, getWeeklyLogs, getLogsWithSTAR, clearLogs } = useData();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Delete all logs handler
  const handleDeleteAllLogs = () => {
    if (window.confirm('Are you sure you want to delete ALL your logs? This action cannot be undone.')) {
      clearLogs();
      alert('All logs deleted.');
      navigate('/profile');
    }
  };

  const weeklyLogs = getWeeklyLogs();
  const starLogs = getLogsWithSTAR();

  return (
    <div className="profile">
      <Navbar />
      
      <div className="profile-content">
        <div className="container">
          <div className="profile-header">
            <h1>Profile</h1>
            <p>Manage your account and view your progress</p>
          </div>

          <div className="profile-layout">
            <div className="profile-card">
              <div className="profile-avatar-section">
                <div className="profile-avatar-large">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="profile-info">
                  <h2>{user?.name}</h2>
                  <p>{user?.email}</p>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn btn-warning" style={{marginTop: '1.5rem', marginRight: '1rem'}} onClick={handleDeleteAllLogs}>
                  Delete All Logs
                </button>
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>{logs.length}</h3>
                  <p>Total Logs</p>
                  <span className="stat-desc">All your work highlights</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>{weeklyLogs.length}</h3>
                  <p>This Week</p>
                  <span className="stat-desc">Recent activity</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <h3>{starLogs.length}</h3>
                  <p>STAR Stories</p>
                  <span className="stat-desc">Interview ready</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <h3>{logs.length > 0 ? Math.round((starLogs.length / logs.length) * 100) : 0}%</h3>
                  <p>STAR Coverage</p>
                  <span className="stat-desc">Logs with STAR format</span>
                </div>
              </div>
            </div>

            <div className="activity-section">
              <h3>Recent Activity</h3>
              {logs.length === 0 ? (
                <div className="no-activity">
                  <p>No logs created yet. Start tracking your work highlights!</p>
                </div>
              ) : (
                <div className="activity-summary">
                  <div className="activity-item">
                    <div className="activity-icon">✏️</div>
                    <div className="activity-content">
                      <p>Latest log: <strong>{logs[logs.length - 1]?.title}</strong></p>
                      <span>{new Date(logs[logs.length - 1]?.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {(new Date(logs[logs.length - 1]?.createdAt) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)) ? (
                      <div className="activity-item">
                        <div className="activity-icon">📈</div>
                        <div className="activity-content">
                          <p>You've been consistent with logging your work</p>
                          <span>Keep up the great work!</span>
                        </div>
                      </div>
                    ) : (
                      <div className="activity-item">
                        <div className="activity-icon">📅</div>
                        <div className="activity-content">
                          <p>No activity in the last few days</p>
                          <span>Start logging your work highlights!</span>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile {
          min-height: 100vh;
          background: var(--bg-secondary);
        }

        .profile-content {
          padding: calc(var(--spacing-unit) * 4) 0;
        }

        .profile-header {
          text-align: center;
          margin-bottom: calc(var(--spacing-unit) * 6);
        }

        .profile-header h1 {
          margin-bottom: calc(var(--spacing-unit));
        }

        .profile-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        .profile-layout {
          display: grid;
          gap: calc(var(--spacing-unit) * 4);
          max-width: 1000px;
          margin: 0 auto;
        }

        .profile-card {
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          overflow: hidden;
        }

        .profile-avatar-section {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-unit) * 3);
          padding: calc(var(--spacing-unit) * 4);
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
        }

        .profile-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .profile-info h2 {
          margin-bottom: calc(var(--spacing-unit) / 2);
          color: white;
        }

        .profile-info p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
        }

        .profile-actions {
          padding: calc(var(--spacing-unit) * 3);
          border-top: 1px solid var(--border-light);
          text-align: right;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: calc(var(--spacing-unit) * 3);
        }

        .stat-card {
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          padding: calc(var(--spacing-unit) * 3);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: calc(var(--spacing-unit) * 2);
        }

        .stat-content h3 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: calc(var(--spacing-unit) / 2);
        }

        .stat-content p {
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: calc(var(--spacing-unit) / 2);
        }

        .stat-desc {
          color: var(--text-light);
          font-size: 0.75rem;
        }

        .account-section,
        .activity-section {
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          padding: calc(var(--spacing-unit) * 4);
        }

        .account-section h3,
        .activity-section h3 {
          margin-bottom: calc(var(--spacing-unit) * 3);
          color: var(--text-primary);
        }

        .account-details {
          display: grid;
          gap: calc(var(--spacing-unit) * 2);
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: calc(var(--spacing-unit) * 1.5);
          background: var(--bg-secondary);
          border-radius: var(--border-radius);
        }

        .detail-item label {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .detail-item span {
          color: var(--text-primary);
          font-weight: 500;
        }

        .no-activity {
          text-align: center;
          padding: calc(var(--spacing-unit) * 3);
          color: var(--text-secondary);
        }

        .activity-summary {
          display: grid;
          gap: calc(var(--spacing-unit) * 2);
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-unit) * 2);
          padding: calc(var(--spacing-unit) * 2);
          background: var(--bg-secondary);
          border-radius: var(--border-radius);
        }

        .activity-icon {
          font-size: 1.5rem;
          width: 40px;
          text-align: center;
        }

        .activity-content p {
          color: var(--text-primary);
          margin-bottom: calc(var(--spacing-unit) / 2);
        }

        .activity-content span {
          color: var(--text-light);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .profile-content {
            padding: calc(var(--spacing-unit) * 2) 0;
          }

          .profile-avatar-section {
            flex-direction: column;
            text-align: center;
            gap: calc(var(--spacing-unit) * 2);
          }

          .profile-actions {
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .detail-item {
            flex-direction: column;
            align-items: flex-start;
            gap: calc(var(--spacing-unit) / 2);
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;