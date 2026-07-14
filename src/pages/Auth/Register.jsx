import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, Lock, Building, ShieldCheck, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'Client', // Par défaut
    agence: 'Kribi Centre',
    securityCode: '' // Code requis si on tente de s'inscrire comme personnel
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulation de validation de sécurité RBAC à l'inscription
    if (formData.role !== 'Client' && formData.securityCode !== 'ECO2026') {
      setError("Le code d'autorisation agence est invalide. Seuls les clients peuvent s'inscrire librement.");
      return;
    }

    setSuccess(true);
    
    // On simule la création de compte et on redirige vers le login après 2 secondes
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#20A376] rounded-xl font-black text-[#0F2942]y text-xl shadow-lg shadow-emerald-500/10 mb-4">
          S
        </div>
        <h2 className="text-2xl font-black text-[#0F2942]y tracking-tight">
          Créer un compte S ECO <span className="text-[#20A376]">PLUS</span>
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Rejoignez notre réseau de tontines et d'épargne sécurisée
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-6 shadow-sm border border-slate-100 rounded-2xl space-y-6">
          
          {success ? (
            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold text-center space-y-2">
              <p>🎉 Inscription enregistrée avec succès !</p>
              <p className="font-normal text-slate-500 text-[11px]">Redirection vers la page de connexion...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Nom Complet */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Paul Emmanuel"
                    className="w-full text-sm pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20A376]"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Numéro de téléphone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ex: 690000000"
                    className="w-full text-sm pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20A376]"
                  />
                </div>
              </div>

              {/* Agence */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Agence de rattachement</label>
                <div className="relative">
                  <Building size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <select
                    name="agence"
                    value={formData.agence}
                    onChange={handleChange}
                    className="w-full text-sm pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none appearance-none"
                  >
                    <option value="Kribi Centre">Kribi Centre</option>
                    <option value="Douala Akwa">Douala Akwa</option>
                    <option value="Yaoundé Centrale">Yaoundé Centrale</option>
                  </select>
                </div>
              </div>

              {/* Choix du Rôle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Type de profil</label>
                <div className="relative">
                  <ShieldCheck size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full text-sm pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none appearance-none font-medium"
                  >
                    <option value="Client">Client (Standard)</option>
                    <option value="collectrice">collectrice (Terrain)</option>
                    <option value="commercial">commercial</option>
                  </select>
                </div>
              </div>

              {/* Code de sécurité conditionnel si ce n'est pas un Client */}
              {formData.role !== 'Client' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 space-y-2 animate-fadeIn">
                  <label className="block text-[11px] font-bold text-amber-800">Code d'autorisation personnel agence</label>
                  <input
                    type="text"
                    name="securityCode"
                    required
                    value={formData.securityCode}
                    onChange={handleChange}
                    placeholder="Entrez le code (Ex: ECO2026)"
                    className="w-full text-sm p-2.5 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              )}

              {/* Mot de passe */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full text-sm pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20A376]"
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0F2942]y hover:bg-slate-800 py-3.5 rounded-xl shadow-md transition-all mt-2"
              >
                Créer mon compte <ArrowRight size={14} />
              </button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Déjà membre ?{' '}
              <Link to="/login" className="font-bold text-[#20A376] hover:underline">
                Connectez-vous ici
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;