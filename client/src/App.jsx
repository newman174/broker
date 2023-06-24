import "./App.css";
import { useState, useEffect } from "react";
import { getAllParticipants } from "./services/participantService";
import { getAllContracts } from "./services/contractService";
import { getAllIntegrations } from "./services/integrationService";
const App = () => {
  const [participants, setParticipants] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [integrations, setIntegrations] = useState([]);

  const fetchParticipants = async () => {
    const participants = await getAllParticipants();
    setParticipants(participants);
  };

  const fetchContracts = async () => {
    const contracts = await getAllContracts();
    setContracts(contracts);
  };

  const fetchIntegrations = async () => {
    const integrations = await getAllIntegrations();
    setIntegrations(integrations);
  };

  useEffect(() => {
    fetchParticipants();
    fetchContracts();
    fetchIntegrations();
  }, []);

  return (
    <>
      <h1>Signet Contract Broker</h1>
      <h2>Participants</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.participant_id}>
            {participant.participant_name}
          </li>
        ))}
      </ul>
      <h2>Contracts</h2>
      <ul>
        {contracts.map((contract) => (
          <li key={contract.contract_id}>
            {JSON.stringify(contract.contract, null, 2)}
          </li>
        ))}
      </ul>
      <h2>Integrations</h2>
      <ul>
        {integrations.map((integration) => (
          <li key={integration.integration_id}>
            {integration.consumer_id} {integration.provider_id}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
