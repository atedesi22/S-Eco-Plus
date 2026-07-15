// import React, { useEffect, useRef, useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { Menu, Bell, User, LogOut, RefreshCcw, WifiOff, Sparkles } from 'lucide-react';

// const Navbar = ({ onMenuToggle, onSwitchRole, isSalarieMode, isOnline, offlineQueueLength }) => {
//   const { user, logout } = useAuth();

//   // Sécurité si aucun utilisateur n'est connecté au rendu initial
//   if (!user) return null;

//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);

//   // Fermer le menu si on clique en dehors (très important pour le mobile)
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const isClient = user.role === 'client';

//   return (
//     <header className="h-20 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm/50">
      
//       <div className="flex items-center gap-4">
//         {/* Le bouton menu hamburger est masqué pour les clients puisqu'ils n'ont pas de sidebar admin */}
//         {!isClient && (
//           <button 
//             onClick={onMenuToggle}
//             className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 lg:hidden transition-colors"
//           >
//             <Menu size={22} />
//           </button>
//         )}
        
//         <div className="text-xs text-slate-400 font-medium">
//           Agence : <span className="text-[#0F2942] font-bold">{user.agence || "Non assignée"}</span>
//         </div>
        
//       </div>

//       <div className="flex items-center gap-4">
        
//         <button className="p-2 rounded-xl text-slate-400 hover:text-[#0F2942] hover:bg-slate-50 relative transition-colors">
//           <Bell size={20} />
//           <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
//         </button>

//         <div className="w-px h-6 bg-slate-200" />

//         {/* BLOC PROFIL ET RÔLE */}
//         <div className="flex items-center gap-3">
//           <div className="hidden sm:block text-right">
//             <p className="text-sm font-bold text-slate-800">{user.name}</p>
//             <p className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
//               isClient ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-[#20A376]'
//             }`}>
//               {user.role}
//             </p>
//           </div>

//           <div 
//             ref={menuRef}
//             className="relative inline-block group"
//             // Survol pour PC (Hover)
//             onMouseEnter={() => setIsOpen(true)}
//             onMouseLeave={() => setIsOpen(false)}
//           >
//             {/* Déclencheur (Le bouton avec l'icône User) */}
//             <button
//               onClick={() => setIsOpen(!isOpen)} // Clic pour Mobile/Tablette
//               className="w-10 h-10 rounded-xl bg-slate-100 flex flex-wrap items-center gap-1 justify-center text-slate-600 font-bold border border-slate-200 hover:bg-slate-200 transition-colors focus:outline-none"
//             >
//               <User size={18} />
//             </button>

//             {/* Contenu du Toggle (Le Menu Déroulant) */}
//             <div
//               className={`absolute right-0 mt-2 p-3 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-2 z-50 min-w-[200px] transition-all duration-200 origin-top-right ${
//                 isOpen 
//                   ? 'opacity-100 scale-100 pointer-events-auto visible' 
//                   : 'opacity-0 scale-95 pointer-events-none invisible lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:group-hover:pointer-events-auto lg:group-hover:visible'
//               }`}
//             >
//               {/* Switch Double Casquette */}
//               <button
//                 onClick={() => {
//                   onSwitchRole();
//                   setIsOpen(false); // Optionnel : ferme le menu après action
//                 }}
//                 className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 text-[#0F2942] hover:bg-slate-50 transition active:scale-95 w-full justify-start"
//               >
//                 <Sparkles size={14} className="text-[#F4BE2C]" />
//                 Bascule {isSalarieMode ? user.role : 'Salarié'}
//               </button>

//               {/* Indicateur Réseau */}
//               <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold w-full justify-start ${
//                 isOnline 
//                   ? 'bg-[#20A376]/10 text-[#20A376]' 
//                   : 'bg-rose-50 text-rose-600 border border-rose-100'
//               }`}>
//           {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
//           {isOnline ? 'En ligne' : 'Hors-ligne'}
//         </div>

//         {/* Bouton de Synchro si Queue Hors-ligne */}
//         {offlineQueueLength > 0 && (
//           <button
//             onClick={() => {
//               onSync();
//               setIsOpen(false);
//             }}
//             disabled={!isOnline}
//             className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition active:scale-95 w-full justify-start ${
//               isOnline ? 'bg-[#20A376] hover:bg-[#1b8c65] shadow-md' : 'bg-slate-300 cursor-not-allowed'
//             }`}
//           >
//             <RefreshCcw size={14} className={isOnline ? 'animate-spin' : ''} />
//             Synchro ({offlineQueueLength})
//           </button>
//         )}
//       </div>
//     </div>

//           {/* Raccourci déconnexion rapide pour les clients directement dans la Navbar */}
//           {isClient && (
//             <button 
//               onClick={logout}
//               title="Déconnexion"
//               className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
//             >
//               <LogOut size={18} />
//             </button>
//           )}
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Navbar;



import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, LogOut, RefreshCcw, WifiOff, Sparkles, Wifi, UserCheck, Shield } from 'lucide-react';

const Navbar = ({ onMenuToggle, onSwitchRole, isSalarieMode, isOnline, offlineQueueLength, onSync }) => {
  const { user, logout } = useAuth();

  // Sécurité si aucun utilisateur n'est connecté au rendu initial
  if (!user) return null;

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isClient = user.role === 'client';

  // Génération des initiales pour le nouvel avatar stylisé
  const getInitials = () => {
    if (user.first_name || user.last_name) {
      return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
    }
    return user.name ? user.name.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm/50">
      
      <div className="flex items-center gap-4">
        {/* Bouton menu hamburger (masqué pour les clients) */}
        {!isClient && (
          <button 
            onClick={onMenuToggle}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 lg:hidden transition-colors"
          >
            <Menu size={22} />
          </button>
        )}
        
        <div className="text-xs text-slate-400 font-medium">
          Agence : <span className="text-[#0F2942] font-bold">{user.agence || "Non assignée"}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <button className="p-2 rounded-xl text-slate-400 hover:text-[#0F2942] hover:bg-slate-50 relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>

        <div className="w-px h-6 bg-slate-200" />

        

        {/* BLOC PROFIL ET MENU DÉROULANT */}
        <div className="flex items-center gap-3" ref={menuRef}>
          
          {/* Infos utilisateur style "HeaderSession" */}
          <div className="hidden sm:block text-right">
            <h2 className="font-bold text-[#1E293B] text-sm leading-tight">
              {user.first_name || user.name} {user.last_name || ''}
            </h2>
            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 justify-end mt-0.5">
              <UserCheck size={10} className="text-[#20A376]" />
              Mode : <span className="font-semibold text-[#0F2942]">{isSalarieMode ? 'Salarié' : user.role || 'Utilisateur'}</span>
            </p>
          </div>

          <div 
            className="relative inline-block group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Nouvel Avatar Stylisé avec initiales servant de déclencheur */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 rounded-xl bg-[#0F2942] text-white flex items-center justify-center font-bold text-sm border-2 border-[#20A376] hover:brightness-110 transition-all focus:outline-none"
            >
              {getInitials()}
            </button>

            {/* Menu Déroulant */}
            <div
              className={`absolute right-0 mt-2 p-3 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-2 z-50 min-w-[220px] transition-all duration-200 origin-top-right ${
                isOpen 
                  ? 'opacity-100 scale-100 pointer-events-auto visible' 
                  : 'opacity-0 scale-95 pointer-events-none invisible lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:group-hover:pointer-events-auto lg:group-hover:visible'
              }`}
            >
              {/* Infos en mobile dans le menu déroulant */}
              <div className="block sm:hidden border-b border-slate-100 pb-2 mb-1">
                <p className="text-xs font-bold text-slate-800">{user.first_name || user.name} {user.last_name || ''}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">
                  Mode : {isSalarieMode ? 'Salarié' : user.role}
                </p>
              </div>

              {/* Bouton de Connexion NovaVerse */}
              

              {/* Switch Double Casquette */}
              

              {/* Indicateur Réseau (doublé pour mobile à l'intérieur du menu) */}
              <div className={`flex md:hidden items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold w-full justify-start ${
                isOnline 
                  ? 'bg-[#20A376]/10 text-[#20A376]' 
                  : 'bg-rose-50 text-rose-600 border border-rose-100'
              }`}>
                {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
                {isOnline ? 'En ligne' : 'Hors-ligne'}
              </div>

              {/* Bouton de Synchro si Queue Hors-ligne */}
              {offlineQueueLength > 0 && (
                <button
                  onClick={() => {
                    onSync();
                    setIsOpen(false);
                  }}
                  disabled={!isOnline}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition active:scale-95 w-full justify-start ${
                    isOnline ? 'bg-[#20A376] hover:bg-[#1b8c65] shadow-md' : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <RefreshCcw size={14} className={isOnline ? 'animate-spin' : ''} />
                  Synchro ({offlineQueueLength})
                </button>
              )}

              {/* Séparateur avant déconnexion */}
              <div className="h-px bg-slate-100 my-1" />

              {/* Déconnexion dans le menu pour tous */}
              <button 
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition active:scale-95 w-full justify-start"
              >
                <LogOut size={14} />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Raccourci déconnexion rapide externe (uniquement clients) */}
          {isClient && (
            <button 
              onClick={logout}
              title="Déconnexion"
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;