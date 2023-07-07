import Comparison from "../models/Comparison.js";
import PropTypes from "prop-types";
import { Tabs, Box, Group, Divider, Card, Title } from "@mantine/core";
import ComparisonTab from "./ComparisonTab.jsx";
import ConsumerContractTab from "./ConsumerContractTab.jsx";
import ProviderSpecTab from "./ProviderSpecTab.jsx";
import ReactTimeAgo from "react-time-ago";
import { generateDetails } from "../utils/participantHelper.js";

const Contracts = ({ comparison }) => {
  const consumerDetails = generateDetails(comparison, "Consumer");
  const providerDetails = generateDetails(comparison, "Provider");

  return (
    <Box>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ textAlign: "left" }}
      >
        <Title order={3} style={{ marginBottom: "-10px" }}>
          Consumer Details
        </Title>
        <Group spacing="10rem">
          <dl className="comparison-details">
            <dt>Versions</dt>
            <dd>{consumerDetails.versions}</dd>
          </dl>

          <dl className="comparison-details">
            <dt>Published At</dt>
            <dd>
              <ReactTimeAgo date={consumerDetails.mostRecentVersionPublished} />
            </dd>
          </dl>
          <dl className="comparison-details">
            <dt>Branches</dt>
            <dd>{consumerDetails.branches || "(none)"}</dd>
          </dl>
        </Group>
        <Divider my="sm" />
        <Title order={3} style={{ marginBottom: "-10px" }}>
          Provider Details
        </Title>
        <Group spacing="10rem">
          <dl className="comparison-details">
            <dt>Versions</dt>
            <dd>{providerDetails.versions}</dd>
          </dl>

          <dl className="comparison-details">
            <dt>Published At</dt>
            <dd>
              <ReactTimeAgo date={providerDetails.mostRecentVersionPublished} />
            </dd>
          </dl>
          <dl className="comparison-details">
            <dt>Branches</dt>
            <dd>{providerDetails.branches || "(none)"}</dd>
          </dl>
        </Group>
      </Card>
      <Divider my="sm" />
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ textAlign: "left" }}
      >
        <Tabs defaultValue="comparison">
          <Tabs.List grow>
            <Tabs.Tab value="comparison">Comparison</Tabs.Tab>
            <Tabs.Tab value="consumerContract">Consumer Contract</Tabs.Tab>
            <Tabs.Tab value="providerSpec">Provider Spec</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="comparison">
            <ComparisonTab comparison={comparison} />
          </Tabs.Panel>
          <Tabs.Panel value="consumerContract">
            <ConsumerContractTab comparison={comparison} />
          </Tabs.Panel>

          <Tabs.Panel value="providerSpec">
            <ProviderSpecTab comparison={comparison} />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Box>
  );
};

Contracts.propTypes = {
  comparison: PropTypes.instanceOf(Comparison).isRequired,
};

export default Contracts;
