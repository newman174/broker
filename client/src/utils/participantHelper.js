import { unique } from "./helpers";

export const generateDetails = (comparison, participantType) => {
  const participantVersions =
    participantType === "Consumer"
      ? comparison.consumerContract.consumerVersions
      : comparison.providerSpec.providerVersions;

  const mostRecentVersionPublished = participantVersions.sort(
    (a, b) => b.createdAt - a.createdAt
  )[0].createdAt;

  const environments =
    unique(
      participantVersions
        .map((participantVersion) => participantVersion.environmentNames())
        .flat()
    ).join(", ") || "N/A";

  return {
    participantType,
    environments,
    versions: participantVersions
      .map((participantVersion) => participantVersion.version)
      .sort()
      .join(", "),
    branches: unique(
      participantVersions
        .filter((participantVersion) => participantVersion.participantBranch)
        .map((participantVersion) => participantVersion.participantBranch)
    ).join(", "),
    mostRecentVersionPublished,
  };
};

export const formatDetail = (detail) => {
  return detail === "" ? "N/A" : detail;
};

export const formatEnvs = (envs) => {
  return envs.length === 0 ? "N/A" : envs.map((env) => env.name).join(", ");
};
