import Comparison from "../models/Comparison.js";
import ComparisonContainer from "./ComparisonContainer.jsx";
import PropTypes from "prop-types";
import { Prism } from "@mantine/prism";

const latest = (array) => array.sort((a, b) => b.createdAt - a.createdAt)[0];

/**
 * @function IntegrationOverviewTab
 * @description Renders a list of ComparisonContainer components.
 * @param {object} props
 * @param {Comparison[]} props.comparisons
 * @returns {React.ReactHTMLElement}
 */
const IntegrationOverviewTab = ({ comparisons }) => {
  const latestProviderVersion = comparisons
    .map((comparison) => comparison.providerSpec.providerVersions)
    .sort((a, b) => b.createdAt - a.createdAt)[0];

  const providerSpecForLatestVersion = comparisons
    .map((comparison) => comparison.providerSpec)
    .find(
      (providerSpec) =>
        providerSpec.providerVersionId === latestProviderVersion.id
    );

  const comparisonsToDisplay = comparisons.filter(
    (comparison) =>
      comparison.providerSpec.id === providerSpecForLatestVersion.id
  );

  console.log("comparisons", comparisons);
  console.log("comparisonsToDisplay", comparisonsToDisplay);

  return (
    <div>
      {/* {comparisonsToDisplay.map((comparison) => ( */}
      {/* {comparisons */}
      {comparisonsToDisplay
        .sort(
          (a, b) =>
            latest(b.providerSpec.providerVersions).createdAt -
            latest(a.providerSpec.providerVersions).createdAt
        )
        .map((comparison) => (
          <ComparisonContainer key={comparison.id} comparison={comparison} />
        ))}
      {/* <div style={{ textAlign: "left" }}>
        <h4>comparisons</h4>
        <Prism language="json">{JSON.stringify(comparisons, null, 2)}</Prism>
        <h4>comparisonsToDisplay</h4>
        <Prism language="json">
          {JSON.stringify(comparisonsToDisplay, null, 2)}
        </Prism>
      </div> */}
    </div>
  );
};

IntegrationOverviewTab.propTypes = {
  comparisons: PropTypes.arrayOf(PropTypes.instanceOf(Comparison)).isRequired,
};

export default IntegrationOverviewTab;
