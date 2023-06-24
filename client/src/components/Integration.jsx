/* eslint-disable react/prop-types */

import { useParams } from "react-router-dom";

const Integration = ({ integrations, contracts }) => {
  const { integrationId } = useParams();
  const integration = integrations.find(
    (integration) => integration.integrationId === Number(integrationId)
  );
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
          Contracts:
          <div>
            Provider:
            <pre></pre>
          </div>
        </li>
      </ul>
    </>
  );
};

export { Integration };
