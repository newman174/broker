import "dotenv/config";
import db from "../db/databaseClient.js";
import Participant from "../models/Participant.js";
import ParticipantVersion from "../models/ParticipantVersion.js";
import { findAndUpdateOrCreate } from "../utils/queryHelpers.js";

class DeployService {

  // Given participantVersionId and envId 
  // Check if participant version is compatible with providers deployed on environment
  // Returns errors array 
  async checkWithProviders(participantVersionId, envId) {
    const participantVersion = await db.getParticipantVersionById(participantVersionId); 

    const providerMap = await this.getProviderMap(participantVersion.participantId, envId)


    const compatibleProviderVersions = new Set((await db.getCompatibleProviderVersions(participantVersionId)).map((providerVersion) => providerVersion.participantVersionId))

    const errors = []; 

    for(const [providerId, versionIds] of providerMap) {
      if(versionIds.length === 0) {
        errors.push({title: "No compatible provider", details: `Provider id ${providerId} is not deployed on environment id ${envId}`})
      }

      for(let versionId of versionIds) {
        if(!compatibleProviderVersions.has(versionId)) {
          errors.push({title: "Incompatible provider version deployed", details: `Deployed provider version id ${versionId} is not compatible`})
        }
      }
    }
    return errors; 


    // build ProviderMap (getProviderMap)
    // build Bucket (getCompatibleProviderVersions)
    // Iterate through ProviderMap and check
  }

  // Given participantVersionId and envId 
  // Check if participant version is compatible with providers deployed on environment
  // Returns errors array 
  async checkWithConsumers(participantVersionId, envId) {
    // build ConsumerMap (getProviderMap)
    // build Bucket (getCompatibleConsumerVersions)
    // Iterate through ConsumerMap and check 
    const participantVersion = await db.getParticipantVersionById(participantVersionId); 

    const consumerMap = await this.getConsumerMap(participantVersion.participantId, envId)


    const compatibleConsumerVersions = new Set((await db.getCompatibleConsumerVersions(participantVersionId)).map((consumerVersion) => consumerVersion.participantVersionId))

    const errors = []; 

    for(const [consumerId, versionIds] of consumerMap) {
      for(let versionId of versionIds) {
        if(!compatibleConsumerVersions.has(versionId)) {
          errors.push({title: "Incompatible consumer version deployed", details: `Deployed consumer id ${consumerId} with version id ${versionId} is not compatible`})
        }
      }
    }
    console.log("errors", errors);
    return errors; 
  }

  // Given participantVersionId and envId 
  // Returns object 
  // Keys: participantId of every provider of participant 
  // Values: array of all participantVersionIds of participantId that are deployed on environment
  async getProviderMap(participantId, envId) {
    const providers = await db.getProviders(participantId); 

    const providerMap = new Map(); 

    for(const provider of providers) {
      providerMap.set(provider.participantId, []); 
    }


    const versions = await db.getVersionsOnEnv(envId); 


    for(const version of versions) {
      if(providerMap.has(version.participantId)) {
        providerMap.get(version.participantId).push(version.participantVersionId); 
      }
    }
    return providerMap; 
    // Keys: getProviders(participantVersionId)
    // initialize values to []

    // Populate Values: 
    // 1. getVersionsOnEnv(envId)
    // 2. Iterate through each version
    // 3. If (providerMap[version.participantId]) providerMap[version.participantId].push(version.versionId)
  }

  // Given participantVersionId and envId 
  // Returns object 
  // Keys: participantId of every consumer of participant 
  // Values: array of all participantVersionIds of participantId that are deployed on environment
  async getConsumerMap(participantId, envId) {
    const consumers = await db.getConsumers(participantId); 

    const consumerMap = new Map(); 

    for(const consumer of consumers) {
      consumerMap.set(consumer.participantId, []); 
    }

    const versions = await db.getVersionsOnEnv(envId); 

    for(const version of versions) {
      if(consumerMap.has(version.participantId)) {
        consumerMap.get(version.participantId).push(version.participantVersionId); 
      }
    }
    return consumerMap; 
    // Keys: getConsumers(participantVersionId)
    // initialize values to []

    // Populate Values: 
    // 1. getVersionsOnEnv(envId)
    // 2. Iterate through each version
    // 3. If (consumerMap[version.participantId]) consumerMap[version.participantId].push(version.versionId)
  } 
}

export default new DeployService();
