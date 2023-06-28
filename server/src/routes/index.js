import { Router } from "express";

// import Contract from "../models/Contract.js";
// import Participant from "../models/Participant.js";
// import Integration from "../models/Integration.js";
// import ParticipantVersion from "../models/ParticipantVersion.js";

const router = Router();

router.get("", (req, res) => {
  res.send("Hello World");
});

// router.get("/test", async (req, res) => {
//   // deletes all contracts and participants
//   await Contract.query().delete();
//   await Integration.query().delete();
//   await Participant.query().delete();

//   // adds a participant
//   const participant = await Participant.query().insert({
//     participant_name: "consumer1",
//   });

//   // queries for all participants
//   const participants = await Participant.query();

//   // should log 1 participant
//   console.log("participant : ", participants);

//   // adds a contract for participant
//   const contract1 = await Participant.relatedQuery("contracts")
//     .for(participant.participantId)
//     .insert({ contract: {}, contractType: "consumer" });

//   // adds another contract for participant
//   const contract2 = await Participant.relatedQuery("contracts")
//     .for(participant.participantId)
//     .insert({ contract: {}, contractType: "provider" });

//   // queries for all contract types of participant
//   const contractTypes = await Contract.query()
//     .select("contractType")
//     .where("participantId", "=", participant.participantId);

//   // should log 2 contract types
//   console.log("contract types for participant : ", contractTypes);

//   const result = {
//     participants,
//     contractTypes,
//   };
//   res.json(result);
// });

// router.get("/test2", async (_req, res) => {
//   const data = await Contract.query()
//     .first()
//     .select("*")
//     .joinRelated("owner")
//     .joinRelated("participantVersions");
//   res.json(data);
// });

// router.get("/test3", async (_req, res) => {
//   let data = await ParticipantVersion.query().first();
//   data = await data.$relatedQuery("contract");
//   res.json(data);
// });

// router.get("/test4", async (_req, res) => {
//   let integration = await Integration.query()
//     .first()
//     .select("*")
//     .joinRelated("consumer");

//   res.json({ integration });
// });

// router.get("/test5", async (_req, res) => {
//   let participant = await Participant.query().findById(2);

//   let integrationsAsProvider = await participant.$relatedQuery(
//     "integrationsAsProvider"
//   );

//   res.json(integrationsAsProvider);
// });

// router.get("/test6", async (_req, res) => {
//   let participants = await Participant.query().withGraphJoined(
//     "[integrationsAsProvider, integrationsAsConsumer]"
//   );

//   res.json(participants);
// });

// router.get("/test7", async (_req, res) => {
//   let integration = await Integration.query()
//     .withGraphJoined("[consumer.versions.contract, provider.versions.contract]")
//     .where("integrationId", "=", 2);

//   // const consumerVersions = await integration.consumer.$relatedQuery("versions");

//   // const providerVersions = await integration.provider.$relatedQuery("versions");

//   // consumerVersions.forEach((consumerVersion) => {
//   //   providerVersions.forEach((providerVersion) => {
//   //     if (

//   res.json(integration);
//   // res.json({ consumerVersions, providerVersions });
// });

// router.get("/test8", async (req, res) => {
//   const { joinGraph, where } = req.body;

//   let integration = await Integration.query()
//     .allowGraph("[consumer.versions.contract, provider.versions.contract]")
//     .withGraphJoined(joinGraph || "")
//     .where(...(where || []));

//   // const consumerVersions = await integration.consumer.$relatedQuery("versions");

//   // const providerVersions = await integration.provider.$relatedQuery("versions");

//   // consumerVersions.forEach((consumerVersion) => {
//   //   providerVersions.forEach((providerVersion) => {
//   //     if (

//   res.json(integration);
//   // res.json({ consumerVersions, providerVersions });
// });

export default router;
