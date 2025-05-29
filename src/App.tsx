import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
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
                      <Route path="/\" element={<BusinessDashboard />} />
                      <Route path="/create-coupon" element={<CreateCouponPage />} />
                      <Route path="/edit-coupon/:id" element={<CreateCouponPage />} />
                    </Routes>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;