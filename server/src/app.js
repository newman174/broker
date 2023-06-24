import express from "express";
import "dotenv/config";
import morgan from "morgan";
import "./db/db.js";
import indexRouter from "./routes/index.js";
import contractRouter from "./routes/api/contracts.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/contracts", contractRouter);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default server;
