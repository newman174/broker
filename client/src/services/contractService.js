import axios from "axios";

export const getAllContracts = async () => {
  const { data } = await axios.get("/api/contracts");
  return data;
};
