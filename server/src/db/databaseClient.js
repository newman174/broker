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

    const contractRecord = await findOrCreate(
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

    return contractRecord;
  }

  async publishProviderSpec(spec, providerId, specFormat) {
    const specHash = objectHash.MD5(spec);

    const specRecord = await findOrCreate(
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

    return specRecord;
  }

  async getConsumerContract(consumerContractId) {
    return await ConsumerContract.query().findById(consumerContractId);
  }

  async getProviderId(participantName) {
    return await Participant.query().findOne({ participantName }).returning("participentId");
  }

  async getIntegration(consumerId, providerId) {
    return await Integration.query().findOne({ consumerId, providerId });
  }

  async getProviderSpecs(providerId) {
    return await ProviderSpec.query().where({ providerId });
  }

  async getProviderSpec(providerSpecId) {
    return await ProviderSpec.query().findById(providerSpecId);
  }

  async getIntegrationsByProviderId(providerId) {
    return await Integration.query().where({ providerId });
  }
}

export default new DatabaseClient();