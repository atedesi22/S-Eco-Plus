import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children,  isOnline, isSalarieMode, onSwitchRole, offlineQueueLength, onSync  }) => {
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
        
        <Navbar
        isOnline={navigator.onLine}
          isSalarieMode={isSalarieMode}
          onSwitchRole={() => setIsSalarieMode(!isSalarieMode)}
          offlineQueueLength={0}
        toggleSidebar={toggleSidebar} />

        {!isSalarieMode ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Colonne Gauche : Saisie / Recherche */}
                    <div className="lg:col-span-2 space-y-6">
                      {!selectedClient ? (
                        <SelecteurClient 
                          searchQuery={searchQuery}
                          setSearchQuery={setSearchQuery}
                          clients={filteredClients}
                          onSelectClient={handleSelectClient}
                          onOpenProspection={() => alert('Ouverture du formulaire de prospection...')}
                        />
                      ) : (
                        <ClavierExpress 
                          client={selectedClient}
                          montant={montantSaisi}
                          setMontant={setMontantSaisi}
                          type={transactionType}
                          setType={setTransactionType}
                          onSubmit={handleTransactionSubmit}
                          onCancel={() => setSelectedClient(null)}
                        />
                      )}
                    </div>
        
                    {/* Colonne Droite : Widgets & Rapports */}
                    <div className="space-y-6">
                      <WidgetObjectifs stats={statsCollectrice} />
                    </div>
        
                  </div>
                ) : (
                  /* Espace Salarié (Contenu si Double Casquette est activée) */
                  <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm max-w-lg mx-auto">
                    <h3 className="text-xl font-black text-[#0F2942] mb-2">Espace Salarié</h3>
                    <p className="text-sm text-slate-500 mb-6">Consultez vos bulletins de paie, demandes administratives et contrats signés.</p>
                    <button 
                      onClick={() => setIsSalarieMode(false)}
                      className="bg-[#0F2942] text-white font-bold py-3 px-6 rounded-2xl hover:bg-slate-800 transition"
                    >
                      Retourner au Terrain
                    </button>
                  </div>
                )}
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;