import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "./index.css";
import {
  inputTheme,
  textTheme,
  linkTheme,
  buttonTheme,
  checkboxTheme,
  colors,
} from "./theme";
import { selectTheme } from "./theme/select";

// Modify theme
const theme = extendTheme({
  colors,
  components: {
    Checkbox: checkboxTheme,
    Input: inputTheme,
    Heading: textTheme,
    Text: textTheme,
    Link: linkTheme,
    Button: buttonTheme,
    Select: selectTheme,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
