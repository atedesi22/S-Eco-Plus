import React, { useState } from 'react';
import HeaderSession from './components/HeaderSession';
import SelecteurClient from './components/SelecteurClient';
import ClavierExpress from './components/ClavierExpress';
import WidgetObjectifs from './components/WidgetObjectifs';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
// import DashboardLayout from '../../components/Layout/DashboardLayout';
// import HeaderSession from '../../components/collecte/HeaderSession';
// import SelecteurClient from '../../components/collecte/SelecteurClient';
// import ClavierExpress from '../../components/collecte/ClavierExpress';
// import WidgetObjectifs from '../../components/collecte/WidgetObjectifs';

// Données fictives pour la simulation
const MOCK_CLIENTS = [
  { id: 1, first_name: 'Amina', last_name: 'Diop', phone: '+237 699 00 00 01', solde_principal: 45000, zone: 'Bonapriso' },
  { id: 2, first_name: 'Jean', last_name: 'Kamdem', phone: '+237 677 00 00 02', solde_principal: 120000, zone: 'Akwa' },
];

export default function CollectesPage() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [montantSaisi, setMontantSaisi] = useState('');
  const [transactionType, setTransactionType] = useState('depot');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSalarieMode, setIsSalarieMode] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  // Simulation des données de performance
  const statsCollectrice = { journalier: 100000, mensuel: 2500000, realise_mois: 1850000 };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSearchQuery('');
  };

  const handleTransactionSubmit = () => {
    alert(`Opération réussie : ${transactionType === 'depot' ? 'Dépôt' : 'Retrait'} de ${montantSaisi} XAF pour ${selectedClient.first_name}`);
    setSelectedClient(null);
    setMontantSaisi('');
  };

  const filteredClients = MOCK_CLIENTS.filter(c => 
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // <DashboardLayout>
      <div
        isOnline={navigator.onLine}
          isSalarieMode={isSalarieMode}
          onSwitchRole={() => setIsSalarieMode(!isSalarieMode)}
          offlineQueueLength={0}
      className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto bg-[#F8FAFC]">
        
        {/* Bloc 1 : Header de Session & Statut Réseau */}
        <HeaderSession 
          // user={{ first_name: 'Thérèse', last_name: 'Ngo' }}
          isOnline={navigator.onLine}
          isSalarieMode={isSalarieMode}
          onSwitchRole={() => setIsSalarieMode(!isSalarieMode)}
          offlineQueueLength={0}
        />

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
      </div>
    //  </DashboardLayout>
  );
}