import Comparison from "../models/Comparison.js";
import PropTypes from "prop-types";
import { Tabs } from "@mantine/core";
import ComparisonTab from "./ComparisonTab.jsx";

const Contracts = ({ comparison }) => {
  //console.log(comparison.result, comparison.consumerContract);
  return (
    <Tabs defaultValue="comparison">
      <Tabs.List grow>
        <Tabs.Tab value="comparison">Comparison</Tabs.Tab>
        <Tabs.Tab value="consumerContract">Consumer Contract</Tabs.Tab>
        <Tabs.Tab value="providerSpec">Provider Spec</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="comparison">
        <ComparisonTab comparison={comparison} />
      </Tabs.Panel>
      <Tabs.Panel value="consumerContract"></Tabs.Panel>
      <Tabs.Panel value="providerSpec"></Tabs.Panel>
    </Tabs>
  );
};

Contracts.propTypes = {
  comparison: PropTypes.instanceOf(Comparison).isRequired,
};

export default Contracts;
