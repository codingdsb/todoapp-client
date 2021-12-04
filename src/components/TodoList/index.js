import { VStack } from "@chakra-ui/react";
import React from "react";
import TodoItem from "../TodoItem";

const TodoList = ({ todos }) => {
  return (
    <div className="todolist">
      <VStack h="500px" overflowX="visible">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todoitem={todo} />
        ))}
      </VStack>
    </div>
  );
};

export default TodoList;
