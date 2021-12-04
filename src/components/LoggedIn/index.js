import React from "react";
import TodoList from "../TodoList";
import { useUserStore } from "../../stores";
import AddTodo from "../AddTodo/index.js";
import { VStack } from "@chakra-ui/react";

const LoggedIn = () => {
  const { user } = useUserStore((state) => state);

  return (
    <VStack>
      <AddTodo />
      <TodoList todos={user.todos} />
    </VStack>
  );
};

export default LoggedIn;
