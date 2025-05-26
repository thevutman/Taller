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
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500', // Labrador
    traits: ['Activo', 'Sociable', 'Inteligente', 'Leal'],
    personality: 'Activo',
    care: 'Baja',
    recommendations: 'Recomendado para familias con niños'
  },
  {
    name: 'Luna',
    type: 'Gato Persa',
    description: 'Gato tranquilo e independiente, ideal para espacios pequeños',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500%27', // Gato Persa
    traits: ['Tranquilo', 'Independiente', 'Elegante', 'Cariñoso'],
    personality: 'Tranquilo',
    care: 'Media',
    recommendations: 'Recomendado para apartamentos'
  },
  {
    name: 'Rocky',
    type: 'Bulldog',
    description: 'Perro equilibrado y adaptable, perfecto para departamentos',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500%27', // Bulldog
    traits: ['Equilibrado', 'Adaptable', 'Protector', 'Paciente'],
    personality: 'Equilibrado',
    care: 'Alta',
    recommendations: 'Recomendado para personas activas'
  }
],
  setPet: (pet) => set({ pet, hasPet: !!pet }),
})); 