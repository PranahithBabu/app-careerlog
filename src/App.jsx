import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Dashboard from './components/Dashboard/Dashboard';
import AddLog from './components/Logs/AddLog';
import ViewLog from './components/Logs/ViewLog';
import EditLog from './components/Logs/EditLog';
import STARStories from './components/STAR/STARStories';
import Profile from './components/Profile/Profile';
import Hero from './components/Hero/Hero';
import './App.css';
import { useEffect, useState } from 'react';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
}

function App() {
  const [hasLogs, setHasLogs] = useState(null);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('careerlog-logs') || '[]');
    setHasLogs(logs.length > 0);
  }, []);

  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={hasLogs ? <Dashboard /> : <Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-log" element={<AddLog />} />
            <Route path="/log/:id" element={<ViewLog />} />
            <Route path="/edit-log/:id" element={<EditLog />} />
            <Route path="/star-stories" element={<STARStories />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;