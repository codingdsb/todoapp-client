import React, { useState } from "react";
import { Input, Button, HStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useUserStore, useSizeStore } from "../../stores";

const AddTodo = () => {
  const [value, setValue] = useState("");

  const { addUserTodo } = useUserStore((state) => state);
  const { size } = useSizeStore((state) => state);
  const toast = useToast();

  const addTodo = () => {
    axios
      .request({
        method: "post",
        url: `${process.env.REACT_APP_API_BASE}/todo/add`,
        data: {
          text: value,
        },
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        addUserTodo(res.data.todo);
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setValue("");
      });
  };

  return (
    <HStack width={size} marginBottom="3%">
      <Input
        placeholder="Type out your new todo here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
      />
      <Button colorScheme="whatsapp" variant="ghost" onClick={addTodo}>
        Add Todo
      </Button>
    </HStack>
  );
};

export default AddTodo;
