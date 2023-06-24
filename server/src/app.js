import express from "express";
import "dotenv/config";
import morgan from "morgan";
import "./db/db.js";
import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/api", apiRouter);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default server;
