// Utility functions for managing logs in localStorage for CareerLog
// Data model: { id, title, description, category, tags, star: {situation, task, action, result}, createdAt }

const STORAGE_KEY = 'careerlog-logs';

/**
 * Get all logs from localStorage.
 * @returns {Array} Array of log objects
 */
export function getLogs() {
  const logs = localStorage.getItem(STORAGE_KEY);
  return logs ? JSON.parse(logs) : [];
}

/**
 * Save a new log to localStorage.
 * @param {Object} log - The log object to save
 */
export function saveLog(log) {
  const logs = getLogs();
  logs.push(log);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

/**
 * Update an existing log by id.
 * @param {string} id - The id of the log to update
 * @param {Object} updatedLog - The updated log object
 */
export function updateLog(id, updatedLog) {
  const logs = getLogs();
  const idx = logs.findIndex(l => l.id === id);
  if (idx !== -1) {
    logs[idx] = { ...logs[idx], ...updatedLog };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }
}

/**
 * Delete a log by id.
 * @param {string} id - The id of the log to delete
 */
export function deleteLog(id) {
  const logs = getLogs();
  const filtered = logs.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Clear all logs from localStorage.
 */
export function clearLogs() {
  localStorage.removeItem(STORAGE_KEY);
} 