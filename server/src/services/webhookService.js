import db from "../db/databaseClient.js";

class WebhookService {
  async newSpecEvent(specRecord) {
    const providerRecord = await db.getParticipantById(specRecord.providerId);

    const payload = {
      providerName: providerRecord.participantName,
      spec: specRecord.spec,
      publishedAt: specRecord.createdAt,
    };

    const urls = await db.getURLsForEvent("specPublishEvents");

    console.log(urls);
  }
}

export default new WebhookService();
