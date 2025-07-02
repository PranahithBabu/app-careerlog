import { Link } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import { useData } from '../../context/DataContext';

const Dashboard = () => {
  const { logs, getWeeklyLogs, getTopTag } = useData();
  
  const weeklyLogs = getWeeklyLogs();
  const topTag = getTopTag();
  const recentLogs = logs.slice(0, 5);

  const getCategoryColor = (category) => {
    const colors = {
      'Bug Fix': 'chip-error',
      'Feature': 'chip-primary',
      'Learning': 'chip-secondary',
      'Teamwork': 'chip-success',
      'Issue Solved': 'chip-warning'
    };
    return colors[category] || 'chip';
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-header">
            <h1>Welcome back!</h1>
            <p>Track your daily work highlights and build your professional story</p>
          </div>

          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-icon">📊</div>
              <div className="summary-content">
                <h3>{logs.length}</h3>
                <p>Total Logs</p>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">📅</div>
              <div className="summary-content">
                <h3>{weeklyLogs.length}</h3>
                <p>This Week</p>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">🏷️</div>
              <div className="summary-content">
                <h3>{topTag || 'None'}</h3>
                <p>Top Tag</p>
              </div>
            </div>
          </div>

          <div className="main-actions">
            <Link to="/add-log" className="btn btn-primary btn-lg add-log-btn">
              <span className="btn-icon">+</span>
              Add New Log
            </Link>
          </div>

          <div className="recent-logs">
            <div className="section-header">
              <h2>Recent Logs</h2>
              {logs.length > 5 && (
                <Link to="/logs" className="view-all-link">View All</Link>
              )}
            </div>

            {logs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No logs yet</h3>
                <p>Start tracking your work highlights by creating your first log entry.</p>
                <Link to="/add-log" className="btn btn-primary">
                  Create Your First Log
                </Link>
              </div>
            ) : (
              <div className="logs-grid">
                {recentLogs.map(log => (
                  <div key={log.id} className="log-card">
                    <div className="log-card-header">
                      <h3 className="log-title">{log.title}</h3>
                      <span className={`chip ${getCategoryColor(log.category)}`}>
                        {log.category}
                      </span>
                    </div>
                    
                    <p className="log-description">
                      {log.description.length > 100 
                        ? `${log.description.substring(0, 100)}...` 
                        : log.description
                      }
                    </p>
                    
                    {log.tags && log.tags.length > 0 && (
                      <div className="log-tags">
                        {log.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="chip">
                            {tag}
                          </span>
                        ))}
                        {log.tags.length > 3 && (
                          <span className="chip">+{log.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                    
                    <div className="log-card-footer">
                      <span className="log-date">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </span>
                      <Link to={`/log/${log.id}`} className="btn btn-sm btn-outline">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: var(--bg-secondary);
        }

        .dashboard-content {
          padding: calc(var(--spacing-unit) * 4) 0;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: calc(var(--spacing-unit) * 6);
        }

        .dashboard-header h1 {
          margin-bottom: calc(var(--spacing-unit));
          color: var(--text-primary);
        }

        .dashboard-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: calc(var(--spacing-unit) * 3);
          margin-bottom: calc(var(--spacing-unit) * 6);
        }

        .summary-card {
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          padding: calc(var(--spacing-unit) * 3);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-unit) * 2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .summary-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .summary-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border-radius: var(--border-radius);
        }

        .summary-content h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: calc(var(--spacing-unit) / 2);
        }

        .summary-content p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .main-actions {
          display: flex;
          justify-content: center;
          margin-bottom: calc(var(--spacing-unit) * 6);
        }

        .add-log-btn {
          font-size: 1.125rem;
          padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border: none;
          box-shadow: var(--shadow-md);
        }

        .add-log-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-icon {
          font-size: 1.25rem;
          font-weight: bold;
        }

        .recent-logs {
          margin-top: calc(var(--spacing-unit) * 6);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: calc(var(--spacing-unit) * 3);
        }

        .section-header h2 {
          color: var(--text-primary);
        }

        .view-all-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .view-all-link:hover {
          text-decoration: underline;
        }

        .empty-state {
          text-align: center;
          padding: calc(var(--spacing-unit) * 6);
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          border: 2px dashed var(--border-color);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: calc(var(--spacing-unit) * 2);
        }

        .empty-state h3 {
          margin-bottom: calc(var(--spacing-unit));
          color: var(--text-primary);
        }

        .empty-state p {
          margin-bottom: calc(var(--spacing-unit) * 3);
          color: var(--text-secondary);
        }

        .logs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: calc(var(--spacing-unit) * 3);
        }

        .log-card {
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          padding: calc(var(--spacing-unit) * 3);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .log-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .log-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: calc(var(--spacing-unit));
          margin-bottom: calc(var(--spacing-unit) * 2);
        }

        .log-title {
          flex: 1;
          font-size: 1.125rem;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .log-description {
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: calc(var(--spacing-unit) * 2);
        }

        .log-tags {
          display: flex;
          flex-wrap: wrap;
          gap: calc(var(--spacing-unit) / 2);
          margin-bottom: calc(var(--spacing-unit) * 2);
        }

        .log-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: calc(var(--spacing-unit) * 2);
          border-top: 1px solid var(--border-light);
        }

        .log-date {
          color: var(--text-light);
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            padding: calc(var(--spacing-unit) * 2) 0;
          }

          .summary-cards {
            grid-template-columns: 1fr;
            gap: calc(var(--spacing-unit) * 2);
          }

          .logs-grid {
            grid-template-columns: 1fr;
            gap: calc(var(--spacing-unit) * 2);
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: calc(var(--spacing-unit));
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;