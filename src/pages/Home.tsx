import { Box, Text, Button, VStack, useColorModeValue, Image, Container, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { usePetStore } from '../store/usePetStore'

export default function Home() {
  const navigate = useNavigate()
  const { hasPet, pet } = usePetStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue('#fdfffc', 'gray.800')
  const titleColor = useColorModeValue('#ee4e2d', 'red.400')
  const subtitleColor = useColorModeValue('#99d4fd', 'blue.300')
  const buttonBg = useColorModeValue('#f7c639', 'yellow.400')
  const buttonBorder = useColorModeValue('#90ee90', 'green.300')
  const buttonText = useColorModeValue('#ee4e2d', 'red.400')
  const modalBg = useColorModeValue('white', 'gray.700')

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={5}
      position="relative"
      overflow="hidden"
    >
      {/* Elementos decorativos */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        w="100px"
        h="100px"
        bg={subtitleColor}
        borderRadius="full"
        opacity={0.2}
      />
      <Box
        position="absolute"
        bottom="20%"
        right="15%"
        w="150px"
        h="150px"
        bg={titleColor}
        borderRadius="full"
        opacity={0.1}
      />

      <Container maxW="container.md" position="relative" zIndex={1}>
        <VStack spacing={8} align="center">
          <Text
            fontSize={{ base: "28px", md: "36px" }}
            fontWeight="bold"
            color={titleColor}
            textAlign="center"
            textShadow="2px 2px 4px rgba(0,0,0,0.1)"
          >
            ¡Bienvenido a PetMatch!
          </Text>
          
          <Text
            fontSize={{ base: "16px", md: "20px" }}
            color={subtitleColor}
            textAlign="center"
            maxW="600px"
          >
            Encuentra a tu compañero perfecto y descubre cómo hacer que tu vida sea más feliz
          </Text>

          {hasPet ? (
            <VStack spacing={6} align="center" w="100%">
              <Box
                position="relative"
                w="200px"
                h="200px"
                borderRadius="full"
                overflow="hidden"
                borderWidth={4}
                borderColor={buttonBorder}
                boxShadow="xl"
              >
                <Image
                  src={pet?.image || 'https://placekitten.com/200/200'}
                  alt={pet?.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
              
              <VStack spacing={2}>
                <Text
                  fontSize="24px"
                  fontWeight="bold"
                  color={titleColor}
                >
                  Tu mascota ideal es: {pet?.name}
                </Text>
                <Text
                  fontSize="18px"
                  color={subtitleColor}
                >
                  {pet?.type}
                </Text>
              </VStack>

              <Button
                bg={buttonBg}
                color={buttonText}
                p={6}
                borderRadius="15px"
                borderWidth={2}
                borderColor={buttonBorder}
                fontSize="18px"
                fontWeight="bold"
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                }}
                onClick={onOpen}
              >
                Ver detalles
              </Button>
            </VStack>
          ) : (
            <Button
              bg={buttonBg}
              color={buttonText}
              p={6}
              borderRadius="15px"
              borderWidth={2}
              borderColor={buttonBorder}
              fontSize="18px"
              fontWeight="bold"
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              onClick={() => navigate('/survey')}
            >
              Comenzar encuesta
            </Button>
          )}
        </VStack>
      </Container>

      {/* Modal de detalles */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader color={titleColor}>Detalles de {pet?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>Características:</Text>
                <Text>{pet?.traits?.join(', ')}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>Personalidad:</Text>
                <Text>{pet?.personality}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>Cuidados necesarios:</Text>
                <Text>{pet?.care}</Text>
              </Box>
              <Button
                bg={buttonBg}
                color={buttonText}
                onClick={() => {
                  onClose();
                  navigate('/dashboard');
                }}
              >
                Ir al Dashboard
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
} 