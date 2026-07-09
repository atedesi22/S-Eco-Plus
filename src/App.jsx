import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/Guards/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Vos Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Overview from './pages/Dashboard/Overview';
import ClientDashboard from './pages/Client/ClientDashboard';

// import AdminPanel from './pages/Admin/AdminPanel';
// import Unauthorized from './pages/Errors/Unauthorized';

// Composant d'aiguillage automatique pour la racine "/"
const RootRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si c'est un client, on l'envoie sur son espace dédié
  if (user.role === 'Client') {
    return <Navigate to="/espace-client" replace />;
  }

  // Sinon, le personnel interne va sur le tableau de bord global
  return <Navigate to="/dashboard" replace />;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Route Publique */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Aiguillage automatique à la racine */}
        <Route path="/" element={<RootRedirect />} />

        {/* 💼 ROUTES PERSONNEL INTERNE (Protégées par DashboardLayout + RBAC) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['SuperAdmin', "Chef d'agence", 'Chef de zone', 'Collectrice', 'Commercial', 'Comptable', 'Secrétaire']}>
              <DashboardLayout>
                <Overview />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* Exemple de route restreinte pour la collecte de terrain */}
        <Route 
          path="/collectes" 
          element={
            <ProtectedRoute allowedRoles={['SuperAdmin', 'Collectrice', 'Comptable']}>
              <DashboardLayout>
                <div className="p-6 sm:p-8 font-bold text-[#0F2942]">
                  <h2 className="text-xl mb-2">Module Collecte de Terrain</h2>
                  <p className="text-sm text-slate-500 font-normal">Interface de saisie et validation des fiches journalières.</p>
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* 📱 ROUTE DÉDIÉE UNIQUE CLIENT */}
        <Route 
          path="/espace-client" 
          element={
            <ProtectedRoute allowedRoles={['Client']}>
              <DashboardLayout>
                <ClientDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* Page d'erreur d'autorisation standard */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC] font-sans px-4 text-center">
              <h1 className="text-4xl font-black text-rose-600 mb-2">Accès Refusé</h1>
              <p className="text-sm text-slate-600 max-w-sm">
                Votre profil actuel ne possède pas les autorisations nécessaires pour consulter cette section de l'agence.
              </p>
              <a href="/" className="mt-6 text-xs bg-[#0F2942] text-white font-bold py-2.5 px-6 rounded-xl shadow-md">
                Retourner à l'accueil
              </a>
            </div>
          } 
        />

        {/* Redirection automatique pour les URL inconnues */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// L'AuthProvider doit envelopper l'arbre pour que useAuth fonctionne dans AppContent
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;