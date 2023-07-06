import express from "express";
import db from "../../db/databaseClient.js";
import webhook from "../../services/webhookService.js";
import comp from "../../services/comparisonService.js";
import { validateSchema } from "../../services/contractSchema.js";
import YAML from "yaml";
const router = express.Router();

/**
 * Creates a new provider spec
 * @param {string} spec - The spec
 * @param {string} providerName - The provider name
 * @param {'json'|'yaml'} specFormat - The spec format
 * @param {string} providerVersion
 * @param {string} providerBranch
 * @returns {object} The created spec
 */

router.post("/", async (req, res) => {
  let { spec, providerName, specFormat, providerVersion, providerBranch } = req.body;

  if (specFormat === "yaml") {
    spec = YAML.parse(spec);
  }

  if (!(await validateSchema(spec, "provider"))) {
    return res.status(400).json({error: "Spec schema is invalid"});
  }

  const provider = await db.getParticipant(providerName);

  const specRecord = await db.publishProviderSpec(
    spec,
    provider.participantId,
    specFormat,
    providerVersion,
    providerBranch
  );

  webhook.newSpecEvent(specRecord);

  comp.compareWithConsumerContracts(specRecord.providerSpecId);

  res.status(201).json(specRecord);
});

export default router;
