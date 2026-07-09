import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Guards/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Vos Pages
import Login from './pages/Auth/Login';
import Overview from './pages/Dashboard/Overview';

// import AdminPanel from './pages/Admin/AdminPanel';
// import Unauthorized from './pages/Errors/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route Publique */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

          {/* Routes Protégées Générales (Tous les utilisateurs authentifiés) */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Overview />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Route Hautement Sécurisée : Uniquement SuperAdmin et Chef d'agence */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['SuperAdmin', "Chef d'agence"]}>
              <DashboardLayout>
                {/* <AdminPanel /> */}
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;