import React, { useState } from "react";
import {
  HStack,
  Text,
  Button,
  Icon,
  useToast,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import "../../styles/todoitem.css";
import {
  AiFillEdit,
  AiFillDelete,
  AiFillSave,
  AiOutlineClose,
} from "react-icons/ai";
import axios from "axios";
import { useUserStore, useSizeStore } from "../../stores";

const TodoItem = ({ todoitem }) => {
  const { deleteUserTodo, editUserTodo } = useUserStore((state) => state);
  const { size } = useSizeStore((state) => state);
  const toast = useToast();
  const [editMode, setEditMode] = useState(false);
  const [new_text, setNewText] = useState(todoitem.text);

  const deleteItem = () => {
    axios
      .request({
        method: "delete",
        url: `${process.env.REACT_APP_API_BASE}/todo/delete`,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        params: {
          id: todoitem._id,
        },
      })
      .then((res) => {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        deleteUserTodo(todoitem._id);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const editItem = () => {
    axios
      .request({
        method: "put",
        url: `${process.env.REACT_APP_API_BASE}/todo/edit`,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        params: {
          id: todoitem._id,
        },
        data: {
          new_text: new_text,
        },
      })
      .then((res) => {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        setEditMode(false);
        editUserTodo(todoitem._id, new_text);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      });
  };

  return (
    <HStack minW={size} maxW={size} overscrollX="auto" className="todoitem">
      <Text fontSize="2xl">{todoitem.text}</Text>
      <HStack>
        {editMode ? (
          <HStack>
            <Input
              value={new_text}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  editItem();
                }
              }}
            />
            <Tooltip hasArrow label="Cancel" placement="top">
              <Button
                colorScheme="red"
                variant="ghost"
                onClick={() => setEditMode(false)}
              >
                <Icon as={AiOutlineClose} />
              </Button>
            </Tooltip>

            <Tooltip hasArrow label="Save Changes" placement="top">
              <Button
                colorScheme="telegram"
                variant="ghost"
                onClick={editItem}
                disabled={!new_text || new_text === todoitem.text}
              >
                <Icon as={AiFillSave} />
              </Button>
            </Tooltip>
          </HStack>
        ) : (
          <>
            <Button
              colorScheme="telegram"
              variant="ghost"
              onClick={() => setEditMode(true)}
            >
              <Icon as={AiFillEdit} />
              &nbsp;
              <Text>Edit</Text>
            </Button>
            <Button colorScheme="red" variant="ghost" onClick={deleteItem}>
              <Icon as={AiFillDelete} />
              &nbsp;
              <Text>Delete</Text>
            </Button>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default TodoItem;
