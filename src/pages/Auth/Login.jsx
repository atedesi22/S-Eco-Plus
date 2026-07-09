import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion avec :", { email, password });
    // Prochaine étape : Liaison avec authService.js
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] font-sans">
      
      {/* Section Gauche : Visuel de marque (Masqué sur mobile, visible sur tablette/PC) */}
      <div className="hidden md:flex md:w-1/2 bg-[#0F2942] p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Formes géométriques décoratives rappelant le flyer */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#20A376] opacity-10 rounded-full blur-2xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4BE2C] opacity-10 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>

        <div className="flex items-center gap-2 z-10">
          <span className="text-2xl font-black tracking-wider text-[#F4BE2C]">S ECO PLUS</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#20A376] text-white font-medium">Finance</span>
        </div>

        <div className="z-10 max-w-md">
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Votre outil de gestion de microfinance intelligent.
          </h1>
          <p className="text-slate-300">
            Suivi des budgets, tontines numériques, micro-crédits et conformité KYC au même endroit.
          </p>
        </div>

        <div className="text-xs text-slate-400 z-10">
          &copy; {new Date().getFullYear()} S Eco Plus. Tous droits réservés.
        </div>
      </div>

      {/* Section Droite : Le Formulaire (Mobile-first par excellence) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* En-tête mobile */}
          <div className="text-center md:text-left">
            <div className="flex md:hidden justify-center items-center gap-2 mb-4">
              <span className="text-2xl font-black text-[#0F2942]">S ECO PLUS</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#20A376] text-white font-medium">Finance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2942] tracking-tight">
              Connexion à l'espace professionnel
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Veuillez renseigner vos identifiants pour accéder à votre tableau de bord.
            </p>
          </div>

          {/* Formulaire */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1E293B]">
                  Adresse e-mail professionnelle
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20A376] focus:bg-white transition-all text-sm"
                  placeholder="nom@s-ecoplus.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-semibold text-[#1E293B]">
                    Mot de passe
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#20A376] hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20A376] focus:bg-white transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Bouton de Soumission */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#20A376] hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20A376] transform active:scale-[0.98] transition-all text-sm"
              >
                Se connecter en toute sécurité
              </button>
            </div>
          </form>

          {/* Note de sécurité */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <svg className="w-4 h-4 text-[#20A376]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m3.5-9a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM16 12v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5a3 3 0 013-3h6a3 3 0 013 3z"/>
            </svg>
            Chiffrement SSL de bout en bout activé
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;