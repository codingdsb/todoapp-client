import React from "react";
import {
  HStack,
  Text,
  Button,
  useColorMode,
  Box,
  useToast,
} from "@chakra-ui/react";
import "../../styles/header.css";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import { useModalStore, useUserStore } from "../../stores";

const Header = () => {
  const { openRegisterModal, openLoginModal } = useModalStore((state) => state);
  const { setUser, user } = useUserStore((state) => state);

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Good Bye!",
      description: "You have been logged out",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <HStack className="navbar" bgColor="blackAlpha.900">
        <Text fontSize="5xl" fontWeight="bold" color="whiteAlpha.900">
          Todo App
        </Text>
        <div className="linkbox">
          {!user ? (
            <>
              <Button colorScheme="whatsapp" onClick={openLoginModal}>
                Login
              </Button>
              <Button colorScheme="facebook" onClick={openRegisterModal}>
                Register
              </Button>
            </>
          ) : (
            <>
              <Box
                color="whatsapp.500"
                cursor="default"
                borderRadius="lg"
                p="2"
                fontWeight="bold"
              >
                Logged In as {user.username}
              </Box>
              <Button colorScheme="red" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </div>
      </HStack>
      <div>
        <LoginModal />
        <RegisterModal />
      </div>
    </>
  );
};

export default Header;
