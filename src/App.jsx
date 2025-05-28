import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CandidateCreatePage from './pages/CandidateCreatePage'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import CandidateListPage from './pages/CandidateListPage'
import CandidateDetailPage from './pages/CandidateDetailPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Box minH="100vh" bg="gray.50">
            <Navbar />
            <Box as="main" py={6}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <CandidateListPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/candidates"
                  element={
                    <ProtectedRoute>
                      <CandidateListPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/candidates/add"
                  element={
                    <ProtectedRoute>
                      <CandidateCreatePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/candidates/:id"
                  element={
                    <ProtectedRoute>
                      <CandidateDetailPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<LoginPage />} />
              </Routes>

            </Box>
          </Box>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
