import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  useColorModeValue,
  Container,
  useToast,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';
// Importar la barra de navegación
import BottomNavbar from '../components/BottomNavbar';

// Datos de profesionales
const professionals = [
  {
    id: '1',
    name: 'Centro Veterinario Happy Pets',
    specialty: 'Veterinario',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500',
    phone: '6044441299',
    address: 'Calle 45 #23-45, Medellín',
    schedule: 'Lunes a Viernes: 8:00 AM - 6:00 PM\nSábados: 9:00 AM - 2:00 PM',
    services: ['Consultas generales', 'Vacunación', 'Cirugía', 'Peluquería'],
  },
  {
    id: '2',
    name: 'Clínica Veterinaria Animal Care',
    specialty: 'Veterinario',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500',
    phone: '6044483234',
    address: 'Carrera 70 #45-23, Medellín',
    schedule: 'Lunes a Sábado: 7:00 AM - 8:00 PM\nDomingos: 9:00 AM - 1:00 PM',
    services: ['Emergencias 24/7', 'Radiología', 'Laboratorio', 'Farmacia'],
  },
  {
    id: '3',
    name: 'Veterinaria Mascotas Felices',
    specialty: 'Veterinario',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500',
    phone: '3006173843',
    address: 'Calle 30 #50-12, Medellín',
    schedule: 'Lunes a Viernes: 8:30 AM - 7:00 PM\nSábados: 9:00 AM - 3:00 PM',
    services: ['Consultas a domicilio', 'Vacunación', 'Esterilización', 'Dentista'],
  },
];

export default function Professionals() {
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('#fdfffc', 'gray.800');
  const headerBg = useColorModeValue('#f7c639', 'yellow.500');
  const cardBg = useColorModeValue('#6ec1f6', 'blue.500');
  const pawBg = useColorModeValue('#99d4fd', 'blue.300');
  const phoneButtonBg = useColorModeValue('#f7c639', 'yellow.400');
  const textColor = useColorModeValue('#222', 'white');
  const cardHoverBg = useColorModeValue('#5db0e5', 'blue.600');

  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
    toast({
      title: 'Llamando...',
      description: `Conectando con ${phone}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCardClick = (professional: any) => {
    setSelectedProfessional(professional);
    onOpen();
  };

  return (
    <Box minH="100vh" bg={bgColor} pb="60px"> {/* Add padding at the bottom */}
      {/* Header */}
      <Box
        bg={headerBg}
        borderBottomLeftRadius="40px"
        borderBottomRightRadius="40px"
        pt={8}
        pb={5}
        px={5}
        position="relative"
        mb={3}
      >
        <Text
          fontSize="28px"
          fontWeight="bold"
          color={textColor}
          fontFamily="monospace"
          mb={1}
          textShadow="1px 1px 1px white"
        >
          Profesionales
        </Text>

        {/* Huellas decorativas */}
        <Box
          position="absolute"
          top="20px"
          left="20px"
          w="30px"
          h="30px"
          bg="#e6b800"
          borderRadius="full"
          opacity={0.8}
        />
        <Box
          position="absolute"
          top="40px"
          right="30px"
          w="25px"
          h="25px"
          bg="#e6b800"
          borderRadius="full"
          opacity={0.8}
        />
        <Box
          position="absolute"
          bottom="20px"
          left="40px"
          w="35px"
          h="35px"
          bg="#e6b800"
          borderRadius="full"
          opacity={0.8}
        />
        <Box
          position="absolute"
          bottom="30px"
          right="40px"
          w="30px"
          h="30px"
          bg="#e6b800"
          borderRadius="full"
          opacity={0.8}
        />
      </Box>

      {/* Lista de profesionales */}
      <Container maxW="container.md" py={4}>
        <VStack spacing={4}>
          {professionals.map((professional) => (
            <Box
              key={professional.id}
              w="100%"
              bg={cardBg}
              borderRadius="25px"
              p={5}
              position="relative"
              overflow="hidden"
              minH="120px"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                bg: cardHoverBg,
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              onClick={() => handleCardClick(professional)}
            >
              {/* Huellas decorativas */}
              <Box
                position="absolute"
                top="10px"
                left="10px"
                w="50px"
                h="50px"
                bg={pawBg}
                borderRadius="full"
                opacity={0.4}
              />
              <Box
                position="absolute"
                bottom="10px"
                right="10px"
                w="40px"
                h="40px"
                bg={pawBg}
                borderRadius="full"
                opacity={0.4}
              />

              <HStack spacing={4} position="relative" zIndex={1}>
                <Box position="relative">
                  <Skeleton
                    isLoaded={imagesLoaded[professional.id]}
                    w="60px"
                    h="60px"
                    borderRadius="full"
                  >
                    <Image
                      src={professional.image}
                      w="60px"
                      h="60px"
                      borderRadius="full"
                      borderWidth={3}
                      borderColor="white"
                      onLoad={() => handleImageLoad(professional.id)}
                      alt={`Foto de ${professional.name}`}
                    />
                  </Skeleton>
                </Box>
                <Box flex={1}>
                  <Text
                    fontSize="17px"
                    fontWeight="bold"
                    color={textColor}
                    mb={2}
                    fontFamily="monospace"
                  >
                    {professional.name}
                  </Text>
                  <Text color="white" mb={2} fontSize="14px">
                    {professional.specialty} - {professional.address}
                  </Text>
                  <Button
                    bg={phoneButtonBg}
                    borderRadius="12px"
                    px={5}
                    py={2}
                    size="sm"
                    _hover={{ opacity: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePhoneClick(professional.phone);
                    }}
                  >
                    <Text
                      color={textColor}
                      fontWeight="bold"
                      fontSize="15px"
                      letterSpacing="1px"
                    >
                      {professional.phone}
                    </Text>
                  </Button>
                </Box>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Container>

      {/* Modal de detalles */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProfessional?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>Horario de atención:</Text>
                <Text whiteSpace="pre-line">{selectedProfessional?.schedule}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>Servicios:</Text>
                <VStack align="stretch" spacing={2}>
                  {selectedProfessional?.services.map((service: string, index: number) => (
                    <Text key={index}>• {service}</Text>
                  ))}
                </VStack>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>Dirección:</Text>
                <Text>{selectedProfessional?.address}</Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Agregar la barra de navegación al final del componente */}
      <BottomNavbar />
    </Box>
  );
} 