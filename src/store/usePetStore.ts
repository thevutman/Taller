import { create } from 'zustand';

interface Pet {
  name: string;
  type: string;
  description: string;
  image: string;
  traits: string[];
}

interface PetStore {
  hasPet: boolean;
  pet: Pet | null;
  petProfiles: Pet[];
  setPet: (pet: Pet) => void;
}

export const usePetStore = create<PetStore>((set) => ({
  hasPet: false,
  pet: null,
  petProfiles: [
    {
      name: 'Max',
      type: 'Labrador',
      description: 'Perro activo y sociable, perfecto para familias',
      image: '/assets/max.jpg',
      traits: ['Activo', 'Sociable', 'Inteligente', 'Leal']
    },
    {
      name: 'Luna',
      type: 'Gato Persa',
      description: 'Gato tranquilo e independiente, ideal para espacios pequeños',
      image: '/assets/luna.jpg',
      traits: ['Tranquilo', 'Independiente', 'Elegante', 'Cariñoso']
    },
    {
      name: 'Rocky',
      type: 'Bulldog',
      description: 'Perro equilibrado y adaptable, perfecto para departamentos',
      image: '/assets/rocky.jpg',
      traits: ['Equilibrado', 'Adaptable', 'Protector', 'Paciente']
    }
  ],
  setPet: (pet) => set({ pet, hasPet: true }),
})); 