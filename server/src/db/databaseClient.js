import ConsumerContract from "../models/ConsumerContract.js";
import ProviderSpec from "../models/ProviderSpec.js";
import Participant from "../models/Participant.js";
import ParticipantVersion from "../models/ParticipantVersion.js";
import Integration from "../models/Integration.js";
import objectHash from "object-hash";
import { findOrCreate } from "../utils/queryHelpers.js";

class DatabaseClient {
  async getParticipant(participantName) {
    return await findOrCreate(Participant, { participantName });
  }

  async participantVersionExists(participantId, participantVersion) {
    return !(await ParticipantVersion.query().findOne({
      participantId,
      participantVersion,
    }));
  }

  async publishConsumerContract(contract, participantId, participantVersion, participantBranch) {
    await findOrCreate(
      ParticipantVersion,
      { participantId, participantVersion },
      { participantId, participantVersion, participantBranch },
    )

    const contractHash = objectHash.MD5(contract);

    await findOrCreate(
      ConsumerContract,
      { contractHash, consumerId: participantId },
      {
        contract: {
          contractText: contract,
        },
        contractFormat: "json",
        contractHash,
        consumerId: participantId,
      }
    );

    const { providerId } = await findOrCreate(Participant, {
      participantName: contract.provider.name,
    });

    await findOrCreate(Integration, {
      consumerId: participantId,
      providerId,
    });
  }

  async publishProviderSpec(spec, providerId, specFormat) {
    const specHash = objectHash.MD5(spec);

    await findOrCreate(
      ProviderSpec,
      { specHash, providerId },
      {
        spec: {
          specText: spec,
        },
        specFormat,
        specHash,
        providerId,
      }
    );
  }

  async getIntegrationData() {
    const integrations = await Integration.query()
      .select(
        "integrations.*",
        "consumers.participantName as consumerName",
        "providers.participantName as providerName"
      )
      .join(
        "participants as consumers",
        "integrations.consumerId",
        "consumers.participantId"
      )
      .join(
        "participants as providers",
        "integrations.providerId",
        "providers.participantId"
      );

    return integrations
  }

  async getIntegrationById(id) {
    let integrationById = await Integration.query()
      .select(
        "integrations.*",
        "consumers.participantName as consumerName",
        "providers.participantName as providerName"
      )
      .join(
        "participants as consumers",
        "integrations.consumerId",
        "consumers.participantId"
      )
      .join(
        "participants as providers",
        "integrations.providerId",
        "providers.participantId"
      )
      .findById(id);

      return integrationById;
  }

  async deleteIntegration(id) {
    const integration = await Integration.query().deleteById(Number(id));

    return integration;
  }
}

export default new DatabaseClient();