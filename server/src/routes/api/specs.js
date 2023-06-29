import express from "express";
import db from "../../db/databaseClient.js";
import comp from "../../services/comparisonService.js";
import { validateSchema } from "../../services/contractSchema.js";
import YAML from "yaml";
const router = express.Router();

/**
 * Creates a new provider spec
 * @param {string} spec - The spec
 * @param {string} providerName - The provider name
 * @param {'json'|'yaml'} specFormat - The spec format
 * @returns {object} The created spec
 */

router.post("/", async (req, res) => {
  let { spec, providerName, specFormat } = req.body;

  if (specFormat === "yaml") {
    spec = YAML.parse(spec);
  }

  if (!(await validateSchema(spec, "provider"))) {
    return res.status(400).json({ error: "Contract schema is invalid" });
  }

  const provider = await db.getParticipant(providerName);

  const specRecord = await db.publishProviderSpec(
    spec,
    provider.participantId,
    specFormat
  );

  res.status(201).json(specRecord);

  comp.compareWithConsumerContracts(specRecord.providerSpecId);
});

export default router;
