import React from "react";
import { render } from "react-dom";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
