import { Router } from "express";

import knex from "../db/db.js";
import Contract from "../models/contract.js";
import Participant from "../models/participant.js";

const route = Router();

route.get("", (req, res) => {
  res.send("Hello World");
});

route.get("/test", async (req, res) => {
  // deletes all contracts and participants
  await Contract.query().delete();
  await Participant.query().delete();

  // adds a participant
  const participant1 = await Participant.query().insert({
    participant_name: "consumer1",
  });

  // adds another participant
  const participant2 = await Participant.query().insert({
    participant_name: "consumer2",
  });

  // queries for all participants
  const participantRead = await Participant.query();

  // should log 2 participants
  console.log("participant : ", participantRead);

  // adds a contract for participant1
  const contract = await Participant.relatedQuery("contracts")
    .for(participant1.participant_id)
    .insert({ contract: {}, contract_type: "consumer" });

  // queries for all contracts
  const contractRead = await Contract.query();

  // should log 1 contract
  console.log("contract : ", contractRead);

  res.status(200).end();
});

export default route;
