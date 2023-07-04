import BaseModel from "./BaseModel.js";
import Integration from "./Integration.js";

class WebhookSubscription extends BaseModel {
  static get tableName() {
    return "webhookSubscriptions";
  }

  static get idColumn() {
    return "webhook_subscription_id";
  }

  static get relationMappings() {
    return {
      integration: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Integration,
        join: {
          from: "webhookSubscriptions.integrationId",
          to: "integrations.integrationId",
        },
      },
    }
  }
}

export default WebhookSubscription;