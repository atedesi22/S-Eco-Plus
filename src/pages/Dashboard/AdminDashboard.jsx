import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  ShieldAlert, Activity, Key, Bug, Users, UserCheck, AlertTriangle, ShieldCheck,
  TrendingUp, Search, Filter, RefreshCw, Terminal, UserX, CheckCircle2 
} from 'lucide-react';

// Données fictives initiales simulant l'état de la DB et de l'API Laravel logs
const initialLogs = [
  { id: 'LOG-4021', type: 'ERROR', message: 'Passport Token Expired Exception', component: 'AuthService', time: 'Il y a 2 min', status: 'Non résolu' },
  { id: 'LOG-4020', type: 'INFO', message: 'User Login Successful (Rôle: Client)', component: 'LoginController', time: 'Il y a 5 min', status: 'Info' },
  { id: 'LOG-4019', type: 'WARNING', message: 'Rate Limit Reached (IP: 192.168.1.45)', component: 'ThrottleRequests', time: 'Il y a 12 min', status: 'Surveillé' },
  { id: 'LOG-4018', type: 'ERROR', message: 'SQLSTATE[23000]: Integrity constraint violation', component: 'KYCMigration', time: 'Il y a 30 min', status: 'Résolu' },
];

const initialUsers = [
  { id: 1, name: 'Awa Diop', email: 'awa.diop@secoplus.com', role: 'collectrice', status: 'Actif', zone: 'Zone A - Douala' },
  { id: 2, name: 'Jean Marc', email: 'jean.marc@secoplus.com', role: 'commercial', status: 'Suspendu', zone: 'Zone B - Yaoundé' },
  { id: 3, name: 'Saliou Ndiaye', email: 'saliou@client.com', role: 'Client', status: 'Actif', zone: 'Compte Épargne Direct' },
]



const AdminDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('performance');
  const [searchLog, setSearchLog] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [logs, setLogs] = useState(initialLogs);
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  // --- DONNÉES DES GRAPHIQUES (Performance des agents internes) ---
  const agentPerformanceData = [
    { name: 'Florence N. (Coll)', comptesCrees: 24, transactions: 145, volumeFCFA: 1250000 },
    { name: 'Mme Carine (Sec)', comptesCrees: 42, transactions: 89, volumeFCFA: 850000 },
    { name: 'Jean P. (Comm)', comptesCrees: 58, transactions: 34, volumeFCFA: 2100000 },
    { name: 'Hervé T. (Chef Z)', comptesCrees: 12, transactions: 112, volumeFCFA: 3400000 },
  ];

  const globalActivityTrend = [
    { name: 'Lun', Connexions: 240, Transactions: 110, Erreurs: 4 },
    { name: 'Mar', Connexions: 320, Transactions: 145, Erreurs: 2 },
    { name: 'Mer', Connexions: 290, Transactions: 130, Erreurs: 7 },
    { name: 'Jeu', Connexions: 410, Transactions: 195, Erreurs: 1 },
    { name: 'Ven', Connexions: 480, Transactions: 240, Erreurs: 5 },
    { name: 'Sam', Connexions: 180, Transactions: 95, Erreurs: 0 },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

  // --- LOGS : HISTORIQUE COMPLET D'ACTIVITÉ (Du PDG au Client) ---
  const [activitesGlobales] = useState([
    { id: 'act_1', utilisateur: 'Atedesi B. Paul (PDG)', role: 'super_admin', action: 'Modification des paliers de taux RBAC', date: '2026-07-09 14:22', statut: 'Succès' },
    { id: 'act_2', utilisateur: 'Florence N.', role: 'collectrice', action: 'Saisie fiche de collecte terrain #CK90', date: '2026-07-09 13:45', statut: 'Succès' },
    { id: 'act_3', utilisateur: 'Mme Carine', role: 'secretaire', action: 'Approbation KYC Nouveau Client ID-882', date: '2026-07-09 11:20', statut: 'Succès' },
    { id: 'act_4', utilisateur: 'Samuel Essomba', role: 'Client', action: 'Demande de micro-crédit Électroménager', date: '2026-07-09 10:05', statut: 'En attente' },
    { id: 'act_5', utilisateur: 'Jean P.', role: 'commercial', action: 'Extraction liste prospects agence', date: '2026-07-09 09:14', statut: 'Succès' },
  ]);

  // --- LOGS : CONNEXIONS, SESSIONS & SÉCURITÉ ---
  const [logsConnexions] = useState([
    { id: 'log_1', utilisateur: 'Mme Carine', role: 'secretaire', ip: '197.244.23.102', appareil: 'Chrome / Windows', date: '2026-07-09 08:00', event: 'Connexion Réussie' },
    { id: 'log_2', utilisateur: 'Inconnu', role: 'Tentative', ip: '45.12.88.9', appareil: 'Python Requests', date: '2026-07-09 04:12', event: 'Échec - Brute Force suspecté' },
    { id: 'log_3', utilisateur: 'Florence N.', role: 'collectrice', ip: '197.244.45.12', appareil: 'Safari / iPhone', date: '2026-07-09 07:45', event: 'Connexion Réussie (Terrain)' },
    { id: 'log_4', utilisateur: 'Atedesi B. Paul (PDG)', role: 'super_admin', ip: '102.64.12.5', appareil: 'Edge / MacOS', date: '2026-07-08 18:30', event: 'Connexion Réussie' },
  ]);

  // --- LOGS : AUDIT DES BUGS ET ERREURS SYSTÈME ---
  const [logsBugs] = useState([
    { id: 'bug_1', module: 'API Passerelle SMS', message: 'Timeout 504 lors de l\'envoi du code OTP au client', gravite: 'CRITICAL', date: '2026-07-09 12:02', resolu: false },
    { id: 'bug_2', module: 'Panier Catalogue', message: 'TypeError: Cannot read properties of undefined (reading qty)', gravite: 'MINOR', date: '2026-07-09 10:55', resolu: true },
    { id: 'bug_3', module: 'Calcul Intérêts Tontine', message: 'Arrondi incorrect sur le calcul du prorata de commission', gravite: 'MAJOR', date: '2026-07-08 16:40', resolu: false },
  ]);

  // --- FILTRAGES DYNAMIQUES ---
  const filteredBugs = logsBugs.filter(bug => {
    const matchesSearch = bug.module.toLowerCase().includes(searchLog.toLowerCase()) || bug.message.toLowerCase().includes(searchLog.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || bug.gravite === severityFilter;
    return matchesSearch && matchesSeverity;
  });


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
    { id: 1, client: "Amina Diop", type: "Dépôt Tontine", montant: 25000, agent: "collectrice Kribi", statut: "Succès", date: "Il y a 5 min" },
    { id: 2, client: "Jean Kaba", type: "Remboursement Crédit", montant: 110000, agent: "commercial Douala", statut: "Succès", date: "Il y a 20 min" },
    { id: 3, client: "Sarl Keita & Fils", type: "Demande Micro-Leasing", montant: 2500000, agent: "da", statut: "En attente", date: "Il y a 1h" },
  ]);

  // Fonction utilitaire locale pour le formatage de la monnaie (Remplacera formaters.js plus tard)
  const formatFCFA = (valeur) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(valeur);
  };


  // Actions de modération à la volée
  const toggleUserStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Actif' ? 'Suspendu' : 'Actif' };
      }
      return u;
    }));
  };

  const resolveLog = (id) => {
    setLogs(logs.map(l => {
      if (l.id === id) {
        return { ...l, status: l.status === 'ERROR' ? 'Résolu' : 'Résolu' };
      }
      return l;
    }));
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto font-sans animate-fade-in">
      
      {/* HEADER DE LA ZONE AUDIT */}
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
           Mode Connecté (Rôle : super_admin)
         </div>
       </div>

       {/* BLOC 1 : LE CLOISONNEMENT DES SOLDES (SECTION comptable CRUCIALE) */}
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
             <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Flux du Jour (collectrices)</span>
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


      <div className="mb-6 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0F2942]y tracking-tight flex items-center gap-2">
            <ShieldAlert className="text-rose-500 animate-pulse" /> Console d'Administration & Traçabilité (RBAC)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Outils de monitoring en temps réel de l'écosystème financier S Eco Plus.
          </p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-center transition-all">
          <button onClick={() => setActiveSubTab('performance')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'performance' ? 'bg-[#0F2942]y text-white shadow-sm' : 'text-slate-500 hover:text-[#0F2942]y'}`}>Performance Métier</button>
          <button onClick={() => setActiveSubTab('activites')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'activites' ? 'bg-[#0F2942]y text-white shadow-sm' : 'text-slate-500 hover:text-[#0F2942]y'}`}>Flux d'Activités</button>
          <button onClick={() => setActiveSubTab('securite')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'securite' ? 'bg-[#0F2942]y text-white shadow-sm' : 'text-slate-500 hover:text-[#0F2942]y'}`}>Connexions & Logs</button>
          <button onClick={() => setActiveSubTab('bugs')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeSubTab === 'bugs' ? 'bg-[#0F2942]y text-white shadow-sm' : 'text-slate-500 hover:text-[#0F2942]y'}`}>Bugs & Alertes</button>
        </div>
      </div>

      {/* --- SOUS-PANEL 1 : GRAPHIQUES DE PERFORMANCE INTERNE (RECHARTS) --- */}
      {activeSubTab === 'performance' && (
        <div className="space-y-6 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Graphique 1 : Comptes créés vs Transactions par agent */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4 flex items-center gap-1">
                <Users size={14} className="text-[#20A376]" /> Productivité : Création comptes & volume tx
              </h3>
              <div className="w-full h-64 text-xs">
                <ResponsiveContainer width="100%" h="100%">
                  <BarChart data={agentPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Legend />
                    <Bar dataKey="comptesCrees" name="Comptes Créés" fill="#02fa9a" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="transactions" name="Transactions Validées" fill="#0f172a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Graphique 2 : Tendance hebdomadaire de charge globale */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4 flex items-center gap-1">
                <TrendingUp size={14} className="text-[#F4BE2C]" /> Tendance hebdomadaire de charge globale
              </h3>
              <div className="w-full h-64 text-xs">
                <ResponsiveContainer width="100%" h="100%">
                  <LineChart data={globalActivityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Connexions" name="Connexions" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Transactions" name="Transactions" stroke="#00C49F" strokeWidth={2} />
                    <Line type="monotone" dataKey="Erreurs" name="Bugs levés" stroke="#f43f5e" strokeWidth={2} strokeDasharray="3 4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- SOUS-PANEL 2 : TRAÇABILITÉ HISTORIQUE COMPLET (PDG AU CLIENT) --- */}
      {activeSubTab === 'activites' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Activity size={14} className="text-blue-500" /> Registre d'audit immuable des activités
            </h3>
            <span className="text-[10px] bg-slate-200 font-bold px-2 py-0.5 rounded text-slate-600">Total : {activitesGlobales.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="p-4">Utilisateur</th>
                  <th className="p-4">Rôle Prévu (RBAC)</th>
                  <th className="p-4">Action entreprise</th>
                  <th className="p-4">Date & Heure</th>
                  <th className="p-4">Statut de l'événement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {activitesGlobales.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-[#0F2942]y">{item.utilisateur}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.role === 'super_admin' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                        item.role === 'collectrice' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{item.action}</td>
                    <td className="p-4 text-slate-400">{item.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 font-bold ${item.statut === 'Succès' ? 'text-[#20A376]' : 'text-amber-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.statut === 'Succès' ? 'bg-[#20A376]' : 'bg-amber-500'}`}></span>
                        {item.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- SOUS-PANEL 3 : LOGS DE CONNEXION --- */}
      {activeSubTab === 'securite' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Key size={14} className="text-amber-500" /> Historique d'accès d'infrastructure (Sessions)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="p-4">Acteur</th>
                  <th className="p-4">Adresse IP</th>
                  <th className="p-4">Terminal / Agent</th>
                  <th className="p-4">Horodatage</th>
                  <th className="p-4">Type de Log</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                {logsConnexions.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{log.utilisateur} <span className="text-[10px] text-slate-400 font-normal">({log.role})</span></td>
                    <td className="p-4 font-mono text-slate-500">{log.ip}</td>
                    <td className="p-4 truncate max-w-xs">{log.appareil}</td>
                    <td className="p-4 text-slate-400">{log.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        log.event.includes('Réussie') ? 'bg-emerald-50 text-[#20A376]' : 'bg-rose-50 text-rose-600 font-black animate-shake'
                      }`}>
                        {log.event}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- SOUS-PANEL 4 : AUDIT DES BUGS RENCONTRÉS --- */}
      {activeSubTab === 'bugs' && (
        <div className="space-y-4 transition-all duration-300">
          
          {/* Barre de filtrage des anomalies */}
          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search size={14} className="absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                placeholder="Filtrer par module ou message de bug..." 
                className="w-full text-xs pl-9 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#20A376]"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Filter size={14} className="text-slate-400" />
              <select 
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
              >
                <option value="ALL">Toutes les gravités</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="MAJOR">MAJOR</option>
                <option value="MINOR">MINOR</option>
              </select>
            </div>
          </div>

          {/* Table d'affichage des anomalies logguées */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="p-4">Module Applicatif</th>
                    <th className="p-4">Exception / Log Message</th>
                    <th className="p-4">Sévérité</th>
                    <th className="p-4">Date de capture</th>
                    <th className="p-4">Résolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredBugs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-400">Aucun bug ou alerte système ne correspond à vos filtres actuels.</td>
                    </tr>
                  ) : (
                    filteredBugs.map((bug) => (
                      <tr key={bug.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-slate-800 flex items-center gap-1.5">
                          <Bug size={14} className={bug.resolu ? 'text-slate-300' : 'text-rose-500'} />
                          {bug.module}
                        </td>
                        <td className="p-4 font-mono text-slate-500 text-[11px] max-w-sm truncate" title={bug.message}>
                          {bug.message}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wide ${
                            bug.gravite === 'CRITICAL' ? 'bg-rose-600 text-white animate-pulse' :
                            bug.gravite === 'MAJOR' ? 'bg-amber-100 text-amber-800' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {bug.gravite}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">{bug.date}</td>
                        <td className="p-4">
                          {bug.resolu ? (
                            <span className="text-[#20A376] font-bold flex items-center gap-1"><RefreshCw size={12} /> Corrigé</span>
                          ) : (
                            <span className="text-rose-500 font-black tracking-tight flex items-center gap-1"><ShieldAlert size={12} /> Actif (Non résolu)</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      <div className="space-y-8">
      
      {/* 🔝 En-tête de Statut Rapide */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">SUPERVISION TECHNIQUE</h1>
          <p className="text-sm text-slate-500">Contrôle du RBAC, monitoring des exceptions Passport et gestion des accès microfinance.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm">
          <RefreshCw className="w-4 h-4" /> Actualiser les Métriques
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 🛡️ SECTION 1 & 2 : CRASH LOGGER & LOGS SYSTEME (Prend 2 colonnes) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-slate-600" /> Audit Trail & Exceptions API
            </h2>
            <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-semibold border border-red-100">
              {logs.filter(l => l.type === 'ERROR').length} Exceptions Actives
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <th className="p-4">ID / Type</th>
                    <th className="p-4">Message d'Exception</th>
                    <th className="p-4">Contrôleur Backend</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 font-medium">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4">
                        <span className="block font-mono text-xs text-slate-500">{log.id}</span>
                        <span className={`inline-block text-[10px] font-black px-1.5 py-0.5 rounded mt-1 ${
                          log.type === 'ERROR' ? 'bg-red-100 text-red-700' :
                          log.type === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {log.type}
                        </span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="text-slate-800 truncate font-semibold">{log.message}</p>
                        <span className="text-xs text-slate-400 block font-normal">{log.time}</span>
                      </td>
                      <td className="p-4 font-mono text-xs text-slate-600">
                        {log.component}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                          log.status === 'Non résolu' ? 'text-red-600 bg-red-50' :
                          log.status === 'Surveillé' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {log.status !== 'Résolu' && log.type === 'ERROR' ? (
                          <button 
                            onClick={() => resolveLog(log.id)}
                            className="text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all"
                          >
                            Fixer
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Aucune</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 👥 SECTION 3 : CONTROLE DES ROLES & ACTEURS S ECO PLUS (Prend 1 colonne) */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-slate-600" /> Modération des Comptes
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
            {/* Barre de recherche d'acteurs */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Chercher collectrice, commercial..." 
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Liste des acteurs */}
            <div className="divide-y divide-slate-100 max-h-[340px] overflow-y-auto pr-1">
              {users
                .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.role.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((user) => (
                  <div key={user.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="flex flex-col space-y-0.5">
                      <span className="text-sm font-bold text-slate-800">{user.name}</span>
                      <span className="text-[11px] text-slate-400 font-normal">{user.email}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded uppercase">
                          {user.role}
                        </span>
                        <span className="text-[10px] text-slate-400 italic">{user.zone}</span>
                      </div>
                    </div>

                    {/* Bouton d'action sur le statut */}
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      title={user.status === 'Actif' ? 'Suspendre le compte' : 'Activer le compte'}
                      className={`p-2 rounded-xl border transition-all ${
                        user.status === 'Actif' 
                          ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100' 
                          : 'bg-red-50 border-red-100 text-red-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100'
                      }`}
                    >
                      {user.status === 'Actif' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </div>

      </div>

    </div>
  );
};

export default AdminDashboard;