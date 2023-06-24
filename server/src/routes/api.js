import express from "express";
import contractsRouter from "./api/contracts.js";
import participantsRouter from "./api/participants.js";
import integrationsRouter from "./api/integrations.js";

const router = express.Router();

router.use("/contracts", contractsRouter);
router.use("/participants", participantsRouter);
router.use("/integrations", integrationsRouter);

export default router;
