import axios from "axios";
import Contract from "../models/Contract.js";

export const getAll = async () => {
  const { data } = await axios.get("/api/contracts");
  return data.map((contract) => new Contract(contract));
};
