import { create } from 'zustand';

export type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

type ToastState = {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  dismissToast: (index: number) => void;
};

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, toast],
    })),
  dismissToast: (index) =>
    set((state) => ({
      toasts: state.toasts.filter((_, i) => i !== index),
    })),
}));

export function useToast() {
  const toasts = useToastStore((state) => state.toasts);
  const addToast = useToastStore((state) => state.addToast);
  const dismissToast = useToastStore((state) => state.dismissToast);

  return {
    toasts,
    toast: addToast,
    dismiss: dismissToast,
  };
}

export const toast = useToastStore.getState().addToast; 