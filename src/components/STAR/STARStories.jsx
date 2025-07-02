import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import { useData } from '../../context/DataContext';

const STARStories = () => {
  const { getLogsWithSTAR } = useData();
  const [copiedId, setCopiedId] = useState(null);
  
  const starLogs = getLogsWithSTAR();

  const formatSTARStory = (log) => {
    let story = `${log.title}\n\n`;
    
    if (log.situation) {
      story += `Situation: ${log.situation}\n\n`;
    }
    
    if (log.task) {
      story += `Task: ${log.task}\n\n`;
    }
    
    if (log.action) {
      story += `Action: ${log.action}\n\n`;
    }
    
    if (log.result) {
      story += `Result: ${log.result}`;
    }
    
    return story;
  };

  const copyToClipboard = async (log) => {
    try {
      const story = formatSTARStory(log);
      await navigator.clipboard.writeText(story);
      setCopiedId(log.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
    <div className="star-stories">
      <Navbar />
      
      <div className="star-stories-content">
        <div className="container">
          <div className="star-stories-header">
            <div className="header-content">
              <h1>STAR Stories</h1>
              <p>Your structured stories ready for behavioral interviews</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-outline coming-soon-btn">
                Generate STAR Story
                <span className="coming-soon">Coming Soon</span>
              </button>
            </div>
          </div>

          {starLogs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⭐</div>
              <h3>No STAR stories yet</h3>
              <p>Create logs with STAR format details to build your collection of behavioral interview stories.</p>
              <Link to="/add-log" className="btn btn-primary">
                Add Your First STAR Log
              </Link>
            </div>
          ) : (
            <div className="star-stories-grid">
              {starLogs.map(log => (
                <div key={log.id} className="star-story-card">
                  <div className="story-header">
                    <div className="story-title-section">
                      <h3 className="story-title">{log.title}</h3>
                      <div className="story-meta">
                        <span className={`chip ${getCategoryColor(log.category)}`}>
                          {log.category}
                        </span>
                        <span className="story-date">
                          {new Date(log.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(log)}
                      className={`copy-btn ${copiedId === log.id ? 'copied' : ''}`}
                      title="Copy STAR story to clipboard"
                    >
                      {copiedId === log.id ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </div>

                  <div className="story-content">
                    {log.situation && (
                      <div className="star-section">
                        <h4>Situation</h4>
                        <p>{log.situation}</p>
                      </div>
                    )}

                    {log.task && (
                      <div className="star-section">
                        <h4>Task</h4>
                        <p>{log.task}</p>
                      </div>
                    )}

                    {log.action && (
                      <div className="star-section">
                        <h4>Action</h4>
                        <p>{log.action}</p>
                      </div>
                    )}

                    {log.result && (
                      <div className="star-section">
                        <h4>Result</h4>
                        <p>{log.result}</p>
                      </div>
                    )}
                  </div>

                  <div className="story-footer">
                    <Link to={`/log/${log.id}`} className="btn btn-sm btn-outline">
                      View Full Log
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .star-stories {
          min-height: 100vh;
          background: var(--bg-secondary);
        }

        .star-stories-content {
          padding: calc(var(--spacing-unit) * 4) 0;
        }

        .star-stories-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: calc(var(--spacing-unit) * 6);
        }

        .header-content h1 {
          margin-bottom: calc(var(--spacing-unit));
        }

        .header-content p {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        .header-actions {
          position: relative;
        }

        .coming-soon-btn {
          position: relative;
          opacity: 0.7;
          cursor: not-allowed;
        }

        .coming-soon {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--accent-color);
          color: white;
          font-size: 0.6rem;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
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

        .star-stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: calc(var(--spacing-unit) * 4);
        }

        .star-story-card {
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .star-story-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .story-header {
          padding: calc(var(--spacing-unit) * 3);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-light);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: calc(var(--spacing-unit) * 2);
        }

        .story-title-section {
          flex: 1;
        }

        .story-title {
          margin-bottom: calc(var(--spacing-unit));
          color: var(--text-primary);
          font-size: 1.125rem;
          line-height: 1.4;
        }

        .story-meta {
          display: flex;
          align-items: center;
          gap: calc(var(--spacing-unit) * 2);
        }

        .story-date {
          color: var(--text-light);
          font-size: 0.75rem;
        }

        .copy-btn {
          background: var(--secondary-color);
          color: white;
          border: none;
          padding: calc(var(--spacing-unit)) calc(var(--spacing-unit) * 2);
          border-radius: var(--border-radius);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .copy-btn:hover {
          background: var(--secondary-hover);
          transform: translateY(-1px);
        }

        .copy-btn.copied {
          background: var(--success-color);
        }

        .story-content {
          padding: calc(var(--spacing-unit) * 3);
        }

        .star-section {
          margin-bottom: calc(var(--spacing-unit) * 3);
        }

        .star-section:last-child {
          margin-bottom: 0;
        }

        .star-section h4 {
          color: var(--primary-color);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: calc(var(--spacing-unit));
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .star-section p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .story-footer {
          padding: calc(var(--spacing-unit) * 3);
          border-top: 1px solid var(--border-light);
          background: var(--bg-secondary);
          text-align: right;
        }

        @media (max-width: 768px) {
          .star-stories-content {
            padding: calc(var(--spacing-unit) * 2) 0;
          }

          .star-stories-header {
            flex-direction: column;
            gap: calc(var(--spacing-unit) * 3);
          }

          .star-stories-grid {
            grid-template-columns: 1fr;
            gap: calc(var(--spacing-unit) * 3);
          }

          .story-header {
            flex-direction: column;
            align-items: stretch;
            gap: calc(var(--spacing-unit) * 2);
          }

          .story-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: calc(var(--spacing-unit));
          }

          .copy-btn {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default STARStories;