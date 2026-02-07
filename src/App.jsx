// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Home from './pages/user/Home';
import Explore from './pages/user/Explore';

// Guide Imports
import GuideLayout from './components/GuideLayout';
import MyProfile from './pages/guide/MyProfile';
import GuideHome from './pages/guide/GuideHome';
import Requests from './pages/guide/Requests';

// Admin Imports
import AdminLayout from './components/AdminLayout';
import ManageGuides from './pages/admin/ManageGuides';
import ManagePlaces from './pages/admin/ManagePlaces';
import AdminHome from './pages/admin/AdminHome';
import ManageUsers from './pages/admin/ManageUsers';
import ViewBookings from './pages/admin/ViewBooking';

// Auth Imports
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User/Booking Imports
import PlaceDetails from './pages/user/PlaceDetails';
import GuideBooking from './pages/user/GuideBooking';
import UserBookings from './pages/user/UserBookings';

// Security Import
import ProtectedRoute from './components/ProtectedRoute'; // <--- IMPORT THIS

function App() {



  return (
    <Router>
      <Routes>
        
        {/* ================= PUBLIC ROUTES ================= */}
        {/* Anyone can access these */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/explore" element={<><Navbar /><Explore /></>} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* ================= PROTECTED USER ROUTES ================= */}
        {/* Only Logged-in Users (Tourists, Guides, Admins) can access */}
        <Route element={<ProtectedRoute />}>
           <Route path="/book-guide/:guideId" element={<GuideBooking />} />
           <Route path="/my-bookings" element={<><Navbar /><UserBookings /></>} />
        </Route>


        {/* ================= PROTECTED GUIDE DASHBOARD ================= */}
        {/* Only users with role 'guide' can access */}
        <Route element={<ProtectedRoute allowedRoles={['guide']} />}>
          <Route path="/guide" element={<GuideLayout />}>
            <Route index element={<GuideHome />} />
            <Route path="requests" element={<Requests/>} />
            <Route path="profile" element={<MyProfile />} />
          </Route>
        </Route>


        {/* ================= PROTECTED ADMIN DASHBOARD ================= */}
        {/* Only users with role 'admin' can access */}
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
  );
}

export default App;