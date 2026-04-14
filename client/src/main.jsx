import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VendorPage from './pages/VendorPage';
import AdminPage from './pages/AdminPage';
import ChatPage from './pages/ChatPage';

const Protected = ({ roles, children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/vendor"
              element={
                <Protected roles={['vendor', 'admin']}>
                  <VendorPage />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected roles={['admin']}>
                  <AdminPage />
                </Protected>
              }
            />
            <Route
              path="/chat"
              element={
                <Protected roles={['admin', 'vendor', 'user']}>
                  <ChatPage />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
