import { create } from "zustand";

type TwoFactorModalStore = {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
};

export const useTwoFactorModalStore = create<TwoFactorModalStore>((set) => ({
  isModalOpen: false,
  onModalOpen: () => set({ isModalOpen: true }),
  onModalClose: () => set({ isModalOpen: false }),
}));
