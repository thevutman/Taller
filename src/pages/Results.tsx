import { Box, Text, Image, HStack, Button, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { usePetStore } from '../store/usePetStore'

const testimonios = [
  {
    nombre: 'María',
    texto: 'Max es el compañero perfecto para mi estilo de vida activo. Nos encanta salir a correr juntos por las mañanas.',
    imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500',
  },
  {
    nombre: 'Carlos',
    texto: 'La energía de Max es contagiosa. Siempre está listo para jugar y me mantiene activo.',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
  },
  {
    nombre: 'Ana',
    texto: 'Max es muy sociable y se lleva bien con todos. Es el alma de la fiesta en casa.',
    imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
  },
]

export default function Results() {
  const navigate = useNavigate()
  const { pet } = usePetStore()

  const handleContinue = () => {
    navigate('/')
  }

  const bgColor = useColorModeValue('#fdfffc', 'gray.800')
  const headerBg = useColorModeValue('#99d4fd', 'blue.400')
  const cardBg = useColorModeValue('#f7c639', 'yellow.400')
  const traitBg = useColorModeValue('#99d4fd', 'blue.400')
  const buttonBg = useColorModeValue('#ee4e2d', 'red.500')
  const borderColor = useColorModeValue('#90ee90', 'green.300')
  const textColor = useColorModeValue('#ee4e2d', 'red.400')
  const lightTextColor = useColorModeValue('#fdfffc', 'white')

  return (
    <Box overflowY="auto" h="100%" bg={bgColor}>
      <Box bg={headerBg} p={5} textAlign="center">
        <Text fontSize="32px" fontWeight="bold" color={textColor} mb={2}>
          ¡Perfecto!
        </Text>
        <Text fontSize="20px" color={lightTextColor}>
          Tu compañero ideal es:
        </Text>
      </Box>

      <Box
        m={5}
        bg={cardBg}
        borderRadius="15px"
        p={5}
        textAlign="center"
        borderWidth={2}
        borderColor={borderColor}
      >
        <Image
          src={pet?.image}
          w="150px"
          h="150px"
          borderRadius="75px"
          mx="auto"
          mb={4}
          borderWidth={4}
          borderColor={textColor}
        />
        <Text fontSize="28px" fontWeight="bold" color={textColor} mb={1}>
          {pet?.name}
        </Text>
        <Text fontSize="18px" color={lightTextColor} mb={4}>
          {pet?.type}
        </Text>

        <Box w="100%" mt={4}>
          <Text fontSize="20px" fontWeight="bold" color={textColor} mb={3}>
            Rasgos principales:
          </Text>
          {pet?.traits?.map((trait: string, index: number) => (
            <Box
              key={index}
              bg={traitBg}
              p={3}
              borderRadius="10px"
              mb={2}
              borderWidth={2}
              borderColor={borderColor}
            >
              <Text color={lightTextColor} fontSize="16px">
                • {trait}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box m={5}>
        <Text fontSize="24px" fontWeight="bold" color={textColor} mb={5} textAlign="center">
          Testimonios de dueños
        </Text>
        {testimonios.map((testimonio, index) => (
          <HStack
            key={index}
            bg={cardBg}
            borderRadius="15px"
            p={4}
            mb={4}
            borderWidth={2}
            borderColor={borderColor}
          >
            <Image
              src={testimonio.imagen}
              w="60px"
              h="60px"
              borderRadius="30px"
              borderWidth={2}
              borderColor={textColor}
            />
            <Box ml={4} flex={1}>
              <Text fontSize="18px" fontWeight="bold" color={textColor} mb={1}>
                {testimonio.nombre}
              </Text>
              <Text color={lightTextColor} fontSize="14px">
                {testimonio.texto}
              </Text>
            </Box>
          </HStack>
        ))}
      </Box>

      <Button
        bg={buttonBg}
        color={lightTextColor}
        p={4}
        borderRadius="10px"
        m={5}
        w="calc(100% - 40px)"
        fontSize="18px"
        fontWeight="bold"
        borderWidth={2}
        borderColor={borderColor}
        onClick={handleContinue}
      >
        Continuar
      </Button>
    </Box>
  )
} 