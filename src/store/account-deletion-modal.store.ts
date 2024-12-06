import { create } from "zustand";

type AccountDeletionModalStore = {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
};

export const useAccountDeletionModalStore = create<AccountDeletionModalStore>(
  (set) => ({
    isModalOpen: false,
    onModalOpen: () => set({ isModalOpen: true }),
    onModalClose: () => set({ isModalOpen: false }),
  })
);
