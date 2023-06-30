import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { integrationService } from "../services/apiService.js";
import { Tabs } from "@mantine/core";
import IntegrationOverviewTab from "./IntegrationOverviewTab.jsx";
import Matrix from "./Matrix.jsx";

const Integration = () => {
  const { integrationId } = useParams();
  const [integration, setIntegration] = useState(null);

  useEffect(() => {
    const fetchAndSet = async () => {
      const data = await integrationService.getById(integrationId);
      setIntegration(data);
    };
    fetchAndSet();
  }, [integrationId]);

  return integration ? (
    <>
      <h3>
        {integration.consumer.name} ⇄ {integration.provider.name}
      </h3>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="matrix">Matrix</Tabs.Tab>
          <Tabs.Tab value="webhooks">Webhooks</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <h4>Comparisons</h4>
          <IntegrationOverviewTab comparisons={integration.comparisons} />
        </Tabs.Panel>

        <Tabs.Panel value="matrix">
          <Matrix comparisons={integration.comparisons} />
        </Tabs.Panel>

        <Tabs.Panel value="webhooks">
          <h4>Webhooks</h4>
        </Tabs.Panel>
      </Tabs>
    </>
  ) : null;
};

export { Integration };
