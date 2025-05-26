export interface Pet {
  name: string
  type: string
  description: string
  image: string
}

export interface Question {
  id: number
  text: string
  options: string[]
}

export interface PetScore {
  pet: Pet
  score: number
} 