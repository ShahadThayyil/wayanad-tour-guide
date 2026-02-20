// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis'; // Smooth scrolling

// --- CONTEXT & SECURITY ---
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import GlobalLoader from './components/GlobalLoader';
import GuideLayout from './components/GuideLayout';
import AdminLayout from './components/AdminLayout';

// --- PUBLIC PAGES ---
import Home from './pages/user/Home';
import Explore from './pages/user/Explore';
import PlaceDetails from './pages/user/PlaceDetails';

// --- AUTH PAGES ---
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// --- USER PROTECTED PAGES ---
import GuideBooking from './pages/user/GuideBooking';
import UserBookings from './pages/user/UserBookings';

// --- GUIDE PROTECTED PAGES ---
import GuideHome from './pages/guide/GuideHome';
import Requests from './pages/guide/Requests';
import MyProfile from './pages/guide/MyProfile';

// --- ADMIN PROTECTED PAGES ---
import AdminHome from './pages/admin/AdminHome';
import ManageUsers from './pages/admin/ManageUsers';
import ManageGuides from './pages/admin/ManageGuides';
import ManagePlaces from './pages/admin/ManagePlaces';
import ViewBookings from './pages/admin/ViewBooking';

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const { loading: authLoading } = useAuth(); // Track Firebase Auth initialization

  // --- SMOOTH SCROLLING (LENIS) INIT ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Cleanup on unmount
  }, []);

  // --- LOADER LOGIC ---
  useEffect(() => {
    const handleReady = () => {
      // Add a slight 0.8s delay so the loader doesn't disappear too abruptly
      setTimeout(() => {
        setIsAppReady(true);
      }, 800); 
    };

    // Wait for the browser to finish loading assets AND Firebase Auth to be ready
    if (document.readyState === 'complete' && !authLoading) {
      handleReady();
    } else {
      window.addEventListener('load', () => {
        if (!authLoading) handleReady();
      });
    }

    return () => window.removeEventListener('load', handleReady);
  }, [authLoading]);


  return (
    <>
      {/* ================= GLOBAL LOADER ================= */}
      <AnimatePresence>
        {!isAppReady && <GlobalLoader key="global-loader" />}
      </AnimatePresence>

      {/* ================= MAIN APPLICATION ================= */}
      {/* We hide overflow while loading to prevent scrolling before the app is ready */}
      <div 
        className="w-full relative"
        style={{ 
          height: isAppReady ? 'auto' : '100vh', 
          overflow: isAppReady ? 'auto' : 'hidden' 
        }}
      >
        <Router>
          <Routes>
            
            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<><Navbar /><Home /></>} />
            <Route path="/explore" element={<><Navbar /><Explore /></>} />
            <Route path="/place/:id" element={<PlaceDetails />} />
            
            {/* ================= AUTH ROUTES ================= */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ================= PROTECTED USER ROUTES ================= */}
            <Route element={<ProtectedRoute />}>
               <Route path="/book-guide/:guideId" element={<GuideBooking />} />
               <Route path="/my-bookings" element={<><Navbar /><UserBookings /></>} />
            </Route>

            {/* ================= PROTECTED GUIDE DASHBOARD ================= */}
            <Route element={<ProtectedRoute allowedRoles={['guide']} />}>
              <Route path="/guide" element={<GuideLayout />}>
                <Route index element={<GuideHome />} />
                <Route path="requests" element={<Requests/>} />
                <Route path="profile" element={<MyProfile />} />
              </Route>
            </Route>

            {/* ================= PROTECTED ADMIN DASHBOARD ================= */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="guides" element={<ManageGuides />} />
                <Route path="bookings" element={<ViewBookings/>} />
                <Route path="places" element={<ManagePlaces />} />
              </Route>
            </Route>

          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;