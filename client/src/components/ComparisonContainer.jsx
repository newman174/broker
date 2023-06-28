import { Flex, Paper, Grid, Card, Button } from "@mantine/core";
import ParticipantDetails from "./ParticipantDetails.jsx";
import { XboxX, CircleCheck } from "tabler-icons-react";

const unique = function (array) {
  return array.filter((elem, index) => {
    const firstIndex = array.indexOf(elem);
    return index === firstIndex;
  });
};

const comparisonStatusIndicator = (status) => {
  const statusIndicator = {
    Success: {
      color: "#4caf50",
      icon: <CircleCheck size={48} />,
    },
    Failed: {
      color: "#f44336",
      icon: <XboxX size={48} />,
    },
  };

  return (
    <Flex
      direction={"column"}
      align="center"
      justify="center"
      style={{ color: statusIndicator[status].color }}
      size="xl"
    >
      {statusIndicator[status].icon}
      {status}
    </Flex>
  );
};

const ComparisonContainer = ({ comparison }) => {
  console.log(comparison);

  const consumerParticipantVersions =
    comparison.consumerContract.participantVersions;

  const consumerDetails = {
    version: consumerParticipantVersions
      .map((participantVersion) => participantVersion.participantVersion)
      .sort()
      .join(", "),
    branch: unique(
      consumerParticipantVersions
        .filter((participantVersion) => participantVersion.participantBranch)
        .map((participantVersion) => participantVersion.participantBranch)
    ).join(", "),
    environments: "dev, test, prod",
    publishedDate: "2021-08-01",
    participantType: "Consumer",
  };

  const providerParticipantVersions =
    comparison.consumerContract.participantVersions;

  const providerDetails = {
    version: providerParticipantVersions
      .map((participantVersion) => participantVersion.participantVersion)
      .sort()
      .join(", "),
    participantType: "Provider",
    branch: unique(
      providerParticipantVersions
        .filter((participantVersion) => participantVersion.participantBranch)
        .map((participantVersion) => participantVersion.participantBranch)
    ).join(", "),
    environments: "dev, test, prod",
    publishedDate: "2021-08-01",
  };

  return (
    <Card
      shadow="md"
      radius="md"
      style={{
        marginBottom: "1rem",
        border:
          "1px solid " +
          (comparison.comparisonStatus === "Failed" ? "red" : "green"),
      }}
    >
      <Grid align="center">
        <Grid.Col md={6} lg={3}>
          {comparisonStatusIndicator(comparison.comparisonStatus)}
        </Grid.Col>
        <Grid.Col md={6} lg={3}>
          <ParticipantDetails participantDetails={consumerDetails} />
        </Grid.Col>
        <Grid.Col md={6} lg={3}>
          <ParticipantDetails participantDetails={providerDetails} />
        </Grid.Col>
        <Grid.Col md={6} lg={3}>
          <Button variant="outline" color="blue">
            View Comparison
          </Button>
        </Grid.Col>
      </Grid>
      {/* </Flex> */}
    </Card>
  );
};

export default ComparisonContainer;
