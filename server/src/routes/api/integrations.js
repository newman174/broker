import express from "express";
import Integration from "../../models/Integration.js";
import db from "../../db/databaseClient.js";

const router = express.Router();

/**
 * Gets all integrations
 * @returns {array} All integrations
 */
router.get("/", async (_req, res) => {
  const integrations = await db.getIntegrationData()

  res.json(integrations);
});

/**
 * Gets an integration by id
 * @param {number} id - The integration id
 * @returns {object} The integration
 */
router.get("/:id", async (req, res) => {
  const integrationId = Number(req.params.id);
  const integration = await db.getIntegrationById(integrationId)

  res.json(integration);
});

/**
 * Deletes an integration by id
 * @param {number} id - The integration id
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const integration = await db.deleteIntegration(id);
    res.status(integration ? 204 : 404).send()
  } catch (err) {
    res.status(500).send();
  }
});

export default router;
