import React from 'react';
import { Target, TrendingUp, Trophy } from 'lucide-react';

export default function WidgetObjectifs({ stats }) {
  // Calcul de progression
  const pctMensuel = Math.min(100, Math.round((stats.realise_mois / stats.mensuel) * 100));

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
      <div>
        <h3 className="font-bold text-[#0F2942] text-base flex items-center gap-2">
          <Target className="text-[#F4BE2C]" size={20} />
          Mes Objectifs & Objectifs Admin
        </h3>
        <p className="text-xs text-slate-400">Visualisez votre performance sur le terrain</p>
      </div>

      <div className="space-y-4.5 pt-1">
        {/* Objectif Mensuel */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
            <span>Quota Mensuel</span>
            <span className="text-[#0F2942]">{stats.realise_mois.toLocaleString()} F / {stats.mensuel.toLocaleString()} F</span>
          </div>
          {/* Barre de progression */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#20A376] h-full rounded-full transition-all duration-500" 
              style={{ width: `${pctMensuel}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Rempli à {pctMensuel}%</span>
        </div>

        {/* Objectif Journalier */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold block mb-1">CIBLE DU JOUR</span>
            <span className="font-extrabold text-[#0F2942] text-sm">{stats.journalier.toLocaleString()} F</span>
          </div>
          <div className="bg-[#20A376]/5 p-3 rounded-2xl border border-[#20A376]/10">
            <span className="text-[10px] text-[#20A376] font-bold block mb-1">RÉCOMPENSE BONUS</span>
            <span className="font-extrabold text-[#0F2942] text-sm flex items-center gap-1">
              <Trophy size={14} className="text-[#F4BE2C]" /> Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}