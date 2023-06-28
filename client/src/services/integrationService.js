import axios from "axios";
import Integration from "../models/Integration.js";

export const getAll = async () => {
  const { data } = await axios.post("/api/graph/integrations", {
    joinGraph: ["consumer", "provider"],
  });
  return data.map((integration) => new Integration(integration));
};
