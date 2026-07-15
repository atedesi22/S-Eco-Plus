import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function ClavierExpress({ 
  client, 
  montant, 
  setMontant, 
  type, 
  setType, 
  onSubmit, 
  onCancel 
}) {
  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleQuickAdd = (value) => {
    const current = parseInt(montant) || 0;
    setMontant((current + value).toString());
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
      {/* En-tête de validation client */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#20A376]/10 text-[#20A376] flex items-center justify-center font-bold text-xs">
            {client.first_name[0]}{client.last_name[0]}
          </div>
          <div>
            <h4 className="font-bold text-[#1E293B] text-sm">{client.first_name} {client.last_name}</h4>
            <span className="text-[10px] text-slate-400">Solde : {client.solde_principal.toLocaleString()} XAF</span>
          </div>
        </div>
        <button 
          type="button" 
          onClick={onCancel} 
          className="text-xs font-semibold text-rose-500 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition"
        >
          Changer
        </button>
      </div>

      {/* Switch Type de Transaction */}
      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl">
        <button
          type="button"
          onClick={() => setType('depot')}
          className={`flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-xs transition ${
            type === 'depot' 
              ? 'bg-[#20A376] text-[#0F2942] shadow-md shadow-[#20A376]/10' 
              : 'text-slate-500 hover:text-[#1E293B]'
          }`}
        >
          <ArrowDownLeft size={14} /> Dépôt Express
        </button>
        <button
          type="button"
          onClick={() => setType('retrait')}
          className={`flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-xs transition ${
            type === 'retrait' 
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/10' 
              : 'text-slate-500 hover:text-[#1E293B]'
          }`}
        >
          <ArrowUpRight size={14} /> Retrait Express
        </button>
      </div>

      {/* Affichage du montant Saisi */}
      <div className="text-center py-4 bg-slate-50/50 rounded-2xl relative">
        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Montant Saisi</span>
        <div className="text-3xl font-black text-[#0F2942] flex items-center justify-center gap-1">
          {montant ? parseInt(montant).toLocaleString() : '0'}
          <span className="text-sm font-bold text-slate-400">XAF</span>
        </div>
      </div>

      {/* Clavier Express (Gros boutons tactiles) */}
      <div className="grid grid-cols-3 gap-2">
        {quickAmounts.map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => handleQuickAdd(val)}
            className="bg-slate-50 hover:bg-slate-100 font-extrabold text-[#0F2942] py-4 rounded-xl text-sm border border-slate-100 transition active:scale-95"
          >
            +{val.toLocaleString()}
          </button>
        ))}
        {/* Reset du montant */}
        <button
          type="button"
          onClick={() => setMontant('')}
          className="bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold py-4 rounded-xl text-xs flex items-center justify-center transition active:scale-95"
        >
          Effacer
        </button>
      </div>

      {/* Bouton de validation de l'opération */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!montant || parseInt(montant) <= 0}
        className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition active:scale-[0.98] ${
          !montant || parseInt(montant) <= 0
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            : type === 'depot' 
              ? 'bg-[#20A376] text-[#0F2942] hover:bg-[#1b8c65]' 
              : 'bg-rose-600 text-white hover:bg-rose-700'
        }`}
      >
        Valider le {type === 'depot' ? 'Dépôt' : 'Retrait'} de {(parseInt(montant) || 0).toLocaleString()} F
      </button>
    </div>
  );
}