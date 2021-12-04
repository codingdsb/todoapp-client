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
import RegisterForm from "../RegisterForm";
import { useModalStore } from "../../stores";

const RegisterModal = () => {
  const { registerModalOpen, closeRegisterModal } = useModalStore(
    (state) => state
  );
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={registerModalOpen}
      onClose={closeRegisterModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>REGISTER</ModalHeader>

        <ModalBody>
          <RegisterForm />
        </ModalBody>

        <ModalFooter>
          <Button onClick={closeRegisterModal} colorScheme="red">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
