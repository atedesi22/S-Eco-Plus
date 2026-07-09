
import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
import axios from 'axios';
// Création du contexte d'authentification
const AuthContext = createContext(null);

// Liste des profils fictifs complets pour le développement S Eco Plus
const FAKE_USERS = {
  admin: { name: "Atedesi Paul", email: "paul@s-ecoplus.com", role: "SuperAdmin", agence: "Direction Générale" },
  chef_agence: { name: "Mme Eteki", email: "eteki@s-ecoplus.com", role: "Chef d'agence", agence: "Douala-Akwa" },
  chef_zone: { name: "Jean-Pierre T.", email: "jp.t@s-ecoplus.com", role: "Chef de zone", agence: "Littoral Zone A" },
  collectrice: { name: "Florence N.", email: "florence@s-ecoplus.com", role: "Collectrice", agence: "Kribi Centre" },
  commercial: { name: "Arthur M.", email: "arthur@s-ecoplus.com", role: "Commercial", agence: "Yaoundé-Messa" },
  comptable: { name: "Samuel D.", email: "samuel@s-ecoplus.com", role: "Comptable", agence: "Direction Générale" },
  secretaire: { name: "Carine O.", email: "carine@s-ecoplus.com", role: "Secrétaire", agence: "Douala-Akwa" },
  client: { name: "Emmanuel Bohole", phone: "690000000", role: "Client", agence: "Douala-Akwa", soldeEpargne: 250000 }
};

// // Configuration de l'URL de base de l'API (à adapter selon votre environnement)
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('seco_token'));
//   const [loading, setLoading] = useState(true);

// // PAR CECI (Pour le mode developpement hors-ligne) :
// // const [user, setUser] = useState({ name: "Atedesi Paul", role: "SuperAdmin" }); 
// // const [token, setToken] = useState("fake-development-jwt-token");
// // const [loading, setLoading] = useState(false); // Mettre à false pour sauter le chargement

//   // Configuration globale d'Axios pour intercepter les requêtes et injecter le JWT
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       localStorage.setItem('seco_token', token);
      
//       // Récupérer le profil complet de l'utilisateur rafraîchi (incluant son rôle RBAC)
//       fetchCurrentUser();
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//       localStorage.removeItem('seco_token');
//       setUser(null);
//       setLoading(false);
//     }
//   }, [token]);

//   // Fonction pour charger l'utilisateur connecté depuis l'API Laravel Passport
//   const fetchCurrentUser = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/user`);
//       // Le backend doit retourner un objet contenant au moins : { id, name, email, role }
//       setUser(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération de l'utilisateur:", error);
//       logout(); // Déconnexion automatique si le token est invalide ou expiré
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Action de Connexion (Login)
//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_URL}/login`, { email, password });
//       // L'API Laravel Passport doit renvoyer { access_token: "...", user: {...} }
//       const { access_token, user: userData } = response.data;
      
//       setToken(access_token);
//       setUser(userData);
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         message: error.response?.data?.message || "Identifiants invalides ou erreur serveur." 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Action de Déconnexion (Logout)
//   const logout = async () => {
//     try {
//       // Optionnel: Appeler le endpoint Laravel Passport pour révoquer le token
//       await axios.post(`${API_URL}/logout`);
//     } catch (e) {
//       console.warn("Le token était déjà expiré côté serveur ou inaccessible.");
//     } finally {
//       setToken(null);
//       setUser(null);
//       localStorage.removeItem('seco_token');
//       setLoading(false);
//     }
//   };

//   // Fonction utilitaire RBAC pour vérifier si l'utilisateur possède un rôle spécifique
//   // Accepte une chaîne ("SuperAdmin") ou un tableau de rôles (["SuperAdmin", "Comptable"])
//   const hasRole = (allowedRoles) => {
//     if (!user || !user.role) return false;
//     if (Array.isArray(allowedRoles)) {
//       return allowedRoles.includes(user.role);
//     }
//     return user.role === allowedRoles;
//   };

//   const value = {
//     user,
//     token,
//     loading,
//     login,
//     logout,
//     hasRole
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Hook personnalisé pour consommer facilement l'authentification dans les composants
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
//   }
//   return context;
// };



export const AuthProvider = ({ children }) => {
  // Par défaut, on initialise à null pour forcer le passage par le Login au démarrage
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('seco_token'));
  const [loading, setLoading] = useState(false);

  // Connexion simulée intelligente
  const login = async (identifier, password) => {
    setLoading(true);
    
    // Petite pause pour simuler un temps de latence réseau
    await new Promise(resolve => setTimeout(resolve, 600));

    // Détection grossière : si le champ contient '@', c'est un membre du personnel
    const isEmail = identifier.includes('@');
    let foundUser = null;

    if (isEmail) {
      // Simulation pour le personnel interne (recherche par mot-clé dans les emails fictifs)
      const key = identifier.split('@')[0]; // ex: 'paul' ou 'florence'
      if (key === 'paul' || key === 'admin') foundUser = FAKE_USERS.admin;
      else if (key === 'eteki') foundUser = FAKE_USERS.chef_agence;
      else if (key === 'florence') foundUser = FAKE_USERS.collectrice;
      else if (key === 'samuel') foundUser = FAKE_USERS.comptable;
      else foundUser = FAKE_USERS.commercial; // valeur par défaut pour les autres emails
    } else {
      // Simulation pour le client si c'est un numéro de téléphone
      foundUser = FAKE_USERS.client;
    }

    if (foundUser) {
      setUser(foundUser);
      setToken("fake-jwt-token-for-" + foundUser.role);
      localStorage.setItem('seco_token', "fake-jwt-token-for-" + foundUser.role);
      setLoading(false);
      return { success: true, role: foundUser.role };
    }

    setLoading(false);
    return { success: false, message: "Identifiant ou mot de passe incorrect." };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('seco_token');
  };

  const hasRole = (allowedRoles) => {
    if (!user || !user.role) return false;
    if (Array.isArray(allowedRoles)) return allowedRoles.includes(user.role);
    return user.role === allowedRoles;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole, FAKE_USERS, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);