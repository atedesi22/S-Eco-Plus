import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, User, LogOut } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  // Sécurité si aucun utilisateur n'est connecté au rendu initial
  if (!user) return null;

  const isClient = user.role === 'Client';

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm/50">
      
      <div className="flex items-center gap-4">
        {/* Le bouton menu hamburger est masqué pour les clients puisqu'ils n'ont pas de sidebar admin */}
        {!isClient && (
          <button 
            onClick={toggleSidebar}
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
        
        <button className="p-2 rounded-xl text-slate-400 hover:text-[#0F2942] hover:bg-slate-50 relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>

        <div className="w-px h-6 bg-slate-200" />

        {/* BLOC PROFIL ET RÔLE */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-slate-800">{user.name}</p>
            <p className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              isClient ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-[#20A376]'
            }`}>
              {user.role}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
            <User size={18} />
          </div>

          {/* Raccourci déconnexion rapide pour les clients directement dans la Navbar */}
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