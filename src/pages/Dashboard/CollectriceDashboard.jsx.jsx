import React, { useState, useEffect } from 'react';
// import { useCollecteStore } from '../../stores/useCollecteStore';
import { Search, Plus, Minus, Wifi, WifiOff, RefreshCw, CheckCircle, User } from 'lucide-react';
import { useCollecteStore } from '../../store/useCollecteStore';

// Exemple de données locales pour la recherche instantanée (à lier à l'API plus tard)
const MOCK_CLIENTS = [
  { id: 1, first_name: 'Amina', last_name: 'Diop', phone: '+237699000001', solde_principal: 45000, zone: 'Zone A' },
  { id: 2, first_name: 'Jean', last_name: 'Kamdem', phone: '+237677000002', solde_principal: 120000, zone: 'Zone A' },
  { id: 3, first_name: 'Fatou', last_name: 'Ndiaye', phone: '+237655000003', solde_principal: 15000, zone: 'Zone B' },
];

export default function CollecteTerrain() {
  const {
    selectedClient,
    montantSaisi,
    transactionType,
    offlineQueue,
    setSelectedClient,
    setMontantSaisi,
    setTransactionType,
    addToOfflineQueue,
    clearSession
  } = useCollecteStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [successMessage, setSuccessMessage] = useState('');

  // Détection du statut de la connexion internet
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Recherche instantanée
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredClients([]);
    } else {
      const results = MOCK_CLIENTS.filter(
        (client) =>
          `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.phone.includes(searchQuery)
      );
      setFilteredClients(results);
    }
  }, [searchQuery]);

  // Raccourcis de montants XAF
  const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000];

  const handleQuickAmount = (amount) => {
    const current = parseInt(montantSaisi) || 0;
    setMontantSaisi((current + amount).toString());
  };

  const handleClearAmount = () => {
    setMontantSaisi('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClient || !montantSaisi || parseInt(montantSaisi) <= 0) return;

    const transaction = {
      client_id: selectedClient.id,
      client_name: `${selectedClient.first_name} ${selectedClient.last_name}`,
      amount: parseInt(montantSaisi),
      type: transactionType,
    };

    if (isOnline) {
      // Simulation d'envoi API réussi
      setSuccessMessage(`Envoi réussi : ${transactionType === 'depot' ? 'Dépôt' : 'Retrait'} de ${transaction.amount} XAF effectué pour ${transaction.client_name} !`);
    } else {
      // Mode Hors-ligne : sauvegarde locale
      addToOfflineQueue(transaction);
      setSuccessMessage(`⚠️ Mode hors-ligne : Transaction de ${transaction.amount} XAF enregistrée localement pour ${transaction.client_name}.`);
    }

    // Réinitialisation de la session de collecte après validation
    setTimeout(() => {
      setSuccessMessage('');
      clearSession();
      setSearchQuery('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-24  md:mx-auto md:shadow-lg md:rounded-3xl md:my-6">
      {/* Header Statut Réseau */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm mb-4 border border-slate-100">
        <h1 className="font-bold text-slate-800 text-lg">S ECO PLUS - Collecte</h1>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isOnline ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isOnline ? (
            <>
              <Wifi size={14} /> En ligne
            </>
          ) : (
            <>
              <WifiOff size={14} /> Hors-ligne 
            </>
          )}
        </div>
      </div>

      {/* Notifications Files d'attente Hors-ligne */}
      {offlineQueue.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-2xl mb-4 text-sm flex items-center justify-between">
          <span>{offlineQueue.length} collecte(s) en attente de synchronisation.</span>
          {isOnline && (
            <button className="flex items-center gap-1 bg-amber-600 text-white px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-amber-700 transition">
              <RefreshCw size={12} className="animate-spin" /> Synchroniser
            </button>
          )}
        </div>
      )}

      {/* Alerte succès */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl mb-4 text-sm flex items-start gap-2">
          <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Étape A : Recherche de client */}
      {!selectedClient ? (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Rechercher un membre</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Nom, prénom ou n° téléphone..."
                className="w-full bg-slate-50 border-0 rounded-2xl pl-11 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Liste des résultats */}
          <div className="space-y-2.5">
            {filteredClients.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between text-left active:scale-[0.98] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    {client.first_name[0]}{client.last_name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{client.first_name} {client.last_name}</h3>
                    <p className="text-xs text-slate-400">{client.phone} • {client.zone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Solde</span>
                  <span className="font-bold text-slate-800">{client.solde_principal.toLocaleString()} F</span>
                </div>
              </button>
            ))}

            {searchQuery && filteredClients.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">Aucun membre trouvé pour cette recherche.</p>
            )}
          </div>
        </div>
      ) : (
        /* Étape B : Formulaire de transaction express */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fiche Client Sélectionné */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                {selectedClient.first_name[0]}{selectedClient.last_name[0]}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{selectedClient.first_name} {selectedClient.last_name}</h3>
                <p className="text-xs text-slate-400">{selectedClient.phone}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearSession}
              className="text-xs font-bold text-slate-400 hover:text-rose-500 uppercase px-3 py-1 rounded-lg hover:bg-rose-50 transition"
            >
              Changer
            </button>
          </div>

          {/* Choix du type de transaction */}
          <div className="grid grid-cols-2 gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <button
              type="button"
              className={`py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition ${transactionType === 'depot' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-slate-600'}`}
              onClick={() => setTransactionType('depot')}
            >
              <Plus size={18} /> Dépôt Express
            </button>
            <button
              type="button"
              className={`py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition ${transactionType === 'retrait' ? 'bg-rose-600 text-white shadow-md' : 'bg-transparent text-slate-600'}`}
              onClick={() => setTransactionType('retrait')}
            >
              <Minus size={18} /> Retrait Express
            </button>
          </div>

          {/* Pavé de saisie et montant */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider text-center">Montant de l'opération (XAF)</label>
            <div className="relative flex items-center justify-center">
              <input
                type="number"
                placeholder="0"
                className="w-full text-center text-4xl font-extrabold border-0 bg-transparent text-slate-800 placeholder-slate-200 focus:ring-0"
                value={montantSaisi}
                onChange={(e) => setMontantSaisi(e.target.value)}
                required
              />
              {montantSaisi && (
                <button
                  type="button"
                  onClick={handleClearAmount}
                  className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Raccourcis de montants tactiles */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAmount(val)}
                  className="bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl border border-slate-100 hover:bg-slate-100 active:scale-95 transition"
                >
                  +{val.toLocaleString()}
                </button>
              ))}
              <button
                type="button"
                onClick={handleClearAmount}
                className="bg-rose-50 text-rose-600 font-bold py-3.5 rounded-xl border border-rose-100 hover:bg-rose-100 active:scale-95 transition"
              >
                C
              </button>
            </div>
          </div>

          {/* Validation */}
          <button
            type="submit"
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition active:scale-[0.98] ${transactionType === 'depot' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
          >
            Valider le {transactionType === 'depot' ? 'Dépôt' : 'Retrait'}
          </button>
        </form>
      )}
    </div>
  );
}