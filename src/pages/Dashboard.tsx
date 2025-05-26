import { Box, Text, Button, VStack, useColorModeValue, Container, Image, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { usePetStore } from '../store/usePetStore'

export default function Dashboard() {
  const navigate = useNavigate()
  const { pet } = usePetStore()

  const topBg = useColorModeValue('#FDCF4A', 'yellow.400')
  const bottomBg = useColorModeValue('#8CD3FF', 'blue.300')
  const buttonBg = useColorModeValue('#6DD26D', 'green.400')
  const textColor = useColorModeValue('black', 'white')
  const titleColor = useColorModeValue('#ee4e2d', 'red.400');
  const subtitleColor = useColorModeValue('#2d3748', 'gray.200');

  return (
    <Box 
      minH="100vh" 
      w="100%"
      bg={bottomBg} 
      overflow="hidden"
      px={0}
    >
      {/* Fondo amarillo con onda */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="50%"
        bg={topBg}
        borderBottomLeftRadius="50%"
        borderBottomRightRadius="50%"
      />
      
      {/* Contenido principal */}
      <Container maxW="container.md" position="relative" zIndex={1} pt={8} px={0}>
        {/* Encabezado */}
        <HStack justifyContent="space-between" alignItems="center" mb={8} px={5}>
          <Text
            fontSize="20px"
            fontWeight="bold"
            color={textColor}
          >
            INICIO
          </Text>
        </HStack>

        <VStack spacing={6} align="center" textAlign="center" px={5} zIndex={100}>
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color={titleColor}
          >
            ¡Hola de nuevo!
          </Text>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            color={subtitleColor}
          >
            ¿Qué deseas hacer?
          </Text>

          {pet && (
            <VStack spacing={4} mt={4}>
              <Box
                position="relative"
                w="120px"
                h="120px"
                borderRadius="full"
                overflow="hidden"
                borderWidth={4}
                borderColor="white"
                boxShadow="xl"
              >
                <Image
                  src={pet.image}
                  alt={pet.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
              <Text fontSize="20px" fontWeight="bold" color={textColor}>
                {pet.name}
              </Text>
            </VStack>
          )}

          {/* Botones de menú */}
          <VStack spacing={5} w="100%" mt={10}>
            <Button
              bg={buttonBg}
              color={textColor}
              w="100%"
              p={6}
              borderRadius="15px"
              onClick={() => navigate('/chat')}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
            >
              <Text fontSize="18px" fontWeight="600">
                Chat con IA
              </Text>
            </Button>
            
            <Button
              bg={buttonBg}
              color={textColor}
              w="100%"
              p={6}
              borderRadius="15px"
              onClick={() => navigate('/simulator')}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
            >
              <Text fontSize="18px" fontWeight="600">
                Probar simulador
              </Text>
            </Button>
            
            <Button
              bg={buttonBg}
              color={textColor}
              w="100%"
              p={6}
              borderRadius="15px"
              onClick={() => navigate('/professionals')}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
            >
              <Text fontSize="18px" fontWeight="600">
                Hablar con profesionales
              </Text>
            </Button>
          </VStack>
        </VStack>
      </Container>

      {/* Huellas decorativas */}
      <Image 
        src="../../public/huellas/inicio/huella.inicio1.svg" 
        alt="huella decorativa"
        position="absolute"
        bottom="5%"
        left="5%"
        w="100px"
        opacity={0.5}
        zIndex={0}
      />
       <Image 
        src="../../public/huellas/inicio/huella.inicio2.svg" 
        alt="huella decorativa"
        position="absolute"
        bottom="15%"
        right="10%"
        w="80px"
        opacity={0.5}
        zIndex={0}
      />
        <Image 
        src="../../public/huellas/inicio/huella.inicio1.svg" 
        alt="huella decorativa"
        position="absolute"
        top="5%"
        right="5%"
        w="70px"
        opacity={0.5}
        zIndex={0}
      />
         <Image 
        src="../../public/huellas/inicio/huella.inicio3.svg" 
        alt="huella decorativa"
        position="absolute"
        top="20%"
        left="15%"
        w="60px"
        opacity={0.5}
        zIndex={0}
      />
    </Box>
  )
} 