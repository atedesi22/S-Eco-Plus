import React from 'react';
import { Search, MapPin, UserPlus } from 'lucide-react';

export default function SelecteurClient({ searchQuery, setSearchQuery, clients, onSelectClient, onOpenProspection }) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-[#0F2942] text-lg">Sélectionner un Client</h3>
          <p className="text-xs text-slate-400">Recherchez un membre actif de votre zone</p>
        </div>
        
        {/* Raccourci Prospection */}
        <button
          onClick={onOpenProspection}
          className="flex items-center gap-1 bg-[#20A376]/10 hover:bg-[#20A376]/20 text-[#20A376] font-bold text-xs py-2 px-3.5 rounded-xl transition-all"
        >
          <UserPlus size={14} />
          Nouveau
        </button>
      </div>

      {/* Input de recherche */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Nom, matricule ou n° de téléphone..."
          className="w-full bg-slate-50 border-0 rounded-2xl pl-12 pr-4 py-3.5 text-[#1E293B] placeholder-slate-400 focus:ring-2 focus:ring-[#20A376] focus:bg-white transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Résultats de recherche instantanés */}
      {searchQuery && (
        <div className="space-y-2 max-h-60 overflow-y-auto pt-2">
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => onSelectClient(client)}
              className="w-full bg-slate-50 hover:bg-[#20A376]/5 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between text-left transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0F2942]/5 text-[#0F2942] font-extrabold flex items-center justify-center text-sm">
                  {client.first_name[0]}{client.last_name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-[#1E293B] text-sm">{client.first_name} {client.last_name}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {client.phone} • {client.zone}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Solde global</span>
                <span className="font-extrabold text-[#0F2942] text-sm">{client.solde_principal.toLocaleString()} F</span>
              </div>
            </button>
          ))}
          {clients.length === 0 && (
            <p className="text-center text-slate-400 text-xs py-4">Aucun client ne correspond à cette recherche.</p>
          )}
        </div>
      )}
    </div>
  );
}