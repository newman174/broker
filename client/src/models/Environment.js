import BaseModel from "./BaseModel.js";

class Environment extends BaseModel {
  constructor({ environmentId, environmentName, createdAt, updatedAt }) {
    super({ createdAt, updatedAt });
    this.id = environmentId;
    this.name = environmentName;
  }
}

export default Environment;
