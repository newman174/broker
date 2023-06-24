import "./App.css";
import { useState, useEffect } from "react";
import {
  participantService,
  contractService,
  integrationService,
} from "./services/apiService.js";

const fetchAndSet = async (service, setter) => {
  const data = await service.getAll();
  // console.log(service.Name, data);
  setter(data);
};

const App = () => {
  // const [participants, setParticipants] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    // fetchAndSet(participantService, setParticipants);
    fetchAndSet(contractService, setContracts);
    fetchAndSet(integrationService, setIntegrations);
  }, []);

  return (
    <>
      <h1>Signet Contract Broker</h1>
      <h2>Integrations</h2>
      <ol>
        {integrations.map((integration) => (
          <li key={integration.integrationId}>
            <details>
              <summary>
                <a href={`/api/integrations/${integration.integrationId}`}>
                  {integration.consumerName} - {integration.providerName}
                </a>
              </summary>
              <ul>
                <li>Integration ID: {integration.integrationId}</li>
                <li>Consumer ID: {integration.consumerId}</li>
                <li>Provider ID: {integration.providerId}</li>
                <li>
                  Contracts:
                  <p>
                    Provider:
                    <pre></pre>
                  </p>
                </li>
              </ul>
            </details>
          </li>
        ))}
      </ol>
      {/* <h2>Participants</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.participantId}>{participant.participantName}</li>
        ))}
      </ul> */}
      {/* <h2>Contracts</h2>
      <ul>
        {contracts.map((contract) => (
          <li key={contract.contractId}>
            {JSON.stringify(contract.contract, null, 2)}
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default App;
