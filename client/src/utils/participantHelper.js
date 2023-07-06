const unique = function (array) {
  return array.filter((elem, index) => {
    const firstIndex = array.indexOf(elem);
    return index === firstIndex;
  });
};
export const generateDetails = (comparison, participantType) => {
  const participantVersions =
    participantType === "Consumer"
      ? comparison.consumerContract.consumerVersions
      : comparison.providerSpec.providerVersions;

  const mostRecentVersionPublished = participantVersions.sort(
    (a, b) => b.createdAt - a.createdAt
  )[0].createdAt;

  return {
    participantType,
    versions: participantVersions
      .map((participantVersion) => participantVersion.version)
      .sort()
      .join(", "),
    branches: unique(
      participantVersions
        .filter((participantVersion) => participantVersion.participantBranch)
        .map((participantVersion) => participantVersion.participantBranch)
    ).join(", "),
    environments:
      participantVersions
        .map((participantVersion) =>
          participantVersion.environments.map(
            (environment) => environment.environmentName
          )
        )
        .join(", ") || "N/A",
    mostRecentVersionPublished,
  };
};
