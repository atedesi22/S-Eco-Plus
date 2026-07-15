import React from 'react';
import { Wifi, WifiOff, RefreshCw, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function HeaderSession({ isOnline, isSalarieMode, onSwitchRole, offlineQueueLength, onSync }) {
  const { user, logout } = useAuth();
  if (!user) return null;
    return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Profil de la collectrice */}
      <div className="flex items-center gap-3">
        {/* <div className="w-12 h-12 max-sm:hidden rounded-xl bg-[#0F2942] text-white flex items-center justify-center font-bold text-lg border-2 border-[#20A376]">
           
          {user?.first_name?.[0]}{user?.last_name?.[0]}
        </div> */}
         <div>
          <h2 className="font-bold text-[#1E293B] text-base ">
             {user.first_name} {user.last_name || ''}
            {/* {user?.first_name || 'Thérèse'} {user?.last_name || 'Ngo'} */}
          </h2>
         {/* <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <UserCheck size={12} className="text-[#20A376]" />
            Mode : <span className="font-semibold text-[#0F2942]">{isSalarieMode ? 'Salarié' : 'Collectrice de Terrain'}</span>
          </p>*/}
        </div> 
        <div className="block sm:hidden border-b border-slate-100 pb-2 mb-1">
                <p className="text-xs font-bold text-slate-800">{user.first_name || user.name} {user.last_name || ''}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">
                    <UserCheck size={12} className="text-[#20A376]" />
                  Mode : {isSalarieMode ? 'Salarié' : user.role}
                </p>
              </div>
      </div>

      {/* Actions & Statut */}
      <div className="flex flex-wrap items-center gap-2 sm:self-center">
        {/* Switch Double Casquette */}
        <button
          onClick={onSwitchRole}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 text-[#0F2942] hover:bg-slate-50 transition active:scale-95"
        >
          <Sparkles size={14} className="text-[#F4BE2C]" />
          Bascule {isSalarieMode ? 'Terrain' : 'Salarié'}
        </button>

        {/* Indicateur Réseau */}
        <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold ${
          isOnline 
            ? 'bg-[#20A376]/10 text-[#20A376]' 
            : 'bg-rose-50 text-rose-600 border border-rose-100'
        }`}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          {isOnline ? 'En ligne' : 'Hors-ligne'}
        </div>

        {/* Bouton de Synchro si Queue Hors-ligne */}
        {offlineQueueLength > 0 && (
          <button
            onClick={onSync}
            disabled={!isOnline}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition active:scale-95 ${
              isOnline ? 'bg-[#20A376] hover:bg-[#1b8c65] shadow-md' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            <RefreshCw size={14} className={isOnline ? 'animate-spin' : ''} />
            Synchro ({offlineQueueLength})
          </button>
        )}
      </div>
    </div>
  );
}