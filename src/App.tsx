import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StaffLogin from './components/staff/Login';
import StaffDashboard from './components/staff/Dashboard';
import AppointmentList from './components/staff/AppointmentList';
import PatientList from './components/staff/PatientList';
import AppointmentDetail from './components/staff/AppointmentDetail';
import Settings from './components/staff/Settings';
import BookingPage from './components/patient/BookingPage';
import BookingSuccess from './components/patient/BookingSuccess';
import PatientAppointments from './components/patient/PatientAppointments';
import LandingPage from './components/LandingPage';

export default function App() {
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);

  useEffect(() => {
    // Check if staff is logged in from localStorage
    const staffLoggedIn = localStorage.getItem('staffLoggedIn') === 'true';
    setIsStaffLoggedIn(staffLoggedIn);
  }, []);

  const handleStaffLogin = () => {
    setIsStaffLoggedIn(true);
    localStorage.setItem('staffLoggedIn', 'true');
  };

  const handleStaffLogout = () => {
    setIsStaffLoggedIn(false);
    localStorage.removeItem('staffLoggedIn');
  };

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Staff routes */}
        <Route 
          path="/staff/login" 
          element={
            isStaffLoggedIn ? 
              <Navigate to="/staff/dashboard" /> : 
              <StaffLogin onLogin={handleStaffLogin} />
          } 
        />
        <Route 
          path="/staff/dashboard" 
          element={
            isStaffLoggedIn ? 
              <StaffDashboard onLogout={handleStaffLogout} /> : 
              <Navigate to="/staff/login" />
          } 
        />
        <Route 
          path="/staff/appointments" 
          element={
            isStaffLoggedIn ? 
              <AppointmentList onLogout={handleStaffLogout} /> : 
              <Navigate to="/staff/login" />
          } 
        />
        <Route 
          path="/staff/patients" 
          element={
            isStaffLoggedIn ? 
              <PatientList onLogout={handleStaffLogout} /> : 
              <Navigate to="/staff/login" />
          } 
        />
        <Route 
          path="/staff/appointments/:id" 
          element={
            isStaffLoggedIn ? 
              <AppointmentDetail onLogout={handleStaffLogout} /> : 
              <Navigate to="/staff/login" />
          } 
        />
        <Route 
          path="/staff/settings" 
          element={
            isStaffLoggedIn ? 
              <Settings onLogout={handleStaffLogout} /> : 
              <Navigate to="/staff/login" />
          } 
        />
        
        {/* Patient routes */}
        <Route path="/book" element={<BookingPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/my-appointments" element={<PatientAppointments />} />
      </Routes>
    </Router>
  );
}