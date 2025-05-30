import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import CouponListingPage from './pages/CouponListingPage';
import CouponDetailPage from './pages/CouponDetailPage';
import BusinessDashboard from './pages/BusinessDashboard';
import CreateCouponPage from './pages/CreateCouponPage';
import FortuneWheelPage from './pages/FortuneWheelPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainDashboard from './components/Dashboard/MainDashboard';

function AppContent() {
  const location = useLocation();

  // Cache Header/Footer si l'URL commence par "/dashboard" ou "/business"
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/business');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!isDashboard && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coupons" element={<CouponListingPage />} />
          <Route path="/coupons/:id" element={<CouponDetailPage />} />
          <Route path="/fortune-wheel" element={<FortuneWheelPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/business/*" 
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<BusinessDashboard />} />
                  <Route path="create-coupon" element={<CreateCouponPage />} />
                  <Route path="edit-coupon/:id" element={<CreateCouponPage />} />
                </Routes>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
