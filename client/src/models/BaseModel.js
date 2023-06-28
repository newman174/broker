class BaseModel {
  constructor({ createdAt, updatedAt }) {
    this.createdAt = Date.parse(createdAt);
    this.updatedAt = Date.parse(updatedAt);
  }
}

export default BaseModel;
