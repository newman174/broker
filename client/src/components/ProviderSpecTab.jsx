import Comparison from "../models/Comparison.js";
import PropTypes from "prop-types";
import { Group, Card } from "@mantine/core";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const ProviderSpecTab = ({ comparison }) => {
  const { providerSpec } = comparison;
  return (
    <>
      <h3 style={{ textAlign: "left" }}>Consumer Contract</h3>
      <Group spacing="10rem">
        <dl className="comparison-details">
          <dt>OpenAPI Spec Version</dt>
          <dd>{providerSpec.spec.openapi}</dd>
        </dl>
      </Group>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ textAlign: "left" }}
      >
        <SwaggerUI spec={providerSpec.spec} />
      </Card>
    </>
  );
};

ProviderSpecTab.propTypes = {
  comparison: PropTypes.instanceOf(Comparison).isRequired,
};
export default ProviderSpecTab;
