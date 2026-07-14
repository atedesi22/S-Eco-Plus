import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  PiggyBank, ArrowDownLeft, ArrowUpRight, ArrowLeftRight, 
  HelpCircle, ShoppingBag, Send, Smartphone, CheckCircle2, 
  AlertCircle, Search, Calendar, Trash2, Bell, Bot, UserCheck, ShoppingCart
} from 'lucide-react';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('comptes');
  
  // --- SOUS-COMPTES ---
  const [sousComptes, setSousComptes] = useState([
    { id: 'sub_1', nom: 'Épargne Libre (Disponible)', solde: 150000, color: 'border-l-emerald-500' },
    { id: 'sub_2', nom: 'Tontine Matériel Éco', solde: 75000, color: 'border-l-[#F4BE2C]' },
    { id: 'sub_3', nom: 'Bloqué Projet Avenir', solde: 25000, color: 'border-l-blue-500' },
  ]);

  const soldePrincipal = sousComptes.reduce((acc, curr) => acc + curr.solde, 0);

  // --- TRANSACTIONS & HISTORIQUE FILTRÉ ---
  const [txType, setTxType] = useState('depot');
  const [txTargetSub, setTxTargetSub] = useState('sub_1');
  const [txAmount, setTxAmount] = useState('');
  const [txRecipient, setTxRecipient] = useState('');
  const [txStatus, setTxStatus] = useState(null);

  const [historique, setHistorique] = useState([
    { id: 't1', type: 'Dépôt', montant: 15000, date: '2026-07-08', compte: 'Épargne Libre' },
    { id: 't2', type: 'Cotisation', montant: 50000, date: '2026-07-01', compte: 'Tontine Matériel Éco' },
    { id: 't3', type: 'Retrait', montant: 10000, date: '2026-06-25', compte: 'Épargne Libre' },
    { id: 't4', type: 'Transfert', montant: 20000, date: '2026-06-15', compte: 'Épargne Libre' }
  ]);
  const [filterDate, setFilterDate] = useState('');

  // --- CATALOGUE & RECHERCHE ---
  const [searchQuery, setSearchQuery] = useState('');
  const catalogItems = [
    { id: 1, name: "Réfrigérateur Combiné Smart", price: 285000, desc: "Classe énergétique A+, idéal pour commerce ou famille.", image: "https://images.unsplash.com/photo-1571175432244-5f02585f8045?w=500&q=80" },
    { id: 2, name: "Machine à laver Automatique 8Kg", price: 210000, desc: "Haute efficacité, programme éco intégré.", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&q=80" },
    { id: 3, name: "Téléviseur LED Smart 43\"", price: 165000, desc: "4K UHD, connectivité internet intégrée.", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80" },
    { id: 4, name: "Congélateur Horizontal 300L", price: 195000, desc: "Parfait pour la conservation à long terme des stocks.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80" }
  ];

  // --- PANIER ---
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // --- NOTIFICATIONS ---
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Votre dépôt de 15 000 FCFA a été validé par l'agence.", read: false },
    { id: 2, text: "Rappel : Cotisation Tontine attendue avant le 05 de ce mois.", read: true }
  ]);
  const [showNotif, setShowNotif] = useState(false);

  // --- CHATBOT ---
  const [chatOpen, setChatOpen] = useState(false);
  const [agentOnline, setAgentOnline] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Bonjour ! Je suis NovaAI. Un agent de votre agence prendra le relais dès sa connexion.', time: 'Maintenant' }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatOpen && !agentOnline) {
      const timer = setTimeout(() => {
        setAgentOnline(true);
        setMessages(prev => [
          ...prev,
          { id: Date.now(), sender: 'system', text: '🤖 NovaAI s\'efface. Mme Carine (secretaire Agence) est en ligne.', time: 'Maintenant' },
          { id: Date.now() + 1, sender: 'agent', text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui sur votre espace ?', time: 'Maintenant' }
        ]);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [chatOpen]);

  // --- LOGIQUES OPÉRATIONNELLES ---
  const formatFCFA = (valeur) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(valeur);
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    const amount = parseInt(txAmount);
    if (isNaN(amount) || amount <= 0) return;

    let targetCompteName = "Épargne Libre";

    setSousComptes(prev => prev.map(compte => {
      if (compte.id === txTargetSub) {
        targetCompteName = compte.nom;
        if (txType === 'depot') return { ...compte, solde: compte.solde + amount };
        if (txType === 'retrait' && compte.solde >= amount) return { ...compte, solde: compte.solde - amount };
      }
      if (txType === 'transfert' && compte.id === 'sub_1' && compte.solde >= amount) {
        return { ...compte, solde: compte.solde - amount };
      }
      return compte;
    }));

    // Tracer dans l'historique
    const newTx = {
      id: Date.now().toString(),
      type: txType === 'depot' ? 'Dépôt' : txType === 'retrait' ? 'Retrait' : 'Transfert',
      montant: amount,
      date: new Date().toISOString().split('T')[0],
      compte: txType === 'transfert' ? 'Vers ' + txRecipient : targetCompteName
    };

    setHistorique(prev => [newTx, ...prev]);
    
    // Déclencher une notification
    setNotifications(prev => [{ id: Date.now(), text: `Nouvelle opération : ${newTx.type} de ${formatFCFA(amount)} effectuée.`, read: false }, ...prev]);

    setTxStatus({ success: true, message: `Opération validée avec succès !` });
    setTxAmount('');
    setTxRecipient('');
    setTimeout(() => setTxStatus(null), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const filteredCatalog = catalogItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistory = historique.filter(tx => 
    filterDate === '' ? true : tx.date === filterDate
  );

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto font-sans relative pb-24">
      
      {/* BARRE SUPÉRIEURE - NOTIFICATIONS & PANIER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0F2942]">Mon Portefeuille Éco</h1>
          <p className="text-xs text-slate-400">Ravi de vous revoir, {user?.name}</p>
        </div>
        
        <div className="flex items-center gap-2 relative">
          {/* Panier */}
          <button onClick={() => { setShowCart(!showCart); setShowNotif(false); }} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-600 relative hover:bg-slate-50">
            <ShoppingCart size={18} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F4BE2C] text-[#0F2942] font-bold text-[9px] rounded-full flex items-center justify-center">{cart.reduce((a,c) => a+c.qty, 0)}</span>}
          </button>

          {/* Notifications */}
          <button onClick={() => { setShowNotif(!showNotif); setShowCart(false); }} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-600 relative hover:bg-slate-50">
            <Bell size={18} />
            {notifications.some(n => !n.read) && <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>}
          </button>

          {/* DROPDOWN NOTIFICATIONS */}
          {showNotif && (
            <div className="absolute right-0 top-12 w-72 bg-white border border-slate-100 rounded-xl shadow-xl p-3 z-40 space-y-2">
              <h4 className="text-xs font-bold text-[#0F2942] border-b pb-1.5">Notifications</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className={`p-2 rounded-lg text-[11px] ${n.read ? 'bg-slate-50 text-slate-500' : 'bg-emerald-50 text-slate-800 font-medium'}`}>
                    {n.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DROPDOWN PANIER */}
          {showCart && (
            <div className="absolute right-12 top-12 w-80 bg-white border border-slate-100 rounded-xl shadow-xl p-4 z-40 space-y-3">
              <h4 className="text-xs font-bold text-[#0F2942] border-b pb-1.5 flex justify-between">
                <span>Mon Panier Financement</span>
                <button onClick={() => setCart([])} className="text-rose-500 hover:underline text-[10px]">Vider</button>
              </h4>
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Votre panier est vide.</p>
              ) : (
                <>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <div className="truncate pr-2">
                          <p className="font-bold text-slate-800 truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400">Qté: {item.qty}</p>
                        </div>
                        <span className="font-bold text-[#0F2942] shrink-0">{formatFCFA(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center text-xs font-bold">
                    <span>Total :</span>
                    <span className="text-[#20A376]">{formatFCFA(cart.reduce((a,c) => a + (c.price * c.qty), 0))}</span>
                  </div>
                  <button onClick={() => { alert('Demande de micro-crédit soumise pour le panier !'); setCart([]); setShowCart(false); }} className="w-full bg-[#0F2942] text-white text-[11px] font-bold py-2 rounded-lg text-center">
                    Convertir en demande de crédit
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SOLDE CONSOLIDÉ */}
      <div className="bg-gradient-to-br from-[#0F2942] to-slate-900 rounded-2xl p-6 text-white shadow-xl mb-8">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Solde Principal Global</p>
        <h2 className="text-3xl font-black text-[#F4BE2C] tracking-tight">{formatFCFA(soldePrincipal)}</h2>
      </div>

      {/* ONGLES DE NAVIGATION */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto no-scrollbar gap-2">
        <button onClick={() => setActiveTab('comptes')} className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${activeTab === 'comptes' ? 'border-[#20A376] text-[#20A376]' : 'border-transparent text-slate-400'}`}><PiggyBank size={16} /> Comptes & Suivi</button>
        <button onClick={() => setActiveTab('transactions')} className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${activeTab === 'transactions' ? 'border-[#20A376] text-[#20A376]' : 'border-transparent text-slate-400'}`}><ArrowLeftRight size={16} /> Opérations</button>
        <button onClick={() => setActiveTab('catalogue')} className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${activeTab === 'catalogue' ? 'border-[#20A376] text-[#20A376]' : 'border-transparent text-slate-400'}`}><ShoppingBag size={16} /> Boutique Équipements</button>
      </div>

      {/* CONTENU DES PANELS */}
      <div className="min-h-[300px]">

        {/* TAB 1 : COMPTES & HISTORIQUE DES TRANSACTIONS TRACÉES AVEC FILTRE */}
        {activeTab === 'comptes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sousComptes.map((compte) => (
                <div key={compte.id} className={`bg-white p-5 rounded-xl border border-slate-100 shadow-sm border-l-4 ${compte.color}`}>
                  <span className="text-xs font-semibold text-slate-500">{compte.nom}</span>
                  <p className="text-xl font-black text-[#0F2942] mt-1">{formatFCFA(compte.solde)}</p>
                </div>
              ))}
            </div>

            {/* SECTION TRACABILITÉ / HISTORIQUE */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-bold text-[#0F2942] uppercase tracking-wider">Historique des Transactions</h3>
                
                {/* FILTRE DE DATE */}
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <Calendar size={14} className="text-slate-400" />
                  <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-transparent text-xs text-slate-700 outline-none cursor-pointer" />
                  {filterDate && <button onClick={() => setFilterDate('')} className="text-[10px] text-rose-500 ml-1 hover:underline">Effacer</button>}
                </div>
              </div>

              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {filteredHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">Aucune transaction trouvée pour cette sélection.</p>
                ) : (
                  filteredHistory.map((tx) => (
                    <div key={tx.id} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{tx.type} ({tx.compte})</p>
                        <p className="text-[10px] text-slate-400">{tx.date}</p>
                      </div>
                      <span className={`font-black ${tx.type === 'Retrait' || tx.type === 'Transfert' ? 'text-rose-500' : 'text-[#20A376]'}`}>
                        {tx.type === 'Retrait' || tx.type === 'Transfert' ? '-' : '+'} {formatFCFA(tx.montant)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 : LES TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="max-w-xl bg-white border border-slate-100 p-6 rounded-xl shadow-sm">
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl mb-6">
              {['depot', 'retrait', 'transfert'].map((type) => (
                <button key={type} onClick={() => { setTxType(type); setTxStatus(null); }} className={`py-2 text-xs font-bold rounded-lg uppercase tracking-tight transition-all ${txType === type ? 'bg-[#0F2942] text-white shadow' : 'text-slate-500'}`}>
                  {type}
                </button>
              ))}
            </div>

            {txStatus && (
              <div className="p-3 mb-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium rounded-xl flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#20A376]" /> {txStatus.message}
              </div>
            )}

            <form onSubmit={handleTransaction} className="space-y-4">
              {txType !== 'transfert' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Sélectionner le sous-compte</label>
                  <select value={txTargetSub} onChange={(e) => setTxTargetSub(e.target.value)} className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none">
                    {sousComptes.map(sc => <option key={sc.id} value={sc.id}>{sc.nom} ({formatFCFA(sc.solde)})</option>)}
                  </select>
                </div>
              )}

              {txType === 'transfert' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Numéro de téléphone du destinataire S Eco</label>
                  <div className="relative">
                    <Smartphone size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <input type="text" required value={txRecipient} onChange={(e) => setTxRecipient(e.target.value)} placeholder="Ex: 677000000" className="w-full text-sm pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Montant (FCFA)</label>
                <input type="number" required value={txAmount} onChange={(e) => setTxAmount(e.target.value)} placeholder="Ex: 25000" className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>

              <button type="submit" className="w-full text-xs font-bold text-white bg-[#20A376] hover:bg-emerald-600 py-3 rounded-xl uppercase tracking-wider">
                Valider l'opération
              </button>
            </form>
          </div>
        )}

        {/* TAB 3 : BOUTIQUE / CATALOGUE AVEC RECHERCHE DYNAMIQUE */}
        {activeTab === 'catalogue' && (
          <div className="space-y-6">
            {/* BARRE DE RECHERCHE DYNAMIQUE */}
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher un équipement (Ex: Téléviseur, Machine...)" className="w-full text-xs pl-10 p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#20A376] shadow-sm" />
            </div>

            {/* LISTE DES PRODUITS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {filteredCatalog.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
                  <img src={item.image} alt={item.name} className="h-36 w-full object-cover" />
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F2942] text-xs">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between">
                      <span className="font-black text-[#20A376] text-xs">{formatFCFA(item.price)}</span>
                      <button onClick={() => addToCart(item)} className="text-[10px] bg-[#0F2942] hover:bg-slate-800 text-white font-bold py-1.5 px-2 rounded-lg transition-colors flex items-center gap-1">
                        + Panier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CHATBOT HYBRIDE INTELLIGENT */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button onClick={() => setChatOpen(true)} className="bg-[#20A376] hover:bg-emerald-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105">
            <Bot size={24} />
          </button>
        ) : (
          <div className="w-80 sm:w-96 h-[420px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-[#0F2942] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                {agentOnline ? <UserCheck size={18} className="text-[#20A376]" /> : <Bot size={18} className="text-[#F4BE2C]" />}
                <div>
                  <h4 className="text-xs font-bold">{agentOnline ? "Mme Carine (secretaire)" : "NovaAI - Assistant S Eco"}</h4>
                  <p className="text-[9px] text-slate-300">{agentOnline ? "Prend la relève en ligne" : "Chatbot intelligent actif"}</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-xs opacity-70">Fermer</button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-slate-50 text-[11px]">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.sender === 'system' ? (
                    <div className="w-full text-center py-1 text-[9px] text-amber-600 font-bold bg-amber-50 rounded-lg px-2 border border-amber-100 my-1">{msg.text}</div>
                  ) : (
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-[#20A376] text-white rounded-br-none' : msg.sender === 'agent' ? 'bg-blue-600 text-white rounded-bl-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if(!chatInput.trim()) return; setMessages(p => [...p, { id: Date.now(), sender: 'user', text: chatInput }]); setChatInput(''); }} className="p-2 border-t border-slate-100 flex gap-2 bg-white">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Votre message..." className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              <button type="submit" className="bg-[#0F2942] text-white px-3 py-2 rounded-xl text-xs">Envoyer</button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};

export default ClientDashboard;