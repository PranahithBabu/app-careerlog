import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (user) {
      const savedLogs = localStorage.getItem(`careerlog_logs_${user.id}`);
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    } else {
      setLogs([]);
    }
  }, [user]);

  const saveLogs = (newLogs) => {
    if (user) {
      localStorage.setItem(`careerlog_logs_${user.id}`, JSON.stringify(newLogs));
      setLogs(newLogs);
    }
  };

  const addLog = (logData) => {
    const newLog = {
      id: Date.now().toString(),
      ...logData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedLogs = [newLog, ...logs];
    saveLogs(updatedLogs);
    return newLog.id;
  };

  const updateLog = (id, logData) => {
    const updatedLogs = logs.map(log => 
      log.id === id 
        ? { ...log, ...logData, updatedAt: new Date().toISOString() }
        : log
    );
    saveLogs(updatedLogs);
  };

  const deleteLog = (id) => {
    const updatedLogs = logs.filter(log => log.id !== id);
    saveLogs(updatedLogs);
  };

  const getLog = (id) => {
    return logs.find(log => log.id === id);
  };

  const getLogsWithSTAR = () => {
    return logs.filter(log => 
      log.situation || log.task || log.action || log.result
    );
  };

  const getLogsByCategory = (category) => {
    return logs.filter(log => log.category === category);
  };

  const getLogsByTag = (tag) => {
    return logs.filter(log => log.tags && log.tags.includes(tag));
  };

  const getWeeklyLogs = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return logs.filter(log => new Date(log.createdAt) >= oneWeekAgo);
  };

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
    getTopTag
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};