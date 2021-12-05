import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useModalStore, useUserStore, useLoadingStore } from "../../stores";

const RegisterForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const toast = useToast();
  const { closeRegisterModal } = useModalStore((state) => state);
  const { setUser } = useUserStore((state) => state);
  const { turnOnLoading, turnOffLoading } = useLoadingStore((state) => state);

  const register = (e) => {
    e.preventDefault();
    turnOnLoading();
    axios
      .request({
        method: "POST",
        url: `${process.env.REACT_APP_API_BASE}/user/new`,
        data: data,
      })
      .then((res) => {
        window.location.href = "/";
        turnOffLoading();
        toast({
          title: `Welcome ${res.data.user.username}`,
          description: res.data.message,
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        closeRegisterModal();
      })
      .catch((err) => {
        turnOffLoading();
        toast({
          title: `Error`,
          description: err.response.data.error,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      })
      .finally(() => {
        setData({
          ...data,
          password: "",
        });
      });
  };

  return (
    <form onSubmit={(e) => register(e)}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        {data.username.length < 3 && (
          <FormHelperText color="red">
            Username should be at least 3 characters long
          </FormHelperText>
        )}
      </FormControl>
      <br />
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) && (
          <FormHelperText color="red">
            Valid email address is required
          </FormHelperText>
        )}
      </FormControl>
      <br />
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={passwordVisible ? "text" : "password"}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <InputRightElement
            children={
              <Icon as={passwordVisible ? AiFillEye : AiFillEyeInvisible} />
            }
            cursor="pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
            fontSize="3xl"
          />
        </InputGroup>
        {data.password.length < 6 && (
          <FormHelperText color="red">
            Password should be at least 6 characters long
          </FormHelperText>
        )}
      </FormControl>
      <br />
      <Button
        type="submit"
        colorScheme="facebook"
        disabled={
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) ||
          data.username.length < 3 ||
          data.password.length < 6
        }
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
