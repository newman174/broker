import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { integrationService } from "./services/apiService.js";
import AppShell from "./components/AppShell.jsx";
import { Integration } from "./components/Integration.jsx";

const fetchAndSet = async (service, setter) => {
  const data = await service.getAll();
  setter(data);
};

const App = () => {
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    fetchAndSet(integrationService, setIntegrations);
  }, []);

  const path = useLocation().pathname;

  return (
    <AppShell integrations={integrations}>
      <Routes>
        <Route path="/" element={<h1>Signet Contract Broker</h1>} />
        <Route
          path="integrations/:integrationId"
          element={
            path.match(/.*integrations.*/i) && integrations.length > 0 ? (
              <Integration />
            ) : null
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </AppShell>
  );
};

export default App;
