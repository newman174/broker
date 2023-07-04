import db from "../db/databaseClient.js";

class WebhookService {
  async newSpecEvent(specRecord) {
    const providerRecord = await db.getParticipantById(specRecord.providerId);
    const integrationRecords = await db.getIntegrationsByProviderId(providerRecord.participantId);
    const integrationIds = integrationRecords.map(record => record.integrationId);

    const payload = {
      providerName: providerRecord.participantName,
      spec: specRecord.spec,
      publishedAt: specRecord.createdAt,
    };

    // if we need custom headers/body schema, get them here
    const urls = await db.getURLsForEvent("specPublishEvents", integrationIds);

    for (let url of urls) {
      // and pass them in to this method
      await this.sendWebhook(url, payload);
    }
  }

  async sendWebhook(url, body) {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body,
    };

    fetch(url, options); // don't await, fire and forget
  }
}

export default new WebhookService();
