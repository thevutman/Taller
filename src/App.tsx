import { Box, VStack } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Chat from './pages/Chat'
import Professionals from './pages/Professionals'
import Profile from './pages/Profile'
import Simulator from './pages/Simulator'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      p={4}
    >
      <Box
        w="375px"
        h="812px"
        bg="white"
        borderRadius="40px"
        overflow="hidden"
        position="relative"
        boxShadow="2xl"
        border="8px solid"
        borderColor="gray.800"
      >
        <VStack h="100%" gap={0}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/results" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/simulator" element={<Simulator />} />
          </Routes>
        </VStack>
      </Box>
    </Box>
  )
}

export default App
