import { Box, Text, Image, HStack, Button, useColorModeValue, Container, VStack, Avatar, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleContinue = () => {
    navigate('/dashboard')
  }

  const bgColor = useColorModeValue('#fdfffc', 'gray.800')
  const headerBg = useColorModeValue('#99d4fd', 'blue.400')
  const cardBg = useColorModeValue('#f7c639', 'yellow.400')
  const traitBg = useColorModeValue('#99d4fd', 'blue.400')
  const buttonBg = useColorModeValue('#ee4e2d', 'red.500')
  const textColor = useColorModeValue('#ee4e2d', 'red.400')
  const lightTextColor = useColorModeValue('#fdfffc', 'white')
  const modalBg = useColorModeValue('white', 'gray.700')

  return (
    <Box 
      minH="100vh" 
      bg={bgColor}
      display="flex"
      flexDirection="column"
      position="relative"
    >
      {/* Header */}
      <Box bg={headerBg} p={5} textAlign="center" position="relative">
        <Text fontSize="32px" fontWeight="bold" color={textColor} mb={2}>
          ¡Perfecto!
        </Text>
        <Text fontSize="20px" color={lightTextColor}>
          Tu compañero ideal es:
        </Text>
      </Box>

      <Box 
        flex="1" 
        overflowY="auto" 
        pb={32}
        position="relative"
      >
        <Container maxW="container.md" py={8}>
          <VStack spacing={8} pb={8}>
            {/* Tarjeta de mascota */}
            <Box
              bg={cardBg}
              borderRadius="20px"
              p={6}
              w="100%"
              position="relative"
              overflow="hidden"
              boxShadow="xl"
            >
              <HStack spacing={6} align="center">
                <Box
                  position="relative"
                  w="120px"
                  h="120px"
                  borderRadius="full"
                  overflow="hidden"
                  borderWidth={4}
                  borderColor="white"
                >
                  <Image
                    src={pet?.image}
                    alt={pet?.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
                <VStack align="start" spacing={2} flex={1}>
                  <Text fontSize="24px" fontWeight="bold" color={textColor}>
                    {pet?.name}
                  </Text>
                  <Text fontSize="18px" color={lightTextColor}>
                    {pet?.type}
                  </Text>
                  <Button
                    bg={buttonBg}
                    color="white"
                    size="sm"
                    onClick={onOpen}
                    _hover={{ opacity: 0.9 }}
                  >
                    Ver características
                  </Button>
                </VStack>
              </HStack>
            </Box>

            {/* Testimonios */}
            <VStack spacing={4} w="100%">
              <Text fontSize="24px" fontWeight="bold" color={textColor}>
                Lo que dicen otros dueños
              </Text>
              {testimonios.map((testimonio, index) => (
                <Box
                  key={index}
                  bg={traitBg}
                  borderRadius="15px"
                  p={4}
                  w="100%"
                >
                  <HStack spacing={4}>
                    <Avatar
                      src={testimonio.imagen}
                      name={testimonio.nombre}
                      size="md"
                    />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold" color={textColor}>
                        {testimonio.nombre}
                      </Text>
                      <Text color={lightTextColor}>
                        {testimonio.texto}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>

            {/* Botón continuar */}
            <Button
              bg={buttonBg}
              color="white"
              size="lg"
              w="100%"
              onClick={handleContinue}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              mb={8}
            >
              Continuar
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Modal de características */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader color={textColor}>Características de {pet?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>Personalidad:</Text>
                <Text>{pet?.traits?.join(', ')}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>Cuidados necesarios:</Text>
                <Text>{pet?.care}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>Recomendaciones:</Text>
                <Text>{pet?.recommendations}</Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
} 