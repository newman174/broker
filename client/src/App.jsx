import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  participantService,
  contractService,
  integrationService,
  comparisonService,
} from "./services/apiService.js";

import { Integration } from "./components/Integration.jsx";

const fetchAndSet = async (service, setter) => {
  const data = await service.getAll();
  setter(data);
};

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    fetchAndSet(participantService, setParticipants);
    fetchAndSet(contractService, setContracts);
    fetchAndSet(integrationService, setIntegrations);
    fetchAndSet(comparisonService, setComparisons);
  }, []);

  return (
    <Router>
      <h1>Signet Contract Broker</h1>
      <Link to="/">Home</Link>
      <h2>Integrations</h2>
      <ol>
        {integrations.map((integration) => (
          <li key={integration.integrationId}>
            <Link
              key={integration.integrationId}
              to={`/integrations/${integration.integrationId}`}
            >
              {integration.consumerName} - {integration.providerName}
            </Link>
          </li>
        ))}
      </ol>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2>Participants</h2>
              <ol>
                {participants.map((participant) => (
                  <li key={participant.participantId}>
                    {participant.participantName}
                  </li>
                ))}
              </ol>
              <h2>Contracts</h2>
              <ol>
                {contracts.map((contract) => (
                  <li key={contract.contractId}>
                    {JSON.stringify(contract.contract, null, 2)}
                  </li>
                ))}
              </ol>
            </>
          }
        />
        <Route
          path="integrations/:integrationId"
          element={
            <Integration
              integrations={integrations}
              contracts={contracts}
              comparisons={comparisons}
            />
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
