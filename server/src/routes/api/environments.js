import express from "express";
import db from "../../db/databaseClient.js";
const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.environmentName || typeof environmentName === string) {
    return res.status(400).json({ error: "Request body must have an environmentName (string) property" });
  }

  res.status(201).json(req.body);
});

export default router