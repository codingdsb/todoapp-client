import React from "react";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import LoginForm from "../LoginForm";
import { useModalStore } from "../../stores";

const LoginModal = () => {
  const { loginModalOpen, closeLoginModal } = useModalStore((state) => state);
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={loginModalOpen}
      onClose={closeLoginModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>LOGIN</ModalHeader>

        <ModalBody>
          <LoginForm />
        </ModalBody>

        <ModalFooter>
          <Button onClick={closeLoginModal} colorScheme="red">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
