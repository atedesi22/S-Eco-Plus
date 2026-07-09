import React from 'react';
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

const Sidebar = ({ isOpen, toggleSidebar, currentPath = '/' }) => {
  // Liste des menus configurée selon l'arborescence fonctionnelle globale de S Eco Plus
  const menuItems = [
    { title: 'Vue Générale', icon: LayoutDashboard, path: '/' },
    { title: 'Collecte de Terrain', icon: Wallet, path: '/collectes' },
    { title: 'Gestion Tontines', icon: TrendingUp, path: '/tontines' },
    { title: 'Crédits & Instructions', icon: DollarSign, path: '/credits' },
    { title: 'E-Boutique Clients', icon: ShoppingBag, path: '/boutique' },
    { title: 'Utilisateurs & KYC', icon: Users, path: '/users' },
    { title: 'Administration / RBAC', icon: ShieldCheck, path: '/admin' },
  ];

  return (
    <>
      {/* Overlay de fond pour mobile quand la sidebar est ouverte */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Conteneur principal de la Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#0F2942] text-white transition-transform duration-300 ease-in-out transform border-r border-slate-800
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* LOGO & BOUTON FERMETURE MOBILE */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#20A376] rounded-lg flex items-center justify-center font-black text-[#0F2942]">S</div>
            <span className="text-xl font-black tracking-wider text-white">S ECO <span className="text-[#F4BE2C]">PLUS</span></span>
          </div>
          <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-slate-800 lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item, index) => {
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

        {/* DECONNEXION / PIED DE SIDEBAR */}
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors">
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;