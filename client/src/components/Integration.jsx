/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { comparisonService } from "../services/apiService.js";
import { Prism } from "@mantine/prism";
import { Table, Box, Card, Tabs } from "@mantine/core";
import Matrix from "./Matrix.jsx";

const Integration = ({ integrations }) => {
  const { integrationId } = useParams();
  const integration = integrations.find(
    (integration) => integration.integrationId === Number(integrationId)
  );

  const [comparisons, setComparisons] = useState([]);

  //console.log(comparisons);
  console.log("integration", integration);

  useEffect(() => {
    const fetchComparisons = async () => {
      const data = await comparisonService.getAll();
      setComparisons(
        data.filter(
          (comparison) => comparison.integrationId === integration.integrationId
        )
      );
    };
    fetchComparisons();

    return () => {
      setComparisons([]);
    };
  }, [integration.integrationId]);

  const comparisonStatusDisplay = (comparison) => {
    if (comparison.comparisonStatus === "Failed") {
      return <span style={{ color: "red", fontWeight: "bold" }}>failed</span>;
    } else if (comparison.comparisonStatus === "Success") {
      return <span style={{ color: "green", fontWeight: "bold" }}>passed</span>;
    } else {
      return (
        <span style={{ color: "orange", fontWeight: "bold" }}>
          {comparison.comparisonStatus}
        </span>
      );
    }
  };

  return (
    <>
      <h3>
        {integration.consumer.participantName} ⇄{" "}
        {integration.provider.participantName}
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
          <div>
            {comparisons.map((comparison) => (
              <Card
                // style={{
                // border: "1px solid black",
                // marginBottom: "1rem",
                // borderRadius: "5px",
                // padding: "1rem",
                // }}
                key={comparison.comparisonId}
              >
                {/* <p>Comparison ID: {comparison.comparisonId}</p>
            <p>Consumer Contract ID: {comparison.consumerContractId}</p>
            <p>Provider Contract ID: {comparison.providerContractId}</p>
            <p>Status: {comparisonStatusDisplay(comparison)}</p> */}
                <Table>
                  <thead>
                    <tr>
                      {Object.keys(comparison).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(comparison).map((value, index) => (
                        <td key={index}>{JSON.stringify(value)}</td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </Card>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="matrix">
          <Matrix comparisons={comparisons} />
        </Tabs.Panel>
        <Tabs.Panel value="webhooks">
          <h4>Webhooks</h4>
        </Tabs.Panel>
        <Tabs.Panel value="raw">
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
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export { Integration };
