import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Image,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { usePetStore } from '../store/usePetStore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaPaperPlane } from 'react-icons/fa';
// Importar la barra de navegación
import BottomNavbar from '../components/BottomNavbar';

// Configuración de Gemini
const GEMINI_API_KEY = "AIzaSyDZDPOPNhaTX6is5TN40vI2FTj02ShiNgc";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const getBotResponse = async (message: string, pet: any): Promise<string> => {
  try {
    if (!GEMINI_API_KEY) {
      console.error('No hay API key configurada');
      return 'Error: No hay API key configurada para Gemini';
    }

    if (!pet) {
      console.error('No hay información de mascota disponible');
      return 'Lo siento, no tengo información de mascota disponible en este momento.';
    }

    const prompt = `Eres un asistente virtual de mascotas. 
    Información de la mascota:
    - Nombre: ${pet.name || 'No especificado'}
    - Tipo: ${pet.type || 'No especificado'}
    - Características: ${pet.traits?.join(', ') || 'No especificadas'}
    
    Responde a la siguiente pregunta de manera amigable y útil: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Error al obtener respuesta de Gemini:', error);
    return `Error: ${error?.message || 'Error desconocido'}`;
  }
};

export default function Chat() {
  const { pet } = usePetStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `¡Hola! Soy ${pet?.name}, tu asistente virtual. ¿En qué puedo ayudarte?`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('#7ADE77', 'green.500');
  const messageBg = useColorModeValue('#FDCF4A', 'yellow.400');
  const inputBg = useColorModeValue('#f5f5f5', 'gray.700');
  const sendButtonBg = useColorModeValue('#3CB4E7', 'blue.500');
  const textColor = useColorModeValue('black', 'white');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await getBotResponse(inputText, pet);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box h="100%" bg={bgColor} display="flex" flexDirection="column" pb="60px">
      {/* Header */}
      <Box
        bg={headerBg}
        p={5}
        borderBottomLeftRadius="30px"
        borderBottomRightRadius="30px"
        position="relative"
      >
        <Text
          fontSize="22px"
          fontWeight="bold"
          color={textColor}
          position="absolute"
          top="15px"
          left="15px"
          textDecoration="underline"
        >
          CHAT
        </Text>
        
        <VStack spacing={2} align="center" mt={8}>
          <Text fontSize="24px" fontWeight="bold" color="#553800">
            {pet?.name || 'Rocky'}
          </Text>
          <Text fontSize="16px" color={textColor}>
            Tu asistente virtual
          </Text>
          <Box
            w="80px"
            h="80px"
            borderRadius="40px"
            bg={headerBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            borderWidth={3}
            borderColor={headerBg}
            position="relative"
            zIndex={5}
          >
            <Image
              src={pet?.image || 'https://placekitten.com/200/200'}
              w="70px"
              h="70px"
              borderRadius="35px"
              bg="#FDCF4A"
            />
          </Box>
        </VStack>
      </Box>

      {/* Messages */}
      <Box
        flex={1}
        overflowY="auto"
        p={4}
        display="flex"
        zIndex={40}
        flexDirection="column"
        gap={4}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            maxW="75%"
          >
            <Box
              bg={messageBg}
              borderRadius="18px"
              p={3}
              pb={2}
            >
              <Text fontSize="16px" color={textColor}>
                {message.text}
              </Text>
              {message.sender === 'bot' && (
                <Text fontSize="12px" color="#555" textAlign="right" mt={1}>
                  {message.timestamp.toLocaleTimeString()}
                </Text>
              )}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
        <BottomNavbar />
      </Box>

      {/* Input */}
      <HStack
        p={3}
        borderTopWidth={1}
        borderTopColor="gray.200"
        spacing={3}
      >
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu mensaje..."
          bg={inputBg}
          borderRadius="24px"
          px={4}
          py={2}
          fontSize="16px"
          zIndex={50}
          disabled={isLoading}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          bg={sendButtonBg}
          color="white"
          w="48px"
          h="48px"
          borderRadius="24px"
          onClick={handleSend}
          isLoading={isLoading}
          disabled={!inputText.trim() || isLoading}
        >
          <Icon as={FaPaperPlane} />
        </Button>
      </HStack>

      {/* Huellas decorativas */}
      <Image 
        src="/huellas/chat/huella.chat1.svg" 
        alt="huella decorativa"
        position="absolute"
        bottom="10%"
        left="5%"
        w="100px"
        opacity={0.5}
        zIndex={0}
      />
       <Image 
        src="/huellas/chat/huella.chat2.svg" 
        alt="huella decorativa"
        position="absolute"
        bottom="35%"
        right="10%"
        w="80px"
        opacity={0.5}
        zIndex={0}
      />
        <Image 
        src="/huellas/chat/huella.chat1.svg" 
        alt="huella decorativa"
        position="absolute"
        top="5%"
        right="5%"
        w="70px"
        opacity={0.5}
        zIndex={0}
      />
         <Image 
        src="/huellas/chat/huella.chat2.svg" 
        alt="huella decorativa"
        position="absolute"
        top="20%"
        left="15%"
        w="60px"
        opacity={0.5}
        zIndex={0}
      />

    </Box>
  );
} 