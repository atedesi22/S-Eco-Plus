// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import ProtectedRoute from './components/Guards/ProtectedRoute';
// import DashboardLayout from './components/layout/DashboardLayout';

// // Vos Pages
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import Overview from './pages/Dashboard/Overview';
// import ClientDashboard from './pages/Client/ClientDashboard';

// // import AdminPanel from './pages/Admin/AdminPanel';
// // import Unauthorized from './pages/Errors/Unauthorized';

// // Composant d'aiguillage automatique pour la racine "/"
// const RootRedirect = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Si c'est un client, on l'envoie sur son espace dédié
//   if (user.role === 'Client') {
//     return <Navigate to="/espace-client" replace />;
//   }

//   // Sinon, le personnel interne va sur le tableau de bord global
//   return <Navigate to="/dashboard" replace />;
// };

// function AppContent() {
//   return (
//     <Router>
//       <Routes>
//         {/* Route Publique */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Aiguillage automatique à la racine */}
//         <Route path="/" element={<RootRedirect />} />

//         {/* 💼 ROUTES PERSONNEL INTERNE (Protégées par DashboardLayout + RBAC) */}
//         <Route 
//           path="/dashboard" 
//           element={
//             <ProtectedRoute allowedRoles={['SuperAdmin', "Chef d'agence", 'Chef de zone', 'Collectrice', 'Commercial', 'Comptable', 'Secrétaire']}>
//               <DashboardLayout>
//                 <Overview />
//               </DashboardLayout>
//             </ProtectedRoute>
//           } 
//         />

//         {/* Exemple de route restreinte pour la collecte de terrain */}
//         <Route 
//           path="/collectes" 
//           element={
//             <ProtectedRoute allowedRoles={['SuperAdmin', 'Collectrice', 'Comptable']}>
//               <DashboardLayout>
//                 <div className="p-6 sm:p-8 font-bold text-[#0F2942]">
//                   <h2 className="text-xl mb-2">Module Collecte de Terrain</h2>
//                   <p className="text-sm text-slate-500 font-normal">Interface de saisie et validation des fiches journalières.</p>
//                 </div>
//               </DashboardLayout>
//             </ProtectedRoute>
//           } 
//         />

//         {/* 📱 ROUTE DÉDIÉE UNIQUE CLIENT */}
//         <Route 
//           path="/espace-client" 
//           element={
//             <ProtectedRoute allowedRoles={['Client']}>
//               <DashboardLayout>
//                 <ClientDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           } 
//         />

//         {/* Page d'erreur d'autorisation standard */}
//         <Route 
//           path="/unauthorized" 
//           element={
//             <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC] font-sans px-4 text-center">
//               <h1 className="text-4xl font-black text-rose-600 mb-2">Accès Refusé</h1>
//               <p className="text-sm text-slate-600 max-w-sm">
//                 Votre profil actuel ne possède pas les autorisations nécessaires pour consulter cette section de l'agence.
//               </p>
//               <a href="/" className="mt-6 text-xs bg-[#0F2942] text-white font-bold py-2.5 px-6 rounded-xl shadow-md">
//                 Retourner à l'accueil
//               </a>
//             </div>
//           } 
//         />

//         {/* Redirection automatique pour les URL inconnues */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// // L'AuthProvider doit envelopper l'arbre pour que useAuth fonctionne dans AppContent
// function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Preloader from './components/common/Preloader';

// Importation des composants/pages (à adapter selon vos fichiers réels)
import Login from './pages/Auth/Login';
// import Unauthorized from './pages/Unauthorized';
import SuperAdminDashboard from './pages/Dashboard/SuperAdminDashboard';
// import AgencyDashboard from './pages/Dashboard/AgencyDashboard';
// import CollectriceDashboard from './pages/Dashboard/CollectriceDashboard';
// import CommercialDashboard from './pages/Dashboard/CommercialDashboard';

/**
 * Gardien de Route Évolué (RoleGuard)
 * Vérifie si l'utilisateur est connecté et possède le rôle requis.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Attendre la vérification du jeton au chargement de l'application
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté -> redirection vers la page de connexion
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si des rôles spécifiques sont requis, vérifier le rôle de l'utilisateur
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Simule la fin du preloader dès que l'app est prête (ex: 2.2s)
    const timer = setTimeout(() => setIsAppLoading(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <Preloader />;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 🔓 Routes Publiques */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

          {/* 🔐 Routes Sécurisées par Rôles (RBAC Strict) */}
          
          {/* Espace Super Admin */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['SuperAdmin']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Espace Chef d'agence & Chef de zone */}
          <Route 
            path="/agence/*" 
            element={
              <ProtectedRoute allowedRoles={['Chef d\'agence', 'Chef de zone']}>
                {/* <AgencyDashboard /> */}
              </ProtectedRoute>
            } 
          />

          {/* Espace Collecte de Terrain (Mobile-First) */}
          <Route 
            path="/collecte/*" 
            element={
              <ProtectedRoute allowedRoles={['Collectrice']}>
                {/* <CollectriceDashboard /> */}
              </ProtectedRoute>
            } 
          />

          {/* Espace Commercial */}
          <Route 
            path="/commercial/*" 
            element={
              <ProtectedRoute allowedRoles={['Commercial']}>
                {/* <CommercialDashboard /> */}
              </ProtectedRoute>
            } 
          />

          {/* 🔄 Redirection par défaut selon le rôle au niveau de la racine */}
          <Route 
            path="/" 
            element={<HomeRedirect />} 
          />

          {/* 404 - Redirection automatique */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

/**
 * Composant de redirection automatique à la racine '/' basée sur le rôle
 */
const HomeRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  // Redirection intelligente selon le rôle de l'utilisateur connecté
  switch (user.role) {
    case 'SuperAdmin':
      return <Navigate to="/admin" replace />;
    case 'Chef d\'agence':
    case 'Chef de zone':
      return <Navigate to="/agence" replace />;
    case 'Collectrice':
      return <Navigate to="/collecte" replace />;
    case 'Commercial':
      return <Navigate to="/commercial" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default App;