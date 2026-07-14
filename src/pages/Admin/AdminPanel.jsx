import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  ShieldAlert, Activity, Key, Bug, Users, 
  TrendingUp, Search, Filter, RefreshCw, CheckCircle2 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('performance');
  const [searchLog, setSearchLog] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

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

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto font-sans animate-fade-in">
      
      {/* HEADER DE LA ZONE AUDIT */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

    </div>
  );
};

export default AdminDashboard;