import axios from "axios";
import Comparison from "../models/Comparison.js";

export const getAll = async () => {
  const { data } = await axios.post("/api/graph/comparisons", {
    joinGraph: [
      "consumerContract.[participantVersions, consumer]",
      "providerSpec.[participantVersions, provider]",
    ],
  });
  return data.map((comparison) => new Comparison(comparison));
};
