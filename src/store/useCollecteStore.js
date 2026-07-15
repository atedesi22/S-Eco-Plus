import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCollecteStore = create(
  persist(
    (set, get) => ({
      // --- ÉTAT ---
      selectedClient: null,
      montantSaisi: '',
      transactionType: 'depot', // 'depot' ou 'retrait'
      offlineQueue: [], // File d'attente des transactions hors-ligne
      isLoading: false,
      error: null,

      // --- ACTIONS ---
      setSelectedClient: (client) => set({ selectedClient: client, error: null }),
      
      setMontantSaisi: (montant) => set({ montantSaisi: montant }),
      
      setTransactionType: (type) => set({ transactionType: type }),

      clearSession: () => set({ selectedClient: null, montantSaisi: '', error: null }),

      // Ajouter une transaction à la file d'attente hors-ligne (en cas de coupure réseau)
      addToOfflineQueue: (transaction) => {
        const currentQueue = get().offlineQueue;
        const newTransaction = {
          ...transaction,
          id: `offline_${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        set({ offlineQueue: [...currentQueue, newTransaction] });
      },

      // Supprimer une transaction de la file d'attente après synchronisation réussie
      removeFromQueue: (id) => {
        const filteredQueue = get().offlineQueue.filter((tx) => tx.id !== id);
        set({ offlineQueue: filteredQueue });
      },

      clearQueue: () => set({ offlineQueue: [] }),
    }),
    {
      name: 'seco-collecte-storage', // Clé de stockage persistante
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ offlineQueue: state.offlineQueue }), // On ne persiste que la queue hors-ligne
    }
  )
);