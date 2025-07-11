import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useState } from 'react';
import Navbar from '../Common/Navbar';

const categories = [
  'Bug Fix',
  'Feature',
  'Learning',
  'Teamwork',
  'Issue Solved',
  'Production Issue'
];

const EditLog = () => {
  const { id } = useParams();
  const { getLog, updateLog } = useData();
  const navigate = useNavigate();
  const log = getLog(id);

  // If log not found, show error
  if (!log) {
    return (
      <div className="edit-log-container">
        <h2>Log Not Found</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  // State for form fields
  const [title, setTitle] = useState(log.title);
  const [description, setDescription] = useState(log.description);
  const [category, setCategory] = useState(log.category);
  const [tags, setTags] = useState(log.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [star, setStar] = useState(log.star || { situation: '', task: '', action: '', result: '' });
  const [error, setError] = useState('');

  // Handle tag input and addition
  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const formattedTag = tagInput.trim().charAt(0).toUpperCase() + tagInput.trim().slice(1).toLowerCase();
      if (!tags.some(t => t.toLowerCase() === formattedTag.toLowerCase())) {
        setTags([...tags, formattedTag]);
      }
      setTagInput('');
    }
  };

  // Remove a tag by index
  const removeTag = (idx) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }
    updateLog(id, { title, description, category, tags, star });
    navigate(`/log/${id}`);
  };

  return (
    <div>
      <Navbar />
    <div className="edit-log-container">
      <h2>Edit Log</h2>
      <form className="edit-log-form" onSubmit={handleSave}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Short summary of your work"
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            placeholder="Describe what you did, learned, or solved"
            rows={4}
          />
        </label>
        <label>
          Category
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Tags
          <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem'}}>Add skill, tech, or keyword tags for your reference</p>
        </label>
        <div className="tags-input">
            {tags.map((tag, idx) => (
              <span className="tag" key={tag + idx}>
                {tag}
                <button
                  type="button"
                  tabIndex={0}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeTag(idx);
                  }}
                >
                  &times;
                </button>
              </span>
            ))}
            <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add tag and press Enter"
            />
        </div>
        <div className="star-fields">
          <h3>STAR Story (editable)</h3>
          <label>
            Situation
            <textarea
              value={star.situation}
              onChange={e => setStar({ ...star, situation: e.target.value })}
              rows={2}
            />
          </label>
          <label>
            Task
            <textarea
              value={star.task}
              onChange={e => setStar({ ...star, task: e.target.value })}
              rows={2}
            />
          </label>
          <label>
            Action
            <textarea
              value={star.action}
              onChange={e => setStar({ ...star, action: e.target.value })}
              rows={2}
            />
          </label>
          <label>
            Result
            <textarea
              value={star.result}
              onChange={e => setStar({ ...star, result: e.target.value })}
              rows={2}
            />
          </label>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/log/${id}`)}>Cancel</button>
      </form>
      <style jsx>{`
        .edit-log-container {
          max-width: 600px;
          margin: 2rem auto;
          background: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-md);
          padding: 2rem;
        }
        .edit-log-form label {
          display: block;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .edit-log-form input[type="text"],
        .edit-log-form select,
        .edit-log-form textarea {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          border-radius: var(--border-radius);
          border: 1px solid var(--border-light);
          font-size: 1rem;
        }
        .tags-input {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .tag {
          background: var(--bg-secondary);
          border-radius: var(--border-radius);
          padding: 0.25rem 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .tag button {
          background: none;
          border: none;
          color: var(--danger-color);
          font-size: 1rem;
          cursor: pointer;
        }
        .btn {
          margin-top: 1rem;
          margin-right: 1rem;
        }
        .star-fields {
          margin: 1.5rem 0;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: var(--border-radius);
        }
        .star-fields label {
          margin-bottom: 0.75rem;
        }
        .error-message {
          color: var(--danger-color);
          margin-top: 1rem;
        }
      `}</style>
      </div>
    </div>
  );
};

export default EditLog; 