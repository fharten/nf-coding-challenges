import { create } from 'zustand';
import { Book } from '../components/BookList';

interface SearchState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

interface CartState {
  cartItems: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (index: number) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
}));

const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (book: Book) =>
    set((state) => ({
      cartItems: [...state.cartItems, book],
    })),
  removeFromCart: (index: number) =>
    set((state) => ({
      cartItems: state.cartItems.filter((_, i) => i !== index),
    })),
}));

export { useSearchStore, useCartStore };
