import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.post("/api/graph/comparisons", {
    joinGraph: ["consumerContract", "providerContract"],
  });
  return data;
};
