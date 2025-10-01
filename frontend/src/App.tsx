import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { DailyInspirationPage } from './pages/DailyInspirationPage';
import { JournalPage } from './pages/JournalPage';
import { DiaryPage } from './pages/DiaryPage';
import { TimerPage } from './pages/TimerPage';
import  TherapistChatPage  from './pages/TherapistChatPage';
import { YogaMeditationPage } from './pages/YogaMeditationPage';
import { TherapistDirectoryPage } from './pages/TherapistDirectoryPage';
import { MoodQuizPage } from './pages/MoodQuizPage';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA]">
      {isAuthenticated && <Navigation />}
      <main className={isAuthenticated ? "pt-20" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <DailyInspirationPage />
              </ProtectedRoute>
            } />
            <Route path="/inspiration" element={
              <ProtectedRoute>
                <DailyInspirationPage />
              </ProtectedRoute>
            } />
            <Route path="/journal" element={
              <ProtectedRoute>
                <JournalPage />
              </ProtectedRoute>
            } />
            <Route path="/diary" element={
              <ProtectedRoute>
                <DiaryPage />
              </ProtectedRoute>
            } />
            <Route path="/mood-quiz" element={
              <ProtectedRoute>
                <MoodQuizPage />
              </ProtectedRoute>
            } />
            <Route path="/timer" element={
              <ProtectedRoute>
                <TimerPage />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <TherapistChatPage />
              </ProtectedRoute>
            } />
            <Route path="/yoga-meditation" element={
              <ProtectedRoute>
                <YogaMeditationPage />
              </ProtectedRoute>
            } />
            <Route path="/therapists" element={
              <ProtectedRoute>
                <TherapistDirectoryPage />
              </ProtectedRoute>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;