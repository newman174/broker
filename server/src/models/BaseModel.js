import { Model } from "objection";

class BaseModel extends Model {
  static get defaultGraphOptions() {
    return {
      minimize: true,
      // separator: "->",
      // aliases: {},
      // maxBatchSize: 10000,
    };
  }
}

export default BaseModel;
