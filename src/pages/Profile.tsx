import { Box, Heading, Text } from '@chakra-ui/react'
import BottomNavbar from '../components/BottomNavbar';

const Profile = () => {
  return (
    <Box p={4} pb="60px">
      <Heading size="lg" mb={4}>Perfil</Heading>
      <Text>Información del perfil en desarrollo...</Text>
      <BottomNavbar />
    </Box>
  )
}

export default Profile 