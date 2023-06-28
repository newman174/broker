import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

function Root() {
  const [colorScheme, setColorScheme] = useState('light');

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    setColorScheme(prefersDarkMode.matches ? "dark" : "light");

    const updateColorScheme = (event) => {
      setColorScheme(event.matches ? "dark" : "light");
    };

    prefersDarkMode.addListener(updateColorScheme);

    return () => {
      prefersDarkMode.removeListener(updateColorScheme);
    };
  }, []);

  const toggleColorScheme = () => {
    setColorScheme((prevColorScheme) =>
      prevColorScheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <React.StrictMode>
          <Router>
            <App />
          </Router>
        </React.StrictMode>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

