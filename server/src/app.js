import express from "express";
import "dotenv/config";
import morgan from "morgan";
import "./db/db.js";
import indexRouter from "./routes/index.js";
import contractsRouter from "./routes/api/contracts.js";
import participantsRouter from "./routes/api/participants.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/contracts", contractsRouter);
app.use("/api/participants", participantsRouter);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default server;
