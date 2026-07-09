import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Importation des composants communs et de navigation
import Preloader from './components/common/Preloader';
import Navbar from './components/layout/Navbar';     // Ta Navbar
import Sidebar from './components/layout/Sidebar';   // Ta Sidebar

// Importation de tes pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ClientDashboard from './pages/Dashboard/ClientDashboard';

/**
 * Composant de Layout Global pour l'espace connecté
 * Il structure la Sidebar à gauche, la Navbar en haut et le contenu à droite
 */
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 1. Barre latérale fixe ou rétractable */}
      <Sidebar />

      {/* 2. Contenu principal (Navbar + Pages) */}
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <Navbar />
        <main className="p-6 content-fade">
          {children}
        </main>
      </div>
    </div>
  );
};

/**
 * Gardien de Route (RBAC) réaligné
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // Si tout est OK, on affiche la page enveloppée dans notre superbe Layout
  return <DashboardLayout>{children}</DashboardLayout>;
};

function AppContent() {
  const { loading } = useAuth();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading || loading) {
    return <Preloader />;
  }

  return (
    <Routes>
      {/* 🔓 Routes Publiques (Pas de Navbar/Sidebar ici) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔐 Espace Administration avec Layout complet */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['Admin', 'SuperAdmin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* 🔐 Espace Client avec Layout complet */}
      <Route 
        path="/client" 
        element={
          <ProtectedRoute allowedRoles={['Client']}>
            <ClientDashboard />
          </ProtectedRoute>
        } 
      />

      {/* 🔄 Redirection automatique à la racine '/' selon le rôle */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Capture des routes inexistantes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/**
 * Redirection intelligente à l'accueil selon le rôle exact dans ta DB
 */
const HomeRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'Admin' || user.role === 'SuperAdmin') {
    return <Navigate to="/admin" replace />;
  }
  
  if (user.role === 'Client') {
    return <Navigate to="/client" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}