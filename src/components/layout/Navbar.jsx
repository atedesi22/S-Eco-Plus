import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Navbar = ({ toggleSidebar, user = { name: "M. Kamga", role: "SuperAdmin" } }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm/50">
      
      {/* BOUTON DECLENCHEUR MOBILE */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 lg:hidden transition-colors"
        >
          <Menu size={22} />
        </button>
        
        {/* Ariane ou Contexte de Zone de l'agence (utile pour le cloisonnement de la structure) */}
        <div className="hidden sm:block text-xs text-slate-400 font-medium">
          Région Littoral &bull; <span className="text-[#0F2942] font-semibold">Direction Générale</span>
        </div>
      </div>

      {/* ACTIONS RAPIDES & PROFIL */}
      <div className="flex items-center gap-4">
        
        {/* Notifications Alertes (ex: Retards crédits ou flux tontine à valider) */}
        <button className="p-2 rounded-xl text-slate-400 hover:text-[#0F2942] hover:bg-slate-50 relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>

        <div className="w-px h-6 bg-slate-200" />

        {/* Bloc Utilisateur connecté */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-800">{user.name}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#20A376]">{user.role}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
            <User size={18} />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;