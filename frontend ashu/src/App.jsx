import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import SubmissionPage from './pages/SubmissionPage';
import TrackingPage from './pages/TrackingPage';
import AdminDashboard from './pages/AdminDashboard';
import AIMonitoring from './pages/AIMonitoring';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout theme={theme} toggleTheme={toggleTheme} />}>
          <Route index element={<LandingPage />} />
          <Route path="submit" element={<SubmissionPage />} />
          <Route path="track" element={<TrackingPage />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="ai-monitor" element={<AIMonitoring />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
