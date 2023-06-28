import axios from "axios";
import Participant from "../models/Participant.js";

export const getAll = async () => {
  const { data } = await axios.get("/api/participants");
  return data.map((participant) => new Participant(participant));
};
