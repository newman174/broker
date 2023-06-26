/* eslint-disable react/prop-types */

import { useParams } from "react-router-dom";

const Integration = ({ integrations, contracts, comparisons }) => {
  const { integrationId } = useParams();
  const integration = integrations.find(
    (integration) => integration.integrationId === Number(integrationId)
  );
  const comparisonsForIntegration = comparisons.filter(
    (comparison) => comparison.integrationId === integration.integrationId
  );
  console.log(comparisons);
  console.log("integration", integration);
  const { consumerName, consumerId, providerName, providerId } = integration;

  return (
    <>
      <h3>
        {consumerName} - {providerName}
      </h3>
      <ul>
        <li>Integration ID: {integrationId}</li>
        <li>Consumer ID: {consumerId}</li>
        <li>Provider ID: {providerId}</li>
        <li>
          Comparisons:
          {comparisonsForIntegration.map((comparison) => {
            return (
              <ul key={comparison.ComparisonId}>
                <li>
                  Consumer Contract:
                  {JSON.stringify(
                    contracts.find(
                      (contract) =>
                        contract.contractId === comparison.consumerContractId
                    ).contract
                  )}
                </li>
                <li>
                  Provider Contract:{" "}
                  {JSON.stringify(
                    contracts.find(
                      (contract) =>
                        contract.contractId === comparison.providerContractId
                    ).contract
                  )}
                </li>
              </ul>
            );
          })}
        </li>
      </ul>
    </>
  );
};

export { Integration };
