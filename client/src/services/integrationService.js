import axios from "axios";
import Integration from "../models/Integration.js";

export const getAll = async () => {
  const { data } = await axios.get("/api/integrations");
  return data.map((integration) => new Integration(integration));
};

export const getById = async (integrationId) => {
  const { data } = await axios.get("/api/integrations/" + integrationId);
  return new Integration(data);
};
