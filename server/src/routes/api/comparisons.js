import express from "express";

import Comparison from "../../models/Comparison.js";
import { newGraphMiddleware } from "../../utils/queryHelpers.js";
const router = express.Router();

const ALLOWED_GRAPH = ["integration", "consumerContract", "providerContract"];

const comparisonGraphMiddleware = newGraphMiddleware(Comparison, ALLOWED_GRAPH);

router.use("/", comparisonGraphMiddleware, async (_req, res) => {
  const comparisons = await res.locals.query;
  res.json(comparisons);
});

export default router;
