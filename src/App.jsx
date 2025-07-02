import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import AddLog from './components/Logs/AddLog';
import ViewLog from './components/Logs/ViewLog';
import EditLog from './components/Logs/EditLog';
import STARStories from './components/STAR/STARStories';
import Profile from './components/Profile/Profile';
import './App.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/add-log" element={
                <PrivateRoute>
                  <AddLog />
                </PrivateRoute>
              } />
              <Route path="/log/:id" element={
                <PrivateRoute>
                  <ViewLog />
                </PrivateRoute>
              } />
              <Route path="/edit-log/:id" element={
                <PrivateRoute>
                  <EditLog />
                </PrivateRoute>
              } />
              <Route path="/star-stories" element={
                <PrivateRoute>
                  <STARStories />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;