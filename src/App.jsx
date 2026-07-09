import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
import Overview from './pages/Dashboard/Overview';
import DashboardLayout from './components/layout/DashboardLayout';
// import DashboardLayout from './components/Layout/DashboardLayout';

// Un composant de garde temporaire pour simuler le blocage par rôle (RBAC)
// Il sera interconnecté avec AuthContext très bientôt
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Simulation d'un utilisateur connecté (à remplacer par la logique API plus tard)
  const user = {
    isAuthenticated: true,
    role: 'Commercial' // Changez ici pour tester ('SuperAdmin', 'Collectrice', etc.)
  };

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes Publiques */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Routes Protégées - Accessibles par tous les employés connectés */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Overview />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* Exemple de Route Restreinte (Seulement SuperAdmin et Comptable par exemple) */}
        <Route 
          path="/admin-settings" 
          element={
            <ProtectedRoute allowedRoles={['SuperAdmin', 'Comptable']}>
              <div className="p-8 font-bold text-[#0F2942]">Espace Administration Strict</div>
            </ProtectedRoute>
          } 
        />

        {/* Route d'erreur d'autorisation */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
              <h1 className="text-4xl font-bold text-red-600 mb-2">Accès Refusé</h1>
              <p className="text-[#1E293B]">Vous n'avez pas les permissions nécessaires pour voir cette page.</p>
            </div>
          } 
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;