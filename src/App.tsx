import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import CustomCursor from './components/common/CustomCursor';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import TourDetailPage from './pages/TourDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminToursPage from './pages/admin/AdminToursPage';
import AdminVideosPage from './pages/admin/AdminVideosPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AddTourPage from "./pages/admin/AddTourPage";
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';


function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-4xl md:text-6xl text-white font-serif tracking-wider">
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>W</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>a</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>n</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>d</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>e</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>r</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>l</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>u</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '1.0s' }}>x</span>
          <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '1.1s' }}>e</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/tours/:id" element={<TourDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
<Route path="/contact" element={<ContactPage />} />

<Route path="/admin/add-tour" element={<AddTourPage />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tours" 
            element={
              <ProtectedRoute role="admin">
                <AdminToursPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/videos" 
            element={
              <ProtectedRoute role="admin">
                <AdminVideosPage />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/admin/bookings" 
            element={
              <ProtectedRoute role="admin">
                <AdminBookingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/customers" 
            element={
              <ProtectedRoute role="admin">
                <AdminCustomersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/messages" 
            element={
              <ProtectedRoute role="admin">
                <AdminMessagesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute role="admin">
                <AdminSettingsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;