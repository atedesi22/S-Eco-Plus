import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  ShieldCheck, 
  LogOut,
  X 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, onMenuToggle, currentPath = '/' }) => {
  const { user, logout } = useAuth();

  // Si l'utilisateur est un Client, on ne lui affiche pas la Sidebar du personnel interne
  if (!user || user.role === 'client') return null;

  // Configuration des menus avec restriction par rôle (RBAC)
  const menuItems = [
    { 
      title: 'Vue Générale', 
      icon: LayoutDashboard, 
      path: '/', 
      roles: ['super_admin', 'dg_pdg', 'dom', 'daf', 'dr', "da", 'chef_commercial', 'collectrice', 'commercial', 'comptable', 'secretaire'] 
    },
    { 
      title: 'Collecte de Terrain', 
      icon: Wallet, 
      path: '/collectes', 
      roles: ['super_admin', 'collectrice', 'comptable'] 
    },
    { 
      title: 'Gestion Tontines', 
      icon: TrendingUp, 
      path: '/tontines', 
      roles: ['super_admin', 'dg_pdg', 'dom', 'daf', 'dr', "da", 'chef_commercial', 'collectrice', 'comptable'] 
    },
    { 
      title: 'Crédits & Instructions', 
      icon: DollarSign, 
      path: '/credits', 
      roles: ['super_admin', 'dg_pdg', 'dom', 'daf', 'dr', "da", 'commercial', 'comptable'] 
    },
    { 
      title: 'E-Boutique Clients', 
      icon: ShoppingBag, 
      path: '/boutique', 
      roles: ['super_admin', 'dg_pdg', 'dom', 'daf', 'dr', "da", 'commercial', 'secretaire'] 
    },
    { 
      title: 'Utilisateurs & KYC', 
      icon: Users, 
      path: '/users', 
      roles: ['super_admin', 'dg_pdg', 'dr', "da", 'commercial', 'secretaire'] 
    },
    { 
      title: 'Administration / RBAC', 
      icon: ShieldCheck, 
      path: '/admin', 
      roles: ['super_admin'] // Strictement réservé au super_admin
    },
  ];

  // Filtrage dynamique des menus basés sur le rôle de l'utilisateur connecté
  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onMenuToggle}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transition-transform duration-300 md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#20A376] rounded-lg flex items-center justify-center font-black text-[#0F2942]">S</div>
            <span className="text-xl font-black tracking-wider text-white">S ECO <span className="text-[#F4BE2C]">PLUS</span></span>
          </div>
          <button onClick={onMenuToggle} className="p-1 rounded-lg hover:bg-slate-800 lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* LIENS FILTRÉS DYNAMIQUEMENT */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {filteredMenu.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <a
                key={index}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-[#20A376] text-[#0F2942] font-bold shadow-lg shadow-[#20A376]/10' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#0F2942]' : 'text-slate-400 group-hover:text-white'} />
                {item.title}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;