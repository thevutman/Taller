import { useState } from 'react'
import {
  Box,
  Text,
  Button,
  VStack,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { usePetStore } from '../store/usePetStore'

interface Question {
  id: number
  text: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    text: '¿Qué tipo de energía prefieres?',
    options: ['Alta energía y actividad', 'Moderada y equilibrada', 'Tranquila y relajada'],
  },
  {
    id: 2,
    text: '¿Cuánto tiempo puedes dedicar al cuidado diario?',
    options: ['Mucho tiempo', 'Tiempo moderado', 'Poco tiempo'],
  },
  {
    id: 3,
    text: '¿Qué tamaño de mascota prefieres?',
    options: ['Pequeño', 'Mediano', 'Grande'],
  },
  {
    id: 4,
    text: '¿Qué tipo de personalidad tienes?',
    options: ['Sociable y extrovertido', 'Equilibrado', 'Reservoso e introvertido'],
  },
  {
    id: 5,
    text: '¿Qué tipo de espacio tienes disponible?',
    options: ['Casa con jardín', 'Departamento espacioso', 'Espacio pequeño'],
  },
]

export default function Survey() {
  const navigate = useNavigate()
  const { setPet, petProfiles } = usePetStore()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const bgColor = useColorModeValue('#fdfffc', 'gray.800')
  const progressBg = useColorModeValue('#99d4fd', 'blue.500')
  const progressFill = useColorModeValue('#90ee90', 'green.400')
  const questionBg = useColorModeValue('#f7c639', 'yellow.500')
  const questionText = useColorModeValue('#ee4e2d', 'orange.300')
  const optionBg = useColorModeValue('#99d4fd', 'blue.500')
  const optionText = useColorModeValue('#fdfffc', 'white')
  const optionBorder = useColorModeValue('#90ee90', 'green.400')

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const selectedPet = findBestMatch(newAnswers)
      setPet(selectedPet)
      navigate('/results')
    }
  }

  const findBestMatch = (answers: string[]) => {
    const energyPreference = answers[0]
    const timeAvailable = answers[1]
    const sizePreference = answers[2]
    const personality = answers[3]
    const spaceAvailable = answers[4]

    const scores = petProfiles.map((pet) => {
      let score = 0

      if (pet.name === 'Max') {
        if (energyPreference.includes('Alta energía')) score += 2
        if (timeAvailable.includes('Mucho tiempo')) score += 2
        if (sizePreference.includes('Grande')) score += 2
        if (personality.includes('Sociable')) score += 2
        if (spaceAvailable.includes('Casa con jardín')) score += 2
      } else if (pet.name === 'Luna') {
        if (energyPreference.includes('Tranquila')) score += 2
        if (timeAvailable.includes('Poco tiempo')) score += 2
        if (sizePreference.includes('Pequeño')) score += 2
        if (personality.includes('Reservado')) score += 2
        if (spaceAvailable.includes('Espacio pequeño')) score += 2
      } else if (pet.name === 'Rocky') {
        if (energyPreference.includes('Moderada')) score += 2
        if (timeAvailable.includes('Tiempo moderado')) score += 2
        if (sizePreference.includes('Mediano')) score += 2
        if (personality.includes('Equilibrado')) score += 2
        if (spaceAvailable.includes('Departamento')) score += 2
      }

      return { pet, score }
    })

    scores.sort((a, b) => b.score - a.score)
    return scores[0].pet
  }

  return (
    <Box h="100%" bg={bgColor} overflowY="auto">
      <Box p={5} bg={progressBg}>
        <Text color="white" mb={2}>
          Pregunta {currentQuestion + 1} de {questions.length}
        </Text>
        <Progress
          value={((currentQuestion + 1) / questions.length) * 100}
          size="sm"
          colorScheme="green"
          bg="white"
          borderRadius="full"
        />
      </Box>

      <Box
        m={5}
        p={5}
        bg={questionBg}
        borderRadius="lg"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={questionText}
          textAlign="center"
        >
          {questions[currentQuestion].text}
        </Text>
      </Box>

      <VStack spacing={4} p={5}>
        {questions[currentQuestion].options.map((option, index) => (
          <Button
            key={index}
            w="100%"
            bg={optionBg}
            color={optionText}
            border="2px solid"
            borderColor={optionBorder}
            size="lg"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </VStack>
    </Box>
  )
} 