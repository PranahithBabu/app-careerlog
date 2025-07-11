import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useEffect, useState } from 'react';
import Navbar from '../Common/Navbar';

const ViewLog = () => {
  const { id } = useParams();
  const { getLog, deleteLog } = useData();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const log = getLog(id);

  // Copy STAR story to clipboard
  const handleCopySTAR = () => {
    if (!log || !log.star) return;
    const text = `Situation: ${log.star.situation}\nTask: ${log.star.task}\nAction: ${log.star.action}\nResult: ${log.star.result}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Delete log handler
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this log? This action cannot be undone.')) {
      deleteLog(log.id);
      navigate('/dashboard');
    }
  };

  if (!log) {
    return (
      <div className="view-log-container">
        <h2>Log Not Found</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div>
        <Navbar />
        <div className="view-log-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2>{log.title}</h2>
                    <div className="log-meta">
                        <span className="chip">{log.category}</span>
                        {/* <span className="log-date">{new Date(log.createdAt).toLocaleString()}</span> */}
                    </div>
                </div>
                <button
                className="btn btn-outline back-dashboard-btn"
                style={{ minWidth: 50, marginLeft: '1rem' }}
                onClick={() => navigate('/dashboard')}
                >
                <span className="back-arrow">&#8592;</span>
                <span className="back-text"> Back to Dashboard</span>
                </button>
            </div>
            <p className="log-description">{log.description}</p>
            {log.tags && log.tags.length > 0 && (
                <div className="log-tags">
                {log.tags.map(tag => (
                    <span className="chip" key={tag}>{tag}</span>
                ))}
                </div>
            )}

            {log.star && log.star.situation && log.star.task && log.star.action && log.star.result ? (
            <div className="star-section">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <h3>STAR Story</h3>
                  <button className="btn btn-secondary" onClick={handleCopySTAR} style={{display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 0, marginRight: 0}}>
                    {copied ? '✓ Copied' : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle' }}>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <rect x="3" y="3" width="13" height="13" rx="2" ry="2" />
                      </svg>
                    )}
                </button>
                </div>
                <div className="star-field"><strong>Situation:</strong> {log.star?.situation}</div>
                <div className="star-field"><strong>Task:</strong> {log.star?.task}</div>
                <div className="star-field"><strong>Action:</strong> {log.star?.action}</div>
                <div className="star-field"><strong>Result:</strong> {log.star?.result}</div>
            </div>
            ) : (
                <div className="star-section">
                    <p>STAR story not yet generated.</p>
                </div>
            )}
            <div className="log-actions">
                <button className="btn btn-primary" onClick={() => navigate(`/edit-log/${log.id}`)}>Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
            <style jsx>{`
                .view-log-container {
                max-width: 600px;
                margin: 2rem auto;
                background: var(--bg-primary);
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-md);
                padding: 2rem;
                }
                .log-meta {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
                }
                .chip {
                background: var(--bg-secondary);
                border-radius: var(--border-radius);
                padding: 0.25rem 0.75rem;
                font-size: 0.95rem;
                }
                .log-date {
                color: var(--text-light);
                }
                .log-description {
                margin-bottom: 1rem;
                color: var(--text-primary);
                }
                .log-tags {
                margin-bottom: 1rem;
                }
                .star-section {
                background: var(--bg-secondary);
                border-radius: var(--border-radius);
                padding: 1rem;
                margin-bottom: 1.5rem;
                }
                .star-field {
                margin-bottom: 0.5rem;
                }
                .log-actions {
                display: flex;
                gap: 1rem;
                }
                .back-dashboard-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                }
                .back-arrow {
                font-size: 1.1em;
                }
                @media (max-width: 500px) {
                .back-dashboard-btn .back-text {
                    display: none;
                }
                }
            `}</style>
        </div>
    </div>
  );
};

export default ViewLog; 