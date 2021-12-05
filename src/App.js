import React, { useEffect } from "react";
import Header from "./components/Header";
import { useUserStore, useLoadingStore } from "./stores";
import { useToast, Text } from "@chakra-ui/react";
import LoggedOut from "./components/LoggedOut";
import LoggedIn from "./components/LoggedIn";
import axios from "axios";
import { isMobile, isTablet } from "react-device-detect";

const App = () => {
  const { user, setUser } = useUserStore((state) => state);
  const { loading, turnOnLoading, turnOffLoading } = useLoadingStore(
    (state) => state
  );
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      turnOnLoading();
      axios
        .request({
          method: "get",
          url: `${process.env.REACT_APP_API_BASE}/user/details`,
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          turnOffLoading();
          toast({
            title: "Welcome back!",
            description: `${res.data.user.username}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          turnOffLoading();
          toast({
            title: "Error",
            description: `${err.response.data.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, []);

  if (isMobile || isTablet) {
    return (
      <Text fontSize="3xl">
        Sorry, this app is not available on mobile / tablet devices. Mobile app
        is under development and will be available soon on Google Play and App
        Store :)
      </Text>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <Text fontSize="6xl">Loading...</Text>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">{user ? <LoggedIn /> : <LoggedOut />}</div>
    </div>
  );
};

export default App;
