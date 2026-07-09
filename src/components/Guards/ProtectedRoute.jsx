import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, loading, hasRole } = useAuth();
  const location = useLocation();

  // Affichage d'un écran de chargement en attendant la réponse de Passport
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20A376]"></div>
      </div>
    );
  }

  // Redirection vers le login si aucun jeton n'est valide
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérification stricte des rôles autorisés (RBAC)
  if (allowedRoles && !hasRole(allowedRoles)) {
    // Redirection vers une page non autorisée ou la racine si l'utilisateur n'a pas les droits
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;