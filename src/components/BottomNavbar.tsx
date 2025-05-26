import { Box, HStack, IconButton, useColorModeValue, Text, VStack, Image } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaCommentDots, FaUserTie } from 'react-icons/fa' // Iconos de react-icons

// Importar SVGs como URLs
import PerfilAmarilloUrl from '../../public/iconos/perfilAmarillo.svg' 
import PerfilBlancoUrl from '../../public/iconos/perfilBlanco.svg'
import SimuladorAmarilloUrl from '../../public/iconos/simulador amarillo.svg'
import SimuladorBlancoUrl from '../../public/iconos/simulador blanco.svg'

interface NavButtonProps {
  icon: React.ElementType | string; // Puede ser un componente (react-icons) o una URL (SVG)
  activeIcon?: React.ElementType | string; // Opcional, para el estado activo
  label: string;
  to: string;
  isActive: boolean;
}

const NavButton = ({ icon, activeIcon, label, to, isActive }: NavButtonProps) => {
  const navigate = useNavigate()
  const activeColor = useColorModeValue('#f7c639', 'yellow.400') // Amarillo
  const inactiveColor = useColorModeValue('white', 'gray.200') // Blanco o gris claro

  // Determinar qué icono y color usar
  const currentColor = isActive ? activeColor : inactiveColor;
  const currentIconSrc = isActive && activeIcon ? activeIcon : icon;

  // Renderizar el icono basado en su tipo
  const iconElement = typeof currentIconSrc === 'string' ? (
    <Image src={currentIconSrc} alt={`${label} icon`} boxSize="24px" filter={`invert(${currentColor === 'white' || currentColor === 'gray.200' ? 1 : 0})`} />
    // Nota: Usamos filter: invert() para cambiar el color de blanco a negro en modo claro si el color es blanco.
    // Esto asume que los SVGs están diseñados en blanco o negro para facilitar el cambio de color.
  ) : (
    <Box as={currentIconSrc} boxSize="24px" color={currentColor} />
  );


  return (
    <VStack spacing={0} flex="1">
      <IconButton
        aria-label={label}
        icon={iconElement}
        onClick={() => navigate(to)}
        variant="ghost"
        isRound
        size="lg"
      />
       <Text fontSize="xs" color={currentColor} fontWeight={isActive ? 'bold' : 'normal'}>
        {label}
      </Text>
    </VStack>
  )
}

export default function BottomNavbar() {
  const location = useLocation()

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      bg={useColorModeValue('#8CD3FF', 'blue.700')}
      p={2}
      zIndex={10}
      boxShadow="md"
    >
      <HStack justifyContent="space-around" spacing={0}>
        {/* Usamos los iconos de react-icons para Home, Chat y Profesionales */}
        <NavButton 
          icon={FaHome} 
          label="Inicio" 
          to="/Dashboard" 
          isActive={location.pathname === '/Dashboard'}
        />
        <NavButton 
          icon={FaCommentDots} 
          label="Chat" 
          to="/chat" 
          isActive={location.pathname === '/chat'}
        />
        {/* Usamos los SVGs importados como URLs para Simulador y Perfil */}
        <NavButton 
          icon={SimuladorBlancoUrl} // Usar URL del SVG blanco por defecto
          label="Simulador" 
          to="/simulator" 
          isActive={location.pathname === '/simulator'} 
          activeIcon={SimuladorAmarilloUrl} // URL del SVG amarillo para activo
        />
        <NavButton 
          icon={FaUserTie} // Icono de react-icons para Profesionales
          label="Profesionales" 
          to="/professionals" 
          isActive={location.pathname === '/professionals'}
        />
         <NavButton 
          icon={PerfilBlancoUrl} // Usar URL del SVG blanco por defecto
          label="Perfil" 
          to="/" 
          isActive={location.pathname === '/'}
           activeIcon={PerfilAmarilloUrl} // URL del SVG amarillo para activo
        />
      </HStack>
    </Box>
  )
}