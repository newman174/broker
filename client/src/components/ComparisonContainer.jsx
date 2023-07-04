import { Flex, Grid, Card, Button } from "@mantine/core";
import ComparisonParticipantDetails from "./ComparisonParticipantDetails.jsx";
import { XboxX, CircleCheck } from "tabler-icons-react";
import Comparison from "../models/Comparison.js";
import PropTypes from "prop-types";
import { generateDetails } from "../utils/participantHelper.js";

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

/**
 * @function comparisonStatusIndicator
 * @description Renders a Flex component with a status icon and text.
 * @param {string} status
 * @returns {React.ReactHTMLElement}
 * @example
 * comparisonStatusIndicator("Success");
 *  Returns:
 *  <Flex direction="column" align="center" justify="center" size="xl" style="color: #4caf50;">
 *    <CircleCheck size="48" />
 *    Success
 *  </Flex>
 */
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

/**
 * @function ComparisonContainer
 * @description Renders a Card component with a Flex component containing a status indicator, ParticipantDetails components, and a Button component.
 * @param {{comparison: Comparison}} props
 * @returns {React.ReactHTMLElement}
 */
const ComparisonContainer = ({ comparison, onViewContracts }) => {
  const consumerDetails = generateDetails(comparison, "Consumer");
  const providerDetails = generateDetails(comparison, "Provider");

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
        {[consumerDetails, providerDetails].map((participantDetails) => (
          <Grid.Col md={6} lg={3} key={participantDetails.participantType}>
            <ComparisonParticipantDetails
              participantDetails={participantDetails}
            />
          </Grid.Col>
        ))}
        <Grid.Col md={6} lg={3}>
          <Button variant="outline" onClick={() => onViewContracts(comparison)}>
            View Contracts
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

ComparisonContainer.propTypes = {
  comparison: PropTypes.instanceOf(Comparison).isRequired,
  onViewContracts: PropTypes.func.isRequired,
};

export default ComparisonContainer;
