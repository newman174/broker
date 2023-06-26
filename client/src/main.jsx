import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider
    theme={
      {
        // Override any other properties from default theme
        // fontFamily: "Open Sans, sans serif",
        // spacing: {
        //   xs: "1rem",
        //   sm: "1.2rem",
        //   md: "1.8rem",
        //   lg: "2.2rem",
        //   xl: "2.8rem",
        // },
      }
    }
  >
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </MantineProvider>
);
