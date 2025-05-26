import { create } from 'zustand';

interface Pet {
  name: string;
  type: string;
  description: string;
  image: string;
  traits: string[];
  personality: string;
  care: string;
  recommendations: string;
}

interface PetStore {
  hasPet: boolean;
  pet: Pet | null;
  petProfiles: Pet[];
  setPet: (pet: Pet | null) => void;
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
      traits: ['Activo', 'Sociable', 'Inteligente', 'Leal'],
      personality: 'Activo',
      care: 'Baja',
      recommendations: 'Recomendado para familias con niños'
    },
    {
      name: 'Luna',
      type: 'Gato Persa',
      description: 'Gato tranquilo e independiente, ideal para espacios pequeños',
      image: '/assets/luna.jpg',
      traits: ['Tranquilo', 'Independiente', 'Elegante', 'Cariñoso'],
      personality: 'Tranquilo',
      care: 'Media',
      recommendations: 'Recomendado para apartamentos'
    },
    {
      name: 'Rocky',
      type: 'Bulldog',
      description: 'Perro equilibrado y adaptable, perfecto para departamentos',
      image: '/assets/rocky.jpg',
      traits: ['Equilibrado', 'Adaptable', 'Protector', 'Paciente'],
      personality: 'Equilibrado',
      care: 'Alta',
      recommendations: 'Recomendado para personas activas'
    }
  ],
  setPet: (pet) => set({ pet, hasPet: !!pet }),
})); 