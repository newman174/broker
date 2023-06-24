import express from "express";
import contractsRouter from "./contracts.js";
import participantsRouter from "./participants.js";
import integrationsRouter from "./integrations.js";

const router = express.Router();

router.use("/contracts", contractsRouter);
router.use("/participants", participantsRouter);
router.use("/integrations", integrationsRouter);

export default router;
