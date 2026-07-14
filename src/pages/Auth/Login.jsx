import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Smartphone, Mail, Lock, ShieldCheck } from 'lucide-react';

const Login = () => {
  const { login, setUser, setToken } = useAuth();
  const navigate = useNavigate();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Détection dynamique du type d'identifiant entré par l'utilisateur
  const isEmail = identifier.includes('@');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Appel de la fonction de ton AuthContext
    const result = await login(identifier, password);
    console.log(result);
   

    // if (result.success) {
    //   // 🎯 C'est ICI qu'on oriente l'utilisateur selon son rôle !
    //   switch (result.role) {
    //     case 'super_admin':
    //       // navigate('/admin/dashboard');
    //       break;
    //     case 'chef_agence':
    //       // navigate('/agence/dashboard');
    //       break;
    //     case 'chef_zone':
    //       // navigate('/zone/dashboard');
    //       break;
    //     case 'collectrice':
    //       // navigate('/collectrice/dashboard');
    //       break;
    //     case 'client':
    //       // navigate('/client/dashboard');
    //       break;
    //     default:
    //       // navigate('/dashboard'); // Route de secours par défaut
    //       break;
    //   }
    // } else {
    //   // Affiche le message d'erreur renvoyé par le backend Laravel
    //    console.log('erreur de de role d\'acces');
    //   setError(result.message);
    // }

    if (result.success) {
    // 🎯 C'est ici qu'on oriente dynamiquement l'utilisateur !
    const role = result.role;

    if (role === 'super_admin' || role === 'dg_pdg' || role === 'dom' || role === 'daf') {
      navigate('/admin/dashboard'); // Espace administration / décisionnel
    } else if (role === 'collectrice') {
      navigate('/collectrice/dashboard'); // Espace terrain collectrice
    } else if (role === 'commercial') {
      navigate('/commercial/dashboard'); // Espace terrain commercial
    } else {
      navigate('/client'); // Espace Client standard par défaut
    }
  } else {
    // Afficher l'erreur (ex: result.message)
    setError(result.message);
  }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsSubmitting(true);

  //   try {
  //     const result = await login(identifier, password);
      
  //     if (result.success) {
  //       navigate('/'); 
  //     } else {
  //       setError(result.message); // Affiche le message propre renvoyé par Laravel ou l'intercepteur
  //     }
  //   } catch (err) {
  //     setError("Impossible de joindre le serveur d'authentification.");
  //   } finally {
  //     setIsSubmitting(false); // 🎯 Libérer le bouton quoi qu'il arrive
  //   }
  // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const result = await login(identifier, password);
  
//   if (result.success) {
//     // Les redirections automatiques de App.jsx s'occuperont du reste grâce au changement d'état !
//     navigate('/'); 
//   } else {
//     setError(result.message); // Affiche l'erreur renvoyée par Laravel
//   }
// };

  // Raccourci de développement pour forcer instantanément un rôle
  const handleQuickConnect = (profileKey) => {
    const selected = FAKE_USERS[profileKey];
    setUser(selected);
    setToken("fake-jwt-" + selected.role);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] font-sans">
      
      {/* SECTION GAUCHE : IDENTITÉ VISUELLE */}
      <div className="hidden md:flex md:w-1/2 bg-[#0F2942] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#20A376] opacity-10 rounded-full blur-2xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4BE2C] opacity-10 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>

        <div className="flex items-center gap-2 z-10">
          <span className="text-2xl font-black tracking-wider text-[#F4BE2C]">S ECO PLUS</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#20A376] text-white font-medium">Microfinance</span>
        </div>

        <div className="z-10 max-w-md">
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            La microfinance de proximité, digitalisée.
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Espace unifié pour la gestion des collectes de terrain, le suivi rigoureux des tontines et l'instruction des micro-crédits.
          </p>
          
          {/* BOUTONS DE SIMULATION DE SPRINT (À retirer en production) */}
          {/* <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700/60 rounded-xl backdrop-blur-sm">
            <p className="text-xs font-bold text-[#F4BE2C] mb-2 uppercase tracking-wider">Simulateur de rôles (Sprint Actif) :</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(FAKE_USERS).map((key) => (
                <button 
                  key={key}
                  type="button"
                  onClick={() => handleQuickConnect(key)}
                  className="text-[10px] bg-slate-700 hover:bg-[#20A376] hover:text-[#0F2942] px-2 py-1 rounded font-medium transition-colors"
                >
                  {FAKE_USERS[key].role}
                </button>
              ))}
            </div>
          </div> */}
        </div>

        <div className="text-xs text-slate-400 z-10">
          &copy; {new Date().getFullYear()} S Eco Plus. Tous droits réservés.
        </div>
      </div>

      {/* SECTION DROITE : FORMULAIRE INTELLIGENT */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center md:text-left">
            <div className="flex md:hidden justify-center items-center gap-2 mb-4">
              <span className="text-2xl font-black text-[#0F2942]">S ECO PLUS</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#20A376] text-white font-medium">Finance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2942] tracking-tight">
              Espace de Connexion
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Membres du personnel (Email) &bull; Clients (N° de téléphone)
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleFormSubmit}>
            
            {/* CHAMP HYBRIDE UNIQUE */}
            <div>
              <label 
                htmlFor="login"
               className="block text-sm font-semibold text-[#1E293B] mb-1.5">
                Identifiant de connexion
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  {identifier === '' ? <LogIn size={18} /> : isEmail ? <Mail size={18} /> : <Smartphone size={18} />}
                </div>
                <input
                  type="text"
                  autoComplete="username"
                  required
                  value={identifier}
                  id="login"         // 🔥 Résout le problème 2 (Lien avec le label via htmlFor) 
                  name="login"        // 🔥 Résout le problème 1 (Permet l'autofill)
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20A376] focus:bg-white transition-all text-sm"
                  placeholder="Email (@s-ecoplus.com) ou N° de téléphone"
                />
              </div>
              {identifier !== '' && (
                <p className="text-[11px] mt-1 text-slate-400 font-medium">
                  Type détecté : <span className="font-bold text-[#0F2942]">{isEmail ? "Personnel Interne" : "Compte Client"}</span>
                </p>
              )}
            </div>

            {/* MOT DE PASSE */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-[#1E293B]">
                  Mot de passe
                </label>
                <a href="#" className="text-xs font-semibold text-[#20A376] hover:underline">
                  Oublié ?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  id="password"     /* 🔥 Résout le problème 2 */
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20A376] focus:bg-white transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* BOUTON PRINCIPAL */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#20A376] hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? "Vérification..." : "Se connecter de façon sécurisée"}
            </button>

            {/* BARRE DE SÉPARATION GRAPHIQUE */}
            <div className="relative my-6 flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ou</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* ACCÈS CO-BRANDÉ OBLIGATOIRE NOVAVERSE */}
            <button
              type="button"
              className="w-full py-3 px-4 border-2 border-slate-200 hover:border-[#0F2942] text-[#0F2942] font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100"
            >
              <ShieldCheck size={18} className="text-blue-600" />
              Se connecter avec NovaVerse
            </button>

          </form>

        </div>
      </div>

    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { LogIn, Smartphone, Mail, Lock, ShieldCheck } from 'lucide-react';

// const Login = () => {
//   const { login } = useAuth(); // Plus besoin de setUser et setToken directement ici
//   const navigate = useNavigate();
  
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // Gestion de l'état de soumission

//   // Détection dynamique du type d'identifiant entré par l'utilisateur
//   const isEmail = identifier.includes('@');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');          // Enlever l'ancienne erreur dès qu'on re-clique
//     setIsSubmitting(true); // 🎯 Bloquer le bouton pendant la requête
    
//     try {
//       const result = await login(identifier, password);
      
//       if (result.success) {
//         navigate('/'); 
//       } else {
//         setError(result.message); // Affiche le message propre renvoyé par Laravel ou l'intercepteur
//       }
//     } catch (err) {
//       setError("Impossible de joindre le serveur d'authentification.");
//     } finally {
//       setIsSubmitting(false); // 🎯 Libérer le bouton quoi qu'il arrive
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] font-sans">
      
//       {/* SECTION GAUCHE : IDENTITÉ VISUELLE */}
//       <div className="hidden md:flex md:w-1/2 bg-[#0F2942] p-12 flex-col justify-between text-white relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-[#20A376] opacity-10 rounded-full blur-2xl transform translate-x-20 -translate-y-20"></div>
//         <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4BE2C] opacity-10 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>

//         <div className="flex items-center gap-2 z-10">
//           <span className="text-2xl font-black tracking-wider text-[#F4BE2C]">S ECO PLUS</span>
//           <span className="text-xs px-2 py-0.5 rounded bg-[#20A376] text-white font-medium">Microfinance</span>
//         </div>

//         <div className="z-10 max-w-md">
//           <h1 className="text-4xl font-extrabold leading-tight mb-4">
//             La microfinance de proximité, digitalisée.
//           </h1>
//           <p className="text-slate-300 text-sm leading-relaxed">
//             Espace unifié pour la gestion des collectes de terrain, le suivi rigoureux des tontines et l'instruction des micro-crédits.
//           </p>
//         </div>

//         <div className="text-xs text-slate-400 z-10">
//           &copy; {new Date().getFullYear()} S Eco Plus. Tous droits réservés.
//         </div>
//       </div>

//       {/* SECTION DROITE : FORMULAIRE */}
//       <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
//         <div className="w-full max-w-md space-y-8">
          
//           <div className="text-center md:text-left">
//             <div className="flex md:hidden justify-center items-center gap-2 mb-4">
//               <span className="text-2xl font-black text-[#0F2942]">S ECO PLUS</span>
//               <span className="text-xs px-2 py-0.5 rounded bg-[#20A376] text-white font-medium">Finance</span>
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2942] tracking-tight">
//               Espace de Connexion
//             </h2>
//             <p className="mt-2 text-sm text-slate-500">
//               Membres du personnel (Email) &bull; Clients (N° de téléphone)
//             </p>
//           </div>

//           {error && (
//             <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium">
//               {error}
//             </div>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>
            
//             {/* CHAMP HYBRIDE UNIQUE */}
//             <div>
//               <label 
//                 htmlFor="login"
//                 className="block text-sm font-semibold text-[#1E293B] mb-1.5">
//                 Identifiant de connexion
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
//                   {identifier === '' ? <LogIn size={18} /> : isEmail ? <Mail size={18} /> : <Smartphone size={18} />}
//                 </div>
//                 <input
//                   type="text"
//                   autoComplete="username"
//                   required
//                   value={identifier}
//                   id="login"
//                   name="login"
//                   onChange={(e) => setIdentifier(e.target.value)}
//                   className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20A376] focus:bg-white transition-all text-sm"
//                   placeholder="Email (@s-ecoplus.com) ou N° de téléphone"
//                 />
//               </div>
//               {identifier !== '' && (
//                 <p className="text-[11px] mt-1 text-slate-400 font-medium">
//                   Type détecté : <span className="font-bold text-[#0F2942]">{isEmail ? "Personnel Interne" : "Compte Client"}</span>
//                 </p>
//               )}
//             </div>

//             {/* MOT DE PASSE */}
//             <div>
//               <div className="flex justify-between items-center mb-1.5">
//                 {/* 🎯 Ajout du htmlFor pour correspondre au standard d'accessibilité */}
//                 <label htmlFor="password" className="block text-sm font-semibold text-[#1E293B]">
//                   Mot de passe
//                 </label>
//                 <a href="#" className="text-xs font-semibold text-[#20A376] hover:underline">
//                   Oublié ?
//                 </a>
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
//                   <Lock size={18} />
//                 </div>
//                 <input
//                   type="password"
//                   required
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20A376] focus:bg-white transition-all text-sm"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             {/* BOUTON PRINCIPAL */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-3 px-4 bg-[#20A376] hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? "Vérification en cours..." : "Se connecter de façon sécurisée"}
//             </button>

//             {/* BARRE DE SÉPARATION GRAPHIQUE */}
//             <div className="relative my-6 flex py-2 items-center">
//               <div className="flex-grow border-t border-slate-200"></div>
//               <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ou</span>
//               <div className="flex-grow border-t border-slate-200"></div>
//             </div>

//             {/* ACCÈS CO-BRANDÉ OBLIGATOIRE NOVAVERSE */}
//             <button
//               type="button"
//               className="w-full py-3 px-4 border-2 border-slate-200 hover:border-[#0F2942] text-[#0F2942] font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100"
//             >
//               <ShieldCheck size={18} className="text-blue-600" />
//               Se connecter avec NovaVerse
//             </button>

//           </form>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default Login;