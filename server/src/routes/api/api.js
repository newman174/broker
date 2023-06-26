import express from "express";
import contractsRouter from "./contracts.js";
import participantsRouter from "./participants.js";
import integrationsRouter from "./integrations.js";
import graphRouter from "./graph.js";

const router = express.Router();

router.use("/contracts", contractsRouter);
router.use("/participants", participantsRouter);
router.use("/integrations", integrationsRouter);
router.use("/graph", graphRouter);

export default router;
