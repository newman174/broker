import axios from "axios";

export const getAllParticipants = async () => {
  const { data } = await axios.get("/api/participants");
  return data;
};
