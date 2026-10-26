import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { TaskProvider } from './context/TaskContext.js';
import { ProtectedRoute } from './components/common/ProtectedRoute.js';
import { LandingPage } from './pages/LandingPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { TaskDetailsPage } from './pages/TaskDetailsPage.js';
import { SettingsPage } from './pages/SettingsPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes (requires JWT auth) */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <TaskProvider>
                  <DashboardPage />
                </TaskProvider>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <TaskProvider>
                  <TaskDetailsPage />
                </TaskProvider>
              }
            />
            <Route
              path="/settings"
              element={
                <TaskProvider>
                  <SettingsPage />
                </TaskProvider>
              }
            />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
