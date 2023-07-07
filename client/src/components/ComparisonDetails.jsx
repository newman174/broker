import PropTypes from "prop-types";

import { Accordion, ThemeIcon, Group, Title, Text } from "@mantine/core";
import { AlertCircle, CircleX } from "tabler-icons-react";
import { Prism } from "@mantine/prism";

const ComparisonDetails = ({ path, tests }) => {
  return (
    <>
      <Accordion
        multiple={true}
        variant="separated"
        styles={{
          label: {},
          item: {
            width: "100%",
            "&[data-type='error']": {
              border: "solid red",
            },
            "&[data-type='warning']": {
              border: "solid orange",
            },
          },
        }}
      >
        <Title order={3} mb={"md"}>
          {path}
        </Title>
        {tests.map(({ code, message, mockDetails, type }) => {
          let { location, value } = mockDetails;
          const equality = `${location} = ${JSON.stringify(value)}`;

          return (
            <Accordion.Item key={equality} value={equality} data-type={type}>
              <Accordion.Control data-type={type}>
                <Group spacing="xs">
                  <ThemeIcon
                    color={type === "error" ? "red" : "orange"}
                    size={24}
                    radius="xl"
                  >
                    {type === "error" ? (
                      <CircleX size="1rem" />
                    ) : (
                      <AlertCircle size="1rem" />
                    )}
                  </ThemeIcon>
                  <Title
                    order={5}
                    style={{ color: type === "error" ? "red" : "orange" }}
                  >
                    {code}
                  </Title>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>{message}</Text>
                <Prism language="jsx">{equality}</Prism>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
};

ComparisonDetails.propTypes = {
  path: PropTypes.string,
  tests: PropTypes.array,
};

export default ComparisonDetails;
