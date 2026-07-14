import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  // Simulation fluide du chargement des modules S Eco Plus
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 42); // ~2 secondes au total

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 font-sans overflow-hidden">
      
      {/* Effet d'arrière-plan : Halos lumineux Fintech */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-slate-900/50 rounded-full blur-[40px] pointer-events-none" />

      {/* ZONE D'ANIMATION CENTRALE */}
      <div className="relative flex flex-col items-center justify-center w-40 h-40">
        
        {/* Le Réceptacle / Le Compte Sécurisé (Le "Plus" Épargne) */}
        <div className="absolute bottom-6 w-16 h-2 bg-slate-800 rounded-full border border-slate-700/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          {/* Ligne laser verte scintillante indiquant le dépôt validé */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
        </div>

        {/* La Pièce de Monnaie en Dépôt (Animation de chute et de réapparition fluide) */}
        <div className="absolute top-4 w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 p-[2px] shadow-[0_0_20px_rgba(52,211,153,0.4)] animate-coin-deposit flex items-center justify-center">
          {/* Design interne de la pièce avec le "S" de S Eco Plus */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center border border-emerald-300/30">
            <span className="text-white font-black text-sm tracking-tighter select-none">$</span>
          </div>
        </div>

        {/* Ondes de choc de Prospérité/Sécurité lors de l'impact du dépôt */}
        <div className="absolute bottom-6 w-12 h-12 border-2 border-emerald-500/30 rounded-full animate-ping-slow opacity-0" style={{ animationDelay: '1s' }} />
      </div>

      {/* TEXTES ET JAUGE DE PROGRESSION */}
      <div className="mt-4 flex flex-col items-center space-y-3 z-10">
        <div className="text-center">
          <h2 className="text-white text-sm font-black uppercase tracking-widest flex items-center gap-1.5 justify-center">
            S ECO <span className="text-emerald-400">PLUS</span>
          </h2>
          <p className="text-[10px] text-slate-400 tracking-wide font-medium mt-0.5 uppercase">
            Sécurisation de vos avoirs...
          </p>
        </div>

        {/* Barre de chargement type coffre-fort numérique */}
        <div className="w-40 h-[3px] bg-slate-800 rounded-full overflow-hidden border border-slate-900">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75 ease-out shadow-[0_0_8px_#10b981]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pourcentage digital */}
        <span className="text-slate-500 font-mono text-[10px] tracking-widest">
          {progress.toString().padStart(3, '0')}%
        </span>
      </div>

    </div>
  );
};

export default Preloader;