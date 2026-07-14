// import React, { createContext, useContext, useState, useEffect } from 'react';
// import API from '../services/api';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(localStorage.getItem('role'));

  
//   const [token, setToken] = useState();
//   const [loading, setLoading] = useState(true); // Commencer à true pour vérifier le token au chargement


//   useEffect(() => {

//     if (role === 'super_admin') {
//       setToken(localStorage.getItem('secoplus_admin_token'))
//     }
//   const checkLoggedUser = async () => {
//     // 🎯 On récupère le token physiquement sans dépendre du state React
//     const storedToken = localStorage.getItem('secoplus_token');
    
//     if (storedToken) {
//       try {
//         const response = await API.get('/profile');
//         const userData = response.data.data;
        
//         if (userData) {
//           const rawRole = userData.roles && userData.roles.length > 0 ? userData.roles[0] : 'client';
//           setUser({
//             ...userData,
//             role: rawRole,
//             name: `${userData.first_name} ${userData.last_name}`
//           });
//         }
//       } catch (error) {
//         console.error("Session expirée ou jeton invalide:", error);
//         // On nettoie localement sans relancer de boucle
//         localStorage.removeItem('secoplus_token');
//         setUser(null);
//       }
//     }
    
//     // On coupe le loader dans tous les cas
//     setLoading(false);
//   };

//   checkLoggedUser();
// }, []); // ➔ 🎯 Tableau vide ! Cette vérification ne s'exécute QU'UNE SEULE FOIS au démarrage.

//   /**
//    * Connexion réelle à l'API Laravel Passport
//    * @param {string} login (E-mail pour le personnel, Téléphone pour le client)
//    * @param {string} password
//    */
//   const login = async (identifier, password) => {
//   setLoading(true);
//   try {
//     const response = await API.post('/login', {
//       login: identifier,
//       password: password
//     });

//     console.log(response)

//     // 🎯 On va chercher dans response.data.data à cause de ton helper Laravel
//     const { access_token, user: rawUser } = response.data.data;

//     if (access_token && rawUser) {
//       const rawRole = rawUser.roles && rawUser.roles.length > 0 ? rawUser.roles[0] : 'client';
      
//       const userData = {
//         ...rawUser,
//         role: rawRole, // ex: 'super_admin' ou 'client'
//         name: `${rawUser.first_name} ${rawUser.last_name}` // Utile pour ton UI
//       };

//       setToken(access_token);
//       setUser(userData);
//       if (role === 'super_admin') {
//         localStorage.setItem('secoplus_admin_token', access_token);
//         localStorage.setItem('role', role)
//       } else if (role === 'dg_pdg') {
//         localStorage.setItem('secoplus_dg_pdg_token', access_token);
//       } else if (role === 'dom') {
//         localStorage.setItem('secoplus_dom_token', access_token);
//       } else if (role === 'daf') {
//         localStorage.setItem('secoplus_daf_token', access_token);
//       } else if (role === 'dr') {
//         localStorage.setItem('secoplus_dr_token', access_token);
//       } else if (role === 'da') {
//         localStorage.setItem('secoplus_da_token', access_token);
//       } else if (role === 'comptable') {
//         localStorage.setItem('secoplus_comptable_token', access_token);
//       } else if (role === 'secretaire') {
//         localStorage.setItem('secoplus_secretaire_token', access_token);
//       } else if (role === 'chef_commercial') {
//         localStorage.setItem('secoplus_chef_commercial_token', access_token);
//       } else if (role === 'collectrice') {
//         localStorage.setItem('secoplus_collectrice_token', access_token);
//       } else if (role === 'commercial') {
//         localStorage.setItem('secoplus_commercial_token', access_token);
//       } else if (role === 'client') {
//         localStorage.setItem('secoplus_client_token', access_token);
//       }
 
//       // localStorage.setItem('secoplus_token', access_token);
//       setLoading(false);
//       return { success: true, role: rawRole };
//     }
    
//     throw new Error("Structure de réponse API inattendue.");
//   } catch (error) {
//     setLoading(false);
//     // On récupère le message d'erreur du backend (ex: "Identifiants incorrects.")
//     const errorMessage = error.response?.data?.message || "Erreur de connexion.";
//     return { success: false, message: errorMessage };
//   }
// };

//   /**
//    * Déconnexion sécurisée : Nettoyage local et appel API de révocation si nécessaire
//    */
//   const logout = async () => {
//     try {
//       // Optionnel : Appel au backend pour révoquer le token OAuth2 dans Passport
//       await API.post('/logout');
//     } catch (e) {
//       // Échec silencieux si le token est déjà expiré côté serveur
//     } finally {
//       setUser(null);
//       setToken(null);
//       localStorage.removeItem('secoplus_token');
//     }
//   };

//   /**
//    * Vérificateur de droits RBAC (Garde de routes)
//    */
//   const hasRole = (allowedRoles) => {
//     if (!user || !user.role) return false;
//     if (Array.isArray(allowedRoles)) return allowedRoles.includes(user.role);
//     return user.role === allowedRoles;
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole, setUser, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// 🔄 Cycle initial : Vérifier si un token valide existe déjà pour restaurer l'utilisateur
  // useEffect(() => {
  //   const checkLoggedUser = async () => {
  //     if (token) {
  //       try {
  //         // Point de terminaison correspondant à ta fonction profile()
  //         const response = await API.get('/profile');
          
  //         // 🎯 Correction : Ton profil Laravel renvoie son contenu dans .data.data
  //         const userData = response.data.data;
          
  //         if (userData) {
  //           const rawRole = userData.roles && userData.roles.length > 0 ? userData.roles[0] : 'client';
  //           setUser({
  //             ...userData,
  //             role: rawRole,
  //             name: `${userData.first_name} ${userData.last_name}`
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Session expirée ou jeton invalide:", error);
  //         logout();
  //       }
  //     }
  //     setLoading(false);
  //   };

  //   checkLoggedUser();
  // }, [token]);


  import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

// 🎯 Dictionnaire de correspondance entre les rôles et leurs clés de stockage
const TOKEN_KEYS = {
  super_admin: 'secoplus_admin_token',
  dg_pdg: 'secoplus_dg_pdg_token',
  dom: 'secoplus_dom_token',
  daf: 'secoplus_daf_token',
  dr: 'secoplus_dr_token',
  da: 'secoplus_da_token',
  comptable: 'secoplus_comptable_token',
  secretaire: 'secoplus_secretaire_token',
  chef_commercial: 'secoplus_chef_commercial_token',
  collectrice: 'secoplus_collectrice_token',
  commercial: 'secoplus_commercial_token',
  client: 'secoplus_client_token',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction utilitaire pour récupérer le token actuellement stocké, quel que soit le rôle
  const getStoredToken = () => {
    const currentRole = localStorage.getItem('secoplus_role');
    if (currentRole && TOKEN_KEYS[currentRole]) {
      return localStorage.getItem(TOKEN_KEYS[currentRole]);
    }
    return null;
  };

  useEffect(() => {
    const checkLoggedUser = async () => {
      const storedToken = getStoredToken();
      
      if (storedToken) {
        try {
          // On injecte manuellement le token pour cet appel de vérification au démarrage
          const response = await API.get('/profile', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          
          const userData = response.data.data;
          
          if (userData) {
            const rawRole = userData.roles && userData.roles.length > 0 ? userData.roles[0] : 'client';
            
            setToken(storedToken);
            setUser({
              ...userData,
              role: rawRole,
              name: `${userData.first_name} ${userData.last_name}`
            });
          }
        } catch (error) {
          console.error("Session expirée ou jeton invalide:", error);
          logoutLocally();
        }
      }
      setLoading(false);
    };

    checkLoggedUser();
  }, []);

  /**
   * Connexion réelle à l'API Laravel Passport
   */
  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const response = await API.post('/login', {
        login: identifier,
        password: password
      });

      const { access_token, user: rawUser } = response.data.data;

      if (access_token && rawUser) {
        // Récupération du rôle réel retourné par l'API
        const rawRole = rawUser.roles && rawUser.roles.length > 0 ? rawUser.roles[0] : 'client';
        
        const userData = {
          ...rawUser,
          role: rawRole,
          name: `${rawUser.first_name} ${rawUser.last_name}`
        };

        // 1. Mise à jour des états React
        setToken(access_token);
        setUser(userData);

        // 2. Sauvegarde du rôle actuel pour savoir quel token chercher au rechargement
        localStorage.setItem('secoplus_role', rawRole);

        // 3. Sauvegarde dynamique du token selon le rôle grâce au dictionnaire TOKEN_KEYS
        const storageKey = TOKEN_KEYS[rawRole] || 'secoplus_client_token';
        localStorage.setItem(storageKey, access_token);

        setLoading(false);
        return { success: true, role: rawRole };
      }
      
      throw new Error("Structure de réponse API inattendue.");
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || "Erreur de connexion.";
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Nettoie les données d'authentification locales
   */
  // const logoutLocally = () => {
  //   setUser(null);
  //   setToken(null);
  //   // Supprime le rôle et tous les tokens possibles de S Eco Plus
  //   localStorage.removeItem('secoplus_role');
  //   Object.values(TOKEN_KEYS).forEach(key => localStorage.removeItem(key));
  // };

  /**
   * Déconnexion sécurisée : Nettoyage local et appel API de révocation
   */
 /**
   * 1. Nettoyage local complet du LocalStorage et des états React
   */
  const logoutLocally = () => {
    // Réinitialisation des états React pour couper l'accès aux routes
    setUser(null);
    setToken(null);

    // Supprime le rôle pivot utilisé pour l'aiguillage
    localStorage.removeItem('secoplus_role');

    // Nettoie dynamiquement TOUS les jetons spécifiques aux rôles définis dans TOKEN_KEYS
    Object.values(TOKEN_KEYS).forEach((storageKey) => {
      localStorage.removeItem(storageKey);
    });

    // Optionnel : un clear de secours ciblé si tu as d'anciennes clés globales
    localStorage.removeItem('secoplus_token');
    localStorage.removeItem('role');
  };

  /**
   * 2. Déconnexion globale (Révocation côté API + Nettoyage local)
   */
  const logout = async () => {
    setLoading(true);
    try {
      // On récupère le token de l'utilisateur actuellement connecté pour l'envoyer au backend
      const currentToken = getStoredToken() || token;

      if (currentToken) {
        // Appel au serveur Laravel Passport pour révoquer le token OAuth2 actif
        await API.post('/logout', {}, {
          headers: {
            Authorization: `Bearer ${currentToken}`
          }
        });
      }
    } catch (error) {
      // Échec silencieux (ex: si le token était déjà expiré côté serveur)
      console.warn("Échec de la révocation du token côté serveur lors du logout:", error);
    } finally {
      // Dans tous les cas (succès ou échec de l'API), on nettoie impérativement le navigateur
      logoutLocally();
      setLoading(false);
    }
  };

  /**
   * Vérificateur de droits RBAC (Garde de routes)
   */
  const hasRole = (allowedRoles) => {
    if (!user || !user.role) return false;
    if (Array.isArray(allowedRoles)) return allowedRoles.includes(user.role);
    return user.role === allowedRoles;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);