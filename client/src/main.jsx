import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

function Root() {
  const [colorScheme, setColorScheme] = useState('light');

  const toggleColorScheme = (value = null) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
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

