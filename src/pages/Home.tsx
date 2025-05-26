import { Box, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const topBg = useColorModeValue('#FDCF4A', 'yellow.400')
  const bottomBg = useColorModeValue('#8CD3FF', 'blue.300')
  const pawPrintBg = useColorModeValue('#5CB3E5', 'blue.500')
  const buttonBg = useColorModeValue('#6DD26D', 'green.400')

  return (
    <Box position="relative" h="100%" bg="white">
      {/* Fondo amarillo */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="40%"
        bg={topBg}
      />
      
      {/* Fondo azul con onda */}
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        h="70%"
        bg={bottomBg}
        borderTopLeftRadius="50%"
        borderTopRightRadius="50%"
      >
        {/* Huellas decorativas */}
        <Box
          position="absolute"
          bottom="60%"
          right="15%"
          w="25px"
          h="25px"
          borderRadius="12.5px"
          bg={pawPrintBg}
        />
        <Box
          position="absolute"
          bottom="30%"
          left="10%"
          w="25px"
          h="25px"
          borderRadius="12.5px"
          bg={pawPrintBg}
        />
        <Box
          position="absolute"
          bottom="10%"
          right="25%"
          w="25px"
          h="25px"
          borderRadius="12.5px"
          bg={pawPrintBg}
        />
        <Box
          position="absolute"
          bottom="45%"
          left="25%"
          w="25px"
          h="25px"
          borderRadius="12.5px"
          bg={pawPrintBg}
        />
      </Box>
      
      {/* Encabezado con flecha */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={5}
        pt={12}
        position="relative"
        zIndex={1}
      >
        <Text
          fontSize="20px"
          fontWeight="bold"
          color="black"
          textDecoration="underline"
        >
          INICIO
        </Text>
        <Text fontSize="24px" fontWeight="bold">
          →
        </Text>
      </Box>
      
      {/* Contenido principal */}
      <Box
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt="20%"
      >
        <Text
          fontSize="32px"
          fontWeight="bold"
          color="black"
          mb={12}
        >
          ¡BIENVENIDO!
        </Text>
        
        {/* Botones de menú */}
        <VStack spacing={5} w="100%" px={5}>
          <Button
            bg={buttonBg}
            w="80%"
            p={4}
            borderRadius="10px"
            onClick={() => navigate('/chat')}
          >
            <Text fontSize="18px" fontWeight="600" color="black">
              Chat con IA
            </Text>
          </Button>
          
          <Button
            bg={buttonBg}
            w="80%"
            p={4}
            borderRadius="10px"
            onClick={() => navigate('/simulator')}
          >
            <Text fontSize="18px" fontWeight="600" color="black">
              Probar simulador
            </Text>
          </Button>
          
          <Button
            bg={buttonBg}
            w="80%"
            p={4}
            borderRadius="10px"
            onClick={() => navigate('/professionals')}
          >
            <Text fontSize="18px" fontWeight="600" color="black">
              Hablar con profesionales
            </Text>
          </Button>
        </VStack>
      </Box>
    </Box>
  )
} 