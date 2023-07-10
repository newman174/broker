import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MultiSelect, Navbar, Text, Flex } from "@mantine/core";

import PropTypes from "prop-types";
import Integration from "../models/Integration.js";

import IntegrationNavLinks from "./IntegrationNavLinks.jsx";
import { unique } from "../utils/helpers.js";

const IntegrationsNavBar = ({ integrations }) => {
  const [integrationsFilter, setIntegrationsFilter] = useState([]);

  const navigate = useNavigate();

  const filteredIntegrations = (filters) =>
    integrationsFilter
      ? integrations.filter((integration) =>
          filters?.every(
            (name) =>
              integration.consumer.name === name ||
              integration.provider.name === name
          )
        )
      : integrations;

  const participantNames = unique(
    integrations
      .map((integration) => [
        integration.consumer.name,
        integration.provider.name,
      ])
      .flat()
  );

  return (
    <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      <Flex style={{ marginBottom: "1rem" }} align={"center"}>
        <MultiSelect
          style={{ flexGrow: "1" }}
          data={participantNames.map((name) => {
            return { value: name, label: name };
          })}
          value={integrationsFilter}
          maxSelectedValues={2}
          onChange={(value) => {
            setIntegrationsFilter(value);
            if (filteredIntegrations(value).length === 0) {
              navigate("/");
            } else {
              navigate(`/integrations/${filteredIntegrations(value)[0].id}`);
            }
          }}
          clearable
          placeholder="Select participants"
        />
      </Flex>

      <Text style={{ opacity: "50%" }}>Integrations</Text>

      <IntegrationNavLinks
        integrations={filteredIntegrations(integrationsFilter)}
      />
    </Navbar>
  );
};

IntegrationsNavBar.propTypes = {
  integrations: PropTypes.arrayOf(PropTypes.instanceOf(Integration)).isRequired,
};

export default IntegrationsNavBar;
