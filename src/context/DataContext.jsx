import { createContext, useContext, useState, useEffect } from 'react';
import {
  getLogs as getStoredLogs,
  saveLog as saveStoredLog,
  updateLog as updateStoredLog,
  deleteLog as deleteStoredLog,
  clearLogs as clearStoredLogs
} from '../utils/logStorage';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    setLogs(getStoredLogs());
  }, []);

  // Add a new log
  const addLog = (logData) => {
    const newLog = {
      id: Date.now().toString(),
      title: logData.title,
      description: logData.description,
      category: logData.category,
      tags: logData.tags || [],
      star: logData.star || { situation: '', task: '', action: '', result: '' },
      createdAt: new Date().toISOString()
    };
    saveStoredLog(newLog);
    setLogs(getStoredLogs());
    return newLog.id;
  };

  // Update an existing log
  const updateLog = (id, logData) => {
    updateStoredLog(id, logData);
    setLogs(getStoredLogs());
  };

  // Delete a log
  const deleteLog = (id) => {
    deleteStoredLog(id);
    setLogs(getStoredLogs());
  };

  // Clear all logs
  const clearAllLogs = () => {
    clearStoredLogs();
    setLogs([]);
  };

  // Get a single log by id
  const getLog = (id) => {
    return logs.find(log => log.id === id);
  };

  // Get logs with STAR fields populated
  const getLogsWithSTAR = () => {
    return logs.filter(log =>
      log.star && (log.star.situation || log.star.task || log.star.action || log.star.result)
    );
  };

  // Filter logs by category
  const getLogsByCategory = (category) => {
    return logs.filter(log => log.category === category);
  };

  // Filter logs by tag
  const getLogsByTag = (tag) => {
    return logs.filter(log => log.tags && log.tags.includes(tag));
  };

  // Get logs from the last 7 days
  const getWeeklyLogs = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return logs.filter(log => new Date(log.createdAt) >= oneWeekAgo);
  };

  // Get the most used tag
  const getTopTag = () => {
    const tagCounts = {};
    logs.forEach(log => {
      if (log.tags) {
        log.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    const topTag = Object.keys(tagCounts).reduce((a, b) =>
      tagCounts[a] > tagCounts[b] ? a : b, null
    );
    return topTag;
  };

  const value = {
    logs,
    addLog,
    updateLog,
    deleteLog,
    getLog,
    getLogsWithSTAR,
    getLogsByCategory,
    getLogsByTag,
    getWeeklyLogs,
    getTopTag,
    clearLogs: clearAllLogs
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};