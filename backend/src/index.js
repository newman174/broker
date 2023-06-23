import express from "express";
import "dotenv/config";
import morgan from "morgan";

import rootRoute from "./routes/root.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/", rootRoute);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
