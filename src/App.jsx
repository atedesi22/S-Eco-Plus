
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';

// // Importation des composants communs et de navigation
// import Preloader from './components/common/Preloader';
// import Navbar from './components/layout/Navbar';     
// import Sidebar from './components/layout/Sidebar';   

// // Importation de tes pages
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import AdminDashboard from './pages/Dashboard/AdminDashboard';
// import ClientDashboard from './pages/Dashboard/ClientDashboard';

// /**
//  * Layout Global avec Gestion du Menu Mobile Connecté
//  */
// const DashboardLayout = ({ children }) => {
//   // Cet état gère l'ouverture/fermeture de la sidebar sur mobile
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      
//       {/* 1. Sidebar : Elle reçoit l'état et la fonction pour se fermer (ex: clic sur un lien ou overlay) */}
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       {/* Overlay sombre en arrière-plan sur mobile quand la sidebar est ouverte */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* 2. Contenu principal */}
//       <div className="flex flex-col flex-1 w-full overflow-y-auto">
//         {/* Navbar : Elle reçoit la fonction pour basculer (toggle) l'état au clic du burger */}
//         <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
//         <main className="p-6 content-fade">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// /**
//  * Gardien de Route (RBAC)
//  */
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading } = useAuth();

//   // if (loading) return null;
//   if (loading) return <div>Vérification des accès...</div>;

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // if (allowedRoles && !allowedRoles.includes(user.role)) {
//   //   return <Navigate to="/login" replace />;
//   // }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to={`/${user.role}/dashboard`} replace />;
//   }

//   return <DashboardLayout>{children}</DashboardLayout>;
// };

// function AppContent() {
//   const { user, loading } = useAuth();
//   const [isAppLoading, setIsAppLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsAppLoading(false), 4200);
//     return () => clearTimeout(timer);
//   }, []);

//   if (isAppLoading || loading) {
//     return <Preloader />;
//   }
// // 
//   return (
//     <Routes>
//       {/* <Route path="/login" element={<Login />} /> */}
//       <Route 
//         path="/" 
//         element={user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Login />} 
//       />
//       <Route path="/register" element={<Register />} />

//       <Route 
//         path="/admin" 
//         element={
//           <ProtectedRoute allowedRoles={['Admin', 'super_admin']}>
//             <AdminDashboard />
//           </ProtectedRoute>
//         } 
//       />

//       <Route 
//         path="/client" 
//         element={
//           <ProtectedRoute allowedRoles={['Client']}>
//             <ClientDashboard />
//           </ProtectedRoute>
//         } 
//       />

//       <Route path="/" element={<HomeRedirect />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// const HomeRedirect = () => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;

//   if (user.role === 'Admin' || user.role === 'super_admin') {
//     return <Navigate to="/admin" replace />;
//   }
  
//   if (user.role === 'Client') {
//     return <Navigate to="/client" replace />;
//   }

//   return <Navigate to="/login" replace />;
// };

// export default function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </Router>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';

// // Importation des composants communs et de navigation
// import Preloader from './components/common/Preloader';
// import Navbar from './components/layout/Navbar';     
// import Sidebar from './components/layout/Sidebar';   

// // Importation des pages
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import AdminDashboard from './pages/Dashboard/AdminDashboard';
// import ClientDashboard from './pages/Dashboard/ClientDashboard';

// /**
//  * Layout Global avec Gestion du Menu Mobile Connecté
//  */
// const DashboardLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden relative">
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <div className="flex flex-col flex-1 w-full overflow-y-auto">
//         <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
//         <main className="p-6 content-fade">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// /**
//  * Gardien de Route (RBAC) - Corrigé et sécurisé
//  */
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <div>Vérification des accès...</div>;

//   // Si pas connecté -> redirection login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Si connecté mais rôle non autorisé -> redirection vers sa propre zone valide
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     const fallbackPath = (user.role === 'Admin' || user.role === 'super_admin') ? '/admin' : '/client';
//     return <Navigate to={fallbackPath} replace />;
//   }

//   return <DashboardLayout>{children}</DashboardLayout>;
// };

// function AppContent() {
//   const { user, loading } = useAuth();
//   const [isAppLoading, setIsAppLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsAppLoading(false), 4200);
//     return () => clearTimeout(timer);
//   }, []);

//   if (isAppLoading || loading) {
//     return <Preloader />;
//   }

//   // Fonction utilitaire pour aiguiller la racine du site selon le rôle
//   const getHomeRedirectPath = () => {
//     if (!user) return '/login';
//     return (user.role === 'Admin' || user.role === 'super_admin') ? '/admin' : '/client';
//   };

//   return (
//     <Routes>
//       {/* Route Racine : Aiguillage automatique */}
//       <Route path="/" element={<Navigate to={getHomeRedirectPath()} replace />} />
      
//       {/* Authentification */}
//       <Route path="/login" element={!user ? <Login /> : <Navigate to={getHomeRedirectPath()} replace />} />
//       <Route path="/register" element={!user ? <Register /> : <Navigate to={getHomeRedirectPath()} replace />} />

//       {/* Zone Administrative Protégée */}
//       <Route 
//         path="/admin" 
//         element={
//           <ProtectedRoute allowedRoles={['Admin', 'super_admin']}>
//             <AdminDashboard />
//           </ProtectedRoute>
//         } 
//       />

//       {/* Zone Client Protégée */}
//       <Route 
//         path="/client" 
//         element={
//           <ProtectedRoute allowedRoles={['Client']}>
//             <ClientDashboard />
//           </ProtectedRoute>
//         } 
//       />

//       {/* Attrape-tout : Sécurise les fausses URLs vers la racine */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </Router>
//   );
// }


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Importation des composants communs et de navigation
import Preloader from './components/common/Preloader';
import Navbar from './components/layout/Navbar';     
import Sidebar from './components/layout/Sidebar';   

// Importation des pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import CollectesPage from './pages/Collectrice/CollectriceDashboard.jsx';
// import CollecteTerrain from './pages/Dashboard/CollectriceDashboard.jsx';

/**
 * Layout Global avec Gestion du Menu Mobile Connecté
 */
const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 content-fade">
          {children}
        </main>
      </div>
    </div>
  );
};

/**
 * Gardien de Route (RBAC) - Synchronisé avec les rôles Backend de S Eco Plus
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
      </div>
    );
  }

  // Si pas connecté -> redirection login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si connecté mais rôle non autorisé -> redirection vers son espace légitime
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const adminRoles = ['super_admin', 'dg_pdg', 'dom', 'daf', 'dr', 'da', 'comptable', 'secretaire'];
    
    let fallbackPath = '/client';
    if (adminRoles.includes(user.role)) {
      fallbackPath = '/admin';
    } else if (user.role === 'collectrice') {
      fallbackPath = '/collectrice'; // Si tu as un dashboard spécifique collectrice
    }

    return <Preloader><Navigate to={fallbackPath} replace />;</Preloader>
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

function AppContent() {
  const { user, loading } = useAuth();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Timer d'initialisation du Preloader d'accueil
    const timer = setTimeout(() => setIsAppLoading(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading || loading) {
    return <Preloader />;
  }

  // Fonction utilitaire pour aiguiller selon le rôle exact de la BDD (snake_case)
  const getHomeRedirectPath = () => {
    if (!user) return '/login';
    
    const adminRoles = ['super_admin', 'dg_pdg', 'dom', 'daf', 'dr', 'da', 'comptable', 'secretaire'];
    if (adminRoles.includes(user.role)) {
      return '/admin';
    }
    
    // Rôles terrain (optionnel, pour plus tard si tu crées leurs routes)
    if (user.role === 'collectrice') return '/collectrice'; // Redirection temporaire vers client ou son dashboard
    if (user.role === 'commercial') return '/commercial';

    return '/client';
  };

  return (
    <Routes>
      {/* Route Racine : Aiguillage automatique immédiat */}
      <Route path="/" element={<Navigate to={getHomeRedirectPath()} replace />} />
      
      {/* Authentification publique (Redirige vers son dashboard si déjà connecté) */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to={getHomeRedirectPath()} replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to={getHomeRedirectPath()} replace />} />

      {/* Zone Administrative Protégée */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['super_admin', 'dg_pdg', 'dom', 'daf', 'dr', 'da', 'comptable', 'secretaire']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Zone Client Protégée */}
      <Route 
        path="/client" 
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Zone Collectrice Protégée */}
      <Route 
        path="/collectrice" 
        element={
          <ProtectedRoute allowedRoles={['collectrice', 'commercial']}>
            <CollectesPage />
          </ProtectedRoute>
        } 
      />

      {/* Attrape-tout : Sécurise les mauvaises URLs vers la racine d'aiguillage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}