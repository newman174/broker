import express from "express";
import db from "../../db/databaseClient.js";
const router = express.Router();

/*
Creates a new deployment environment

Request Body:
{
  environmentName: (string)
}
*/
router.post('/', async (req, res) => {
  const { environmentName } = req.body;

  if (!environmentName || typeof environmentName !== "string") {
    return res
      .status(400)
      .json({error: 'Request body must have an environmentName (string) property'});
  }

  const environmentRecord = await db.createEnvironment(environmentName);

  res.status(201).json(environmentRecord);
});

/*
Updates the deployment status of a participant version in an environment

Request Body:
{
  environmentName: (string)
  participantName: (string)
  participantVersion: (string)
  deployed: (bool)
}
*/
router.patch('/', async (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

export default router