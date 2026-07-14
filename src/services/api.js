import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Remplacez par l'URL de votre API Laravel
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


// Intercepteur pour injecter automatiquement le token Passport dans les requêtes
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('secoplus_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur : Déconnexion automatique du frontend en cas de token révoqué ou expiré (401)
API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('secoplus_token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }

(response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('secoplus_token');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;