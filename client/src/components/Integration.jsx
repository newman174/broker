/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { comparisonService } from "../services/apiService.js";
// import { Prism } from "@mantine/prism";
import {
  // Card,
  Tabs,
} from "@mantine/core";
// import Comparison from "../models/Comparison.js";
import IntegrationOverviewTab from "./IntegrationOverviewTab.jsx";

const Integration = ({ integrations }) => {
  const { integrationId } = useParams();
  const integration = integrations.find(
    (integration) => integration.id === Number(integrationId)
  );

  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    const fetchComparisons = async () => {
      const data = await comparisonService.getAll();
      setComparisons(
        data
          .filter((comparison) => comparison.id === integration.id)
          // .map((comparison) => new Comparison(comparison))
          .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      );
    };
    fetchComparisons();

    return () => {
      setComparisons([]);
    };
  }, [integration.id]);

  return (
    <>
      <h3>
        {integration.consumer.name} ⇄ {integration.provider.name}
      </h3>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="matrix">Matrix</Tabs.Tab>
          <Tabs.Tab value="webhooks">Webhooks</Tabs.Tab>
          <Tabs.Tab value="raw">Raw</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <h4>Comparisons</h4>
          <IntegrationOverviewTab comparisons={comparisons} />
        </Tabs.Panel>

        <Tabs.Panel value="matrix"></Tabs.Panel>

        <Tabs.Panel value="webhooks">
          <h4>Webhooks</h4>
        </Tabs.Panel>

        {/* debug json tab */}
        {/* <Tabs.Panel value="raw">
          <Card style={{ textAlign: "left" }}>
            <h4>Integration</h4>
            <Prism language="json">
              {JSON.stringify(integration, null, 2)}
            </Prism>
          </Card>

          <Card style={{ textAlign: "left" }}>
            <h4>Comparisons</h4>
            <Prism language="json">
              {JSON.stringify(comparisons, null, 2)}
            </Prism>
          </Card>
        </Tabs.Panel> */}
      </Tabs>
    </>
  );
};

export { Integration };
