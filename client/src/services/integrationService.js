import axios from "axios";

export const getAllIntegrations = async () => {
  const { data } = await axios.get("/api/integrations");
  return data;
};
