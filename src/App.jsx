
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Importation des composants communs et de navigation
import Preloader from './components/common/Preloader';
import Navbar from './components/layout/Navbar';     
import Sidebar from './components/layout/Sidebar';   

// Importation de tes pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ClientDashboard from './pages/Dashboard/ClientDashboard';

/**
 * Layout Global avec Gestion du Menu Mobile Connecté
 */
const DashboardLayout = ({ children }) => {
  // Cet état gère l'ouverture/fermeture de la sidebar sur mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      
      {/* 1. Sidebar : Elle reçoit l'état et la fonction pour se fermer (ex: clic sur un lien ou overlay) */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Overlay sombre en arrière-plan sur mobile quand la sidebar est ouverte */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Contenu principal */}
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        {/* Navbar : Elle reçoit la fonction pour basculer (toggle) l'état au clic du burger */}
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6 content-fade">
          {children}
        </main>
      </div>
    </div>
  );
};

/**
 * Gardien de Route (RBAC)
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

  return <DashboardLayout>{children}</DashboardLayout>;
};

function AppContent() {
  const { loading } = useAuth();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading ) {
    return <Preloader />;
  }
// || loading
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['Admin', 'SuperAdmin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/client" 
        element={
          <ProtectedRoute allowedRoles={['Client']}>
            <ClientDashboard />
          </ProtectedRoute>
        } 
      />

      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

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