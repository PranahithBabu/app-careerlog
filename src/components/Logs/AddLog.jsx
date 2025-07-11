import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { generateSTARFromDescription } from '../../utils/gemini';
import { containsNonWorkKeyword } from '../../utils/validation';
import Navbar from '../Common/Navbar';

const categories = [
  'Bug Fix',
  'Feature',
  'Learning',
  'Teamwork',
  'Issue Solved',
  'Production Issue'
];

// Utility function for pre-AI input validation
function isDescriptionValid(desc) {
  // Too short
  if (!desc || desc.trim().split(/\s+/).length < 8) return false;
  // Too few alphabetic characters
  const alphaCount = (desc.match(/[a-zA-Z]/g) || []).length;
  if (alphaCount < desc.length * 0.5) return false;
  // Highly repetitive (same word > 40% of total)
  const words = desc.trim().toLowerCase().split(/\s+/);
  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  const maxFreq = Math.max(...Object.values(freq));
  if (maxFreq > words.length * 0.4) return false;
  return true;
}

// Utility function for post-AI output validation
function isSTARResponseValid(star) {
  if (!star) return false;
  const badWords = [
    'nonsensical', 'gibberish', 'unintelligible', 'no meaningful content',
    'corrupted', 'malfunction', 'absence of meaningful', 'lack of meaningful',
    'further investigation', 'data entry error', 'system malfunction'
  ];
  const fields = [star.situation, star.task, star.action, star.result].join(' ').toLowerCase();
  return !badWords.some(word => fields.includes(word));
}

const AddLog = () => {
  const { addLog } = useData();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [star, setStar] = useState({ situation: '', task: '', action: '', result: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [starGenerated, setStarGenerated] = useState(false);

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
    const newTags = tags.filter((_, i) => i !== idx);
    setTags(newTags);
  };

  // Generate STAR story using Gemini API
  const handleGenerateSTAR = async () => {
    setError('');
    setStarGenerated(false);
    // Pre-AI validation: keyword-based
    if (containsNonWorkKeyword(description)) {
      setError('Please enter a work-related description to generate a STAR story.');
      return;
    }
    // Pre-AI validation: structure/length
    if (!isDescriptionValid(description)) {
      setError('Please enter a clear and meaningful description of your work (at least 8 words, not repetitive or gibberish).');
      return;
    }
    setLoading(true);
    try {
      const result = await generateSTARFromDescription(description);
      // Post-AI validation: check for structured refusal
      if (
        result.situation === 'Not work-related' &&
        result.task === 'Not work-related' &&
        result.action === 'Not work-related' &&
        result.result === 'Not work-related'
      ) {
        setError('Please enter a work-related description to generate a STAR story.');
        setStarGenerated(false);
        setStar({ situation: '', task: '', action: '', result: '' });
        return;
      }
      // Post-AI validation: catch other bad responses
      if (!isSTARResponseValid(result)) {
        setError('Could not generate a STAR story. Please provide a clearer, more meaningful description.');
        setStarGenerated(false);
        setStar({ situation: '', task: '', action: '', result: '' });
        return;
      }
      setStar(result);
      setStarGenerated(true);
    } catch (err) {
      setError(err.message || 'Failed to generate STAR story.');
    } finally {
      setLoading(false);
    }
  };

  // Save log
  const handleSave = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }
    addLog({ title, description, category, tags, star });
    navigate('/dashboard');
  };

  return (
    <div>
        <Navbar />
        <div className="add-log-container">
            
        {/* Heading and back button on the same line */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>Add New Log</h2>
            <button
            className="btn btn-outline back-dashboard-btn"
            style={{ minWidth: 50, marginLeft: '1rem' }}
            onClick={() => navigate('/dashboard')}
            >
            <span className="back-arrow">&#8592;</span>
            <span className="back-text"> Back to Dashboard</span>
            </button>
        </div>
        <form className="add-log-form" onSubmit={handleSave}>
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
            <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGenerateSTAR}
            disabled={loading || !description}
            >
            {loading ? 'Generating STAR...' : 'Generate STAR Story'}
            </button>
            {error && <div className="error-message">{error}</div>}
            {starGenerated && (
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
            )}
            <button type="submit" className="btn btn-primary save-log-btn" disabled={loading}>
            Save Log
            </button>
        </form>
        <style jsx>{`
            .add-log-container {
            max-width: 600px;
            margin: 2rem auto;
            background: var(--bg-primary);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-md);
            padding: 2rem;
            }
            .add-log-form label {
            display: block;
            margin-bottom: 1rem;
            color: var(--text-primary);
            }
            .add-log-form input[type="text"],
            .add-log-form select,
            .add-log-form textarea {
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
            .save-log-btn {
            margin-top: 1.5rem;
            margin-left: 5px;
            }
            .add-log-form select {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            }
            /* Prevent select dropdown from overflowing parent */
            .add-log-form label {
            position: relative;
            }
            .add-log-form select {
            position: relative;
            z-index: 1;
            }
            /* For some browsers, force dropdown to not overflow */
            .add-log-form select:focus {
            outline: 2px solid var(--primary-color);
            }
        `}</style>
        </div>
    </div>
  );
};

export default AddLog; 