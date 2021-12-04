import React, { useState } from "react";
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
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useModalStore, useUserStore } from "../../stores";

const LoginForm = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const toast = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser } = useUserStore((state) => state);
  const { closeLoginModal } = useModalStore((state) => state);

  const login = (e) => {
    e.preventDefault();
    axios
      .request({
        method: "post",
        url: `${process.env.REACT_APP_API_BASE}/user/login`,
        data: {
          username: data.username,
          password: data.password,
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast({
          title: `Welcome ${res.data.user.username}`,
          description: "You have successfully logged in",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        closeLoginModal();
      })
      .catch((err) => {
        toast({
          title: "Error",
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
    <form onSubmit={(e) => login(e)}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <FormHelperText color="red">
          {data.username.length < 3 && "Username is required"}
        </FormHelperText>
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
        <FormHelperText color="red">
          {data.password.length < 6 && "Password is required"}
        </FormHelperText>
      </FormControl>
      <br />
      <Button
        type="submit"
        colorScheme="facebook"
        disabled={data.username.length < 3 || data.password.length < 6}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
