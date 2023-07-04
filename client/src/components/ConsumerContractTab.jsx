import Comparison from "../models/Comparison.js";
import PropTypes from "prop-types";
import { Group } from "@mantine/core";
import Interactions from "./Interactions.jsx";

const ConsumerContractTab = ({ comparison }) => {
  const { result, consumerContract } = comparison;
  return (
    <>
      <h3 style={{ textAlign: "left" }}>Consumer Contract</h3>
      <Group spacing="10rem">
        <dl className="comparison-details">
          <dt>Consumer Contract Status</dt>
          <dd>{result.success ? "Compatible" : "Incompatible"}</dd>
        </dl>

        <dl className="comparison-details">
          <dt>Pact Spec Version</dt>
          <dd>
            {consumerContract.contract.metadata.pactSpecification.version}
          </dd>
        </dl>
      </Group>
      <Interactions comparison={comparison} />
    </>
  );
};

ConsumerContractTab.propTypes = {
  comparison: PropTypes.instanceOf(Comparison).isRequired,
};
export default ConsumerContractTab;
