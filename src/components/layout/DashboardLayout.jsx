import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isClient = user?.role === 'Client';

  return (
    <div className="flex w-full h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* Rendu conditionnel automatique de la Sidebar */}
      {!isClient && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;