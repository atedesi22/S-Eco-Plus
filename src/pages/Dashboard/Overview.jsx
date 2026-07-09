import React, { useState } from 'react';

const Overview = () => {
  // Données simulées (En attendant l'interconnexion complète avec l'API Laravel)
  const [metrics, setMetrics] = useState({
    soldeConsolide: 14500000, // FCFA
    soldeTontines: 8200000,
    soldeCreditsEnCours: 6300000,
    collectesDuJour: 450000,
    tauxRemboursement: 94.2,
    demandesEnAttente: 12
  });

  // Liste fictive des dernières transactions pour le suivi d'activité
  const [recentTransactions] = useState([
    { id: 1, client: "Amina Diop", type: "Dépôt Tontine", montant: 25000, agent: "Collectrice Kribi", statut: "Succès", date: "Il y a 5 min" },
    { id: 2, client: "Jean Kaba", type: "Remboursement Crédit", montant: 110000, agent: "Commercial Douala", statut: "Succès", date: "Il y a 20 min" },
    { id: 3, client: "Sarl Keita & Fils", type: "Demande Micro-Leasing", montant: 2500000, agent: "Chef d'agence", statut: "En attente", date: "Il y a 1h" },
  ]);

  // Fonction utilitaire locale pour le formatage de la monnaie (Remplacera formaters.js plus tard)
  const formatFCFA = (valeur) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(valeur);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-8 font-sans">
      
      {/* EN-TÊTE DU DASHBOARD */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] tracking-tight">
            Tableau de Bord Principal
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Suivi en temps réel de l'activité financière — S Eco Plus
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-xs font-semibold text-[#0F2942]">
          <span className="w-2 h-2 rounded-full bg-[#20A376] animate-pulse"></span>
          Mode Connecté (Rôle : SuperAdmin)
        </div>
      </div>

      {/* BLOC 1 : LE CLOISONNEMENT DES SOLDES (SECTION COMPTABLE CRUCIALE) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Carte Solde Consolidé Principal (Mise en avant maximale) */}
        <div className="bg-[#0F2942] rounded-2xl p-6 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden lg:col-span-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#20A376] opacity-20 rounded-full blur-xl transform translate-x-10 -translate-y-10"></div>
          <p className="text-xs uppercase font-bold text-slate-300 tracking-wider">Solde Principal Consolidé</p>
          <h3 className="text-3xl sm:text-4xl font-black mt-2 text-[#F4BE2C]">
            {formatFCFA(metrics.soldeConsolide)}
          </h3>
          <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between text-xs text-slate-300">
            <span>Disponibilités coffre & banques</span>
            <span className="font-bold text-[#20A376]">Sécurisé</span>
          </div>
        </div>

        {/* Carte Tontines & Épargnes Individuelles */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Encours Tontines & Épargnes</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mt-2">
              {formatFCFA(metrics.soldeTontines)}
            </h3>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            <span>Fonds propres clients gérés</span>
            <span className="text-[#20A376] font-semibold">↑ +4.2% ce mois</span>
          </div>
        </div>

        {/* Carte Portefeuille de Crédits Actifs */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Portefeuille Crédit en Cours</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mt-2">
              {formatFCFA(metrics.soldeCreditsEnCours)}
            </h3>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            <span>Taux de recouvrement moyen</span>
            <span className="font-bold text-[#0F2942]">{metrics.tauxRemboursement}%</span>
          </div>
        </div>

      </div>

      {/* BLOC 2 : PERFORMANCE DU JOUR & ALERTES OPÉRATIONNELLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Indicateur de Collecte de Terrain (Mobile-first indispensable) */}
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Flux du Jour (Collectrices)</span>
            <h4 className="text-2xl font-black text-[#20A376]">{formatFCFA(metrics.collectesDuJour)}</h4>
            <p className="text-xs text-emerald-600">Montant total des cotisations synchronisées aujourd'hui.</p>
          </div>
          <div className="p-3 bg-[#20A376]/10 rounded-xl text-[#20A376]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        {/* Alerte Demandes d'Aide ou Crédits Restantes */}
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 border border-amber-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Dossiers en Attente d'Instruction</span>
            <h4 className="text-2xl font-black text-amber-600">{metrics.demandesEnAttente} demandes</h4>
            <p className="text-xs text-amber-600">Nécessite une validation KYC ou signature managériale.</p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
        </div>

      </div>

      {/* BLOC 3 : LE JOURNAL DES FLUX DE TERRAIN / ACTIVITÉ RÉCENTE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-[#0F2942]">Flux d'Activité Récent</h3>
            <p className="text-xs text-slate-400 mt-0.5">Dernières opérations enregistrées sur les agences connectées.</p>
          </div>
          <button className="text-xs font-bold text-[#20A376] hover:underline">Voir tout</button>
        </div>

        {/* Tableau Responsive (Mobile scroll horizontal, Propre sur desktop) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Client</th>
                <th className="py-4 px-6">Type d'Opération</th>
                <th className="py-4 px-6">Montant</th>
                <th className="py-4 px-6">Initié par</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-[#1E293B]">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold">{tx.client}</td>
                  <td className="py-4 px-6 text-slate-500">{tx.type}</td>
                  <td className="py-4 px-6 font-bold text-[#0F2942]">{formatFCFA(tx.montant)}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{tx.agent}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      tx.statut === 'Succès' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {tx.statut}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-xs">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Overview;