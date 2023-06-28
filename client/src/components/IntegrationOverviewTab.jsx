import ComparisonContainer from "./ComparisonContainer.jsx";
import PropTypes from "prop-types";

const IntegrationOverviewTab = ({ comparisons }) => {
  return (
    <div>
      {comparisons.map((comparison) => (
        <ComparisonContainer key={comparison.id} comparison={comparison} />
      ))}
    </div>
  );
};

IntegrationOverviewTab.propTypes = {
  comparisons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IntegrationOverviewTab;
