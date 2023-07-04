import Comparison from "../models/Comparison.js";
import PropTypes from "prop-types";
import { ThemeIcon, Card, Accordion, Stack, Text, Group } from "@mantine/core";
import { CircleCheck, CircleX, AlertCircle } from "tabler-icons-react";
import { Prism } from "@mantine/prism";

const Interactions = ({ comparison }) => {
  const { result, consumerContract } = comparison;
  const interactions = consumerContract.contract.interactions.map(
    ({ description, request, response }) => ({
      description,
      request,
      response,
      errors: [],
      warnings: [],
    })
  );

  const getType = (errors, warnings) => {
    if (errors.length > 0) {
      return "error";
    } else if (warnings.length > 0) {
      return "warning";
    }
    return "success";
  };

  const typeColor = {
    error: "red",
    warning: "orange",
    success: "green",
  };

  const typeIcon = {
    error: <CircleX size="1rem" />,
    warning: <AlertCircle size="1rem" />,
    success: <CircleCheck size="1rem" />,
  };

  for (const test of [...result.errors, ...result.warnings]) {
    const interactionIdx = test.mockDetails.location.match(
      /interactions\[(\d+)\]/
    )[1];
    interactions[interactionIdx][
      test.type === "error" ? "errors" : "warnings"
    ].push(test);
  }
  //console.log(interactions);
  return (
    <>
      <h3 style={{ textAlign: "left" }}>Interactions</h3>
      <Accordion
        multiple={true}
        variant="separated"
        styles={{
          label: {},
          item: {},
        }}
      >
        {interactions.map(
          ({ description, request, response, errors, warnings }, idx) => {
            const type = getType(errors, warnings);
            return (
              <Accordion.Item
                key={idx}
                value={`interation ${idx}`}
                style={{ textAlign: "left" }}
              >
                <Accordion.Control>
                  <Group spacing="xs">
                    <ThemeIcon color={typeColor[type]} size={24} radius="xl">
                      {typeIcon[type]}
                    </ThemeIcon>
                    <Text color={"blue"}>
                      {description[0].toUpperCase() + description.slice(1)}
                    </Text>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <h3>Request </h3>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack>
                      <Group spacing="xs">
                        <Text fw={700}>Method:</Text>
                        <Text>{request.method}</Text>
                      </Group>
                      <Group spacing="xs">
                        <Text fw={700}>Path:</Text>
                        <Text>{request.path}</Text>
                      </Group>
                    </Stack>
                  </Card>

                  <h3>Expected Response</h3>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack>
                      <Group spacing="xs">
                        <Text fw={700}>Status:</Text>
                        <Text>{response.status}</Text>
                      </Group>
                      <Text fw={700}>Headers:</Text>
                      <Prism language="json">
                        {JSON.stringify(response.headers)}
                      </Prism>
                      {response.body ? (
                        <>
                          <Text fw={700}>Body:</Text>
                          <Prism language="json">
                            {JSON.stringify(response.body)}
                          </Prism>
                        </>
                      ) : null}
                    </Stack>
                  </Card>
                </Accordion.Panel>
              </Accordion.Item>
            );
          }
        )}
      </Accordion>
    </>
  );
};

Interactions.propTypes = {
  comparison: PropTypes.instanceOf(Comparison).isRequired,
};
export default Interactions;
