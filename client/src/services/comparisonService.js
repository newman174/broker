import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.post("/api/graph/comparisons", {
    joinGraph: [
      "consumerContract.[participantVersions, owner]",
      "providerContract.[participantVersions, owner]",
    ],
  });
  return data;
};
