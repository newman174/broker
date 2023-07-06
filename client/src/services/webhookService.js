// webhookService.js

import axios from "axios";

const baseUrl = "/api/webhooks";

export const postNewWebhook = async (webhook) => {
  const response = await axios.post(baseUrl, webhook);
  return response.data;
};
