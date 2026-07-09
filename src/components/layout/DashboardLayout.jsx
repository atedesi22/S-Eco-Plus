import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex w-full h-screen bg-[#F8FAFC] overflow-hidden">
      
      {/* 1. COMPOSANT SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} currentPath="/" />

      {/* 2. ZONE DE CONTENU DROITE (NAVBAR + PAGES INJECTÉES) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Barre Supérieure */}
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* Contenu de la Page Active */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;