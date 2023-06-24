import "./App.css";
import { useState, useEffect } from "react";
import { getAllParticipants } from "./services/participantService";
import { getAllContracts } from "./services/contractService";
const App = () => {
  const [participants, setParticipants] = useState([]);
  const [contracts, setContracts] = useState([]);

  const fetchParticipants = async () => {
    const participants = await getAllParticipants();
    setParticipants(participants);
  };

  const fetchContracts = async () => {
    const contracts = await getAllContracts();
    setContracts(contracts);
  };

  useEffect(() => {
    fetchParticipants();
    fetchContracts();
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
    </>
  );
};

export default App;
