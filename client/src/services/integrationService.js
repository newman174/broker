import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.post("/api/graph/integrations", {
    joinGraph: ["consumer", "provider"],
  });
  return data;
};
