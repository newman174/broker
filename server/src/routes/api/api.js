import express from "express";
import contractsRouter from "./contracts.js";
import specsRouter from "./specs.js";
// import participantsRouter from "./participants.js";
import integrationsRouter from "./integrations.js";
// import comparisonRouter from "./comparisons.js";
import graphRouter from "./graph.js";
import webhooksRouter from "./webhooks.js";
import environmentsRouter from "./environments.js";

const router = express.Router();

router.use("/contracts", contractsRouter);
router.use("/specs", specsRouter);
// router.use("/participants", participantsRouter);
router.use("/integrations", integrationsRouter);
// router.use("/comparisons", comparisonRouter);
router.use("/graph", graphRouter); // debugging
router.use("/webhooks", webhooksRouter);
router.use("/environments", environmentsRouter);

export default router;
