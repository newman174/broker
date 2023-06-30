import { Flex, Grid, Card, Button } from "@mantine/core";
import ParticipantDetails from "./ParticipantDetails.jsx";
import { XboxX, CircleCheck } from "tabler-icons-react";
import Comparison from "../models/Comparison.js";

const unique = function (array) {
  return array.filter((elem, index) => {
    const firstIndex = array.indexOf(elem);
    return index === firstIndex;
  });
};

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

const comparisonStatusIndicator = (status) => {
  return (
    <Flex
      direction={"column"}
      align="center"
      justify="center"
      style={
        statusIndicator[status]
          ? { color: statusIndicator[status].color }
          : { color: "black" }
      }
      size="xl"
    >
      {statusIndicator[status]?.icon}
      {status}
    </Flex>
  );
};

const ComparisonContainer = ({ comparison }) => {
  const generateDetails = (participantType) => {
    const participantVersions =
      participantType === "Consumer"
        ? comparison.consumerContract.consumerVersions
        : comparison.providerSpec.providerVersions;

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
      // environments: "dev, test, prod",
      publishedDate: comparison.createdAt,
    };
  };

  const consumerDetails = generateDetails("Consumer");
  const providerDetails = generateDetails("Provider");

  return (
    <Card
      shadow="md"
      radius="md"
      style={{
        marginBottom: "1rem",
        border:
          "2px solid " + (statusIndicator[comparison.status]?.color || "black"),
      }}
    >
      <Grid align="center">
        <Grid.Col md={6} lg={3}>
          {comparisonStatusIndicator(comparison.status)}
        </Grid.Col>
        <Grid.Col md={6} lg={3}>
          <ParticipantDetails participantDetails={consumerDetails} />
        </Grid.Col>
        <Grid.Col md={6} lg={3}>
          <ParticipantDetails participantDetails={providerDetails} />
        </Grid.Col>
        <Grid.Col md={6} lg={3}>
          <Button variant="outline">View Contracts</Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

// ComparisonContainer.PropTypes = {
//   comparison: Comparison.isRequired,
// };

export default ComparisonContainer;
