import { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Progress,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBed } from 'react-icons/fa';
import { usePetStore } from '../store/usePetStore';
// Importar la barra de navegación
import BottomNavbar from '../components/BottomNavbar';

// SVGs como strings
// const huellaSimulador1 = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#e6b800"/>
// <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="#e6b800"/>
// </svg>`;

// const huellaSimulador2 = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#e6b800"/>
// <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="#e6b800"/>
// </svg>`;

export default function Simulator() {
  const { pet } = usePetStore();
  const [happiness, setHappiness] = useState(84);
  const [hunger, setHunger] = useState(84);
  const [energy, setEnergy] = useState(84);

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(prev => Math.max(0, prev - 5));
      setEnergy(prev => Math.max(0, prev - 3));
      setHappiness(prev => Math.max(0, prev - 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFeed = () => {
    setHunger(prev => Math.min(100, prev + 30));
    setHappiness(prev => Math.min(100, prev + 10));
  };

  const handlePlay = () => {
    setEnergy(prev => Math.max(0, prev - 20));
    setHappiness(prev => Math.min(100, prev + 30));
  };

  const handleRest = () => {
    setEnergy(prev => Math.min(100, prev + 40));
    setHappiness(prev => Math.min(100, prev + 10));
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('#FF7B6B', 'pink.600');
  const statBg = useColorModeValue('#7ADE77', 'green.500');
  const progressBg = useColorModeValue('#FF7B6B', 'pink.500');
  const buttonBg = useColorModeValue('#FDCF4A', 'yellow.400');

  return (
    <Box bg={bgColor} h="100%" pb="60px"> {/* Add padding at the bottom */}
      {/* Header con fondo curvo */}
      <Box
        h="180px"
        bg={headerBg}
        borderBottomLeftRadius="100px"
        borderBottomRightRadius="100px"
        position="relative"
        pt="40px"
        px="20px"
      >
        <Text
          fontSize="22px"
          fontWeight="bold"
          color="black"
          textDecoration="underline"
        >
          SIMULADOR
        </Text>

        {/* Avatar de la mascota */}
        <Box
          position="absolute"
          bottom="-40px"
          left="50%"
          transform="translateX(-50%)"
          w="80px"
          h="80px"
          bg={headerBg}
          borderRadius="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="md"
        >
          <Image
            src={pet?.image || 'https://placekitten.com/200/200'}
            w="70px"
            h="70px"
            borderRadius="35px"
          />
        </Box>
      </Box>

      {/* Pregunta de estado */}
      <Text
        fontSize="24px"
        fontWeight="bold"
        color="gray.700"
        textAlign="center"
        mt="50px"
        mb="20px"
      >
        ¿Cómo está Rocky?
      </Text>

      {/* Contenedor de estadísticas */}
      <VStack spacing={3} px="20px">
        <Box
          bg={statBg}
          borderRadius="15px"
          p="15px"
          w="130%"
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" w="25%">Felicidad</Text>
          <Progress
            value={happiness}
            flex="1"
            mx="10px"
            bg={progressBg}
            borderRadius="10px"
          />
          <Text fontWeight="bold" w="20%" textAlign="right">
            {happiness}%
          </Text>
        </Box>

        <Box
          bg={statBg}
          borderRadius="15px"
          p="15px"
          w="130%"
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" w="25%">Hambre</Text>
          <Progress
            value={hunger}
            flex="1"
            mx="10px"
            bg={progressBg}
            borderRadius="10px"
          />
          <Text fontWeight="bold" w="20%" textAlign="right">
            {hunger}%
          </Text>
        </Box>

        <Box
          bg={statBg}
          borderRadius="15px"
          p="15px"
          w="130%"
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" w="25%">Energía</Text>
          <Progress
            value={energy}
            flex="1"
            mx="10px"
            bg={progressBg}
            borderRadius="10px"
          />
          <Text fontWeight="bold" w="20%" textAlign="right">
            {energy}%
          </Text>
        </Box>
      </VStack>

      {/* Título de necesidades */}
      <Text
        fontSize="22px"
        fontWeight="bold"
        color="gray.700"
        mt="20px"
        mb="15px"
        px="20px"
      >
        Necesidades
      </Text>

      {/* Botones de acción */}
      <HStack spacing={4} justify="space-around" px="20px" mt="10px">
        <VStack>
          <Box
            as="button"
            w="70px"
            h="70px"
            borderRadius="35px"
            bg={buttonBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleFeed}
          >
            <Image
              src="/iconos/comidaPerro.svg"
              w="40px"
              h="40px"
            />
          </Box>
          <Text>Alimentar</Text>
        </VStack>

        <VStack>
          <Box
            as="button"
            w="70px"
            h="70px"
            borderRadius="35px"
            bg={buttonBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handlePlay}
          >
            <Image
              src="/iconos/pelota.svg"
              w="800px"
              h="40px"
            />
          </Box>
          <Text>Jugar</Text>
        </VStack>

        <VStack>
          <Box
            as="button"
            w="70px"
            h="70px"
            borderRadius="35px"
            bg={buttonBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleRest}
          >
            <Icon as={FaBed} w="40px" h="40px" color="white" /> {/* Use FaBed icon */}
          </Box>
          <Text>Descansar</Text>
        </VStack>
      </HStack>

      {/* Agregar la barra de navegación al final del componente */}
      <BottomNavbar />
    </Box>
  );
} 