import express from "express";
import Contract from "../../models/Contract.js";
import Participant from "../../models/Participant.js";
import ParticipantVersion from "../../models/ParticipantVersion.js";
import Integration from "../../models/Integration.js";
import Comparison from "../../models/Comparison.js";
import objectHash from "object-hash";
import { findOrCreate, newGraphMiddleware } from "../../utils/queryHelpers.js";
const router = express.Router();

const ALLOWED_GRAPH = ["integration", "consumerContract", "providerContract"];

const contractGraphMiddleware = newGraphMiddleware(Comparison, ALLOWED_GRAPH);

router.get("/", contractGraphMiddleware, async (_req, res) => {
  const comparisons = await res.locals.query;
  res.json(comparisons);
});

export default router;
