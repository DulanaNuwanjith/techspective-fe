import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Stack,
  Link,
  Button,
  Collapse,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../auth/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AUTH_CHANGE_EVENT } from "../auth/AuthContext";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  // Extract the _forceUpdateValue to ensure this component re-renders
  const { isAuthenticated, logout, _forceUpdateValue } = useAuth();
  const navigate = useNavigate();
  
  const [localAuthState, setLocalAuthState] = useState(isAuthenticated);
  
  useEffect(() => {
    setLocalAuthState(isAuthenticated);
  }, [isAuthenticated, _forceUpdateValue]);

  useEffect(() => {
    const handleAuthChange = (event) => {
      setLocalAuthState(event.detail.isAuthenticated);
    };
    
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      const isLoggedIn = localStorage.getItem("isAuthenticated");
      if (isLoggedIn != localAuthState) {
        setLocalAuthState(isLoggedIn);
      }
    }, 1000);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify="space-between"
        boxShadow="sm"
      >
        {/* Left: Title */}
        <Link
          as={RouterLink}
          to="/"
          fontFamily={"heading"}
          fontWeight="bold"
          color={"blue.500"}
          fontSize="xl"
          _hover={{ textDecoration: "none" }}
        >
          TechSpective
        </Link>

        {/* Right: Logout - Use both states to be extra safe */}
        {(localAuthState || isAuthenticated) && (
          <Button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            leftIcon={<AiOutlineLogout />} 
            colorScheme='red' 
            variant='solid'
          >
            Logout
          </Button>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue("white", "gray.800")}
          p={4}
          display={{ md: "none" }}
          boxShadow="md"
        >
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Navbar;