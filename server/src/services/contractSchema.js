import { addSchema, validate } from "@hyperjump/json-schema/draft-04";
import pactSchema from "../data/schema/pactv3Schema.js";
import openAPISchema from "../data/schema/openAPIv3Schema.js";

const validatePact = async (pact) => {
  addSchema(
    pactSchema,
    "https://raw.githubusercontent.com/pactflow/pact-schemas/main/dist/pact-schema-v3.json"
  );
  const result = await validate(
    "https://raw.githubusercontent.com/pactflow/pact-schemas/main/dist/pact-schema-v3.json",
    pact
  );
  return result.valid;
};

const validateOAS = async (spec) => {
  addSchema(
    openAPISchema,
    "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/schemas/v3.0/schema.json"
  );
  const result = await validate(
    "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/schemas/v3.0/schema.json",
    spec
  );

  return result.valid;
};

export const validateSchema = (contract, contractType) => {
  if (contractType === "consumer") {
    return validatePact(contract);
  } else {
    return validateOAS(contract);
  }
};
