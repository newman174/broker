/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { comparisonService } from "../services/apiService.js";

const Integration = ({ integrations }) => {
  const { integrationId } = useParams();
  const integration = integrations.find(
    (integration) => integration.integrationId === Number(integrationId)
  );

  const [comparisons, setComparisons] = useState([]);

  console.log(comparisons);
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
    if (comparison.comparisonStatus === "false") {
      return <span style={{ color: "red", fontWeight: "bold" }}>failed</span>;
    } else if (comparison.comparisonStatus === "true") {
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
        {integration.consumer.participantName} -{" "}
        {integration.provider.participantName}
      </h3>
      <ul>
        <li>Integration ID: {integrationId}</li>
        <li>Consumer ID: {integration.consumer.participantId}</li>
        <li>Provider ID: {integration.provider.participantId}</li>
      </ul>

      <h4>Comparisons</h4>
      <div>
        {comparisons.map((comparison) => (
          <div
            style={{
              border: "1px solid black",
              marginBottom: "1rem",
              borderRadius: "5px",
              padding: "1rem",
            }}
            key={comparison.comparisonId}
          >
            <p>Comparison ID: {comparison.comparisonId}</p>
            <p>Consumer Contract ID: {comparison.consumerContractId}</p>
            <p>Provider Contract ID: {comparison.providerContractId}</p>
            <p>Status: {comparisonStatusDisplay(comparison)}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export { Integration };
