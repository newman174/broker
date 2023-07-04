import PropTypes from "prop-types";

import { Accordion } from "@mantine/core";
import { partition } from "lodash";

const ComparisonDetails = ({ path, tests }) => {
  const [errors, warnings] = partition(tests, { type: "error" });
  console.log(errors, warnings);
  return (
    <>
      <Accordion
        variant="separated"
        styles={{
          label: {
            color: "red",
          },
          "&[data-accordian]": {
            border: "solid red",
          },
          item: {
            border: "solid red",
            width: "100%",
            "&[data-active]": {
              border: "solid red",
            },
          },
        }}
      >
        <h3>{path}</h3>
        {errors.map(({ code, message, mockDetails }) => {
          let { location, value } = mockDetails;
          if (typeof value === "string") value = `"${value}"`;

          const equality = `${location} = ${value}`;
          return (
            <Accordion.Item key={equality} value={equality}>
              <Accordion.Control>
                <h4>{code}</h4>
              </Accordion.Control>
              <Accordion.Panel>
                <>
                  <p>{message}</p>
                  <p>{equality}</p>
                </>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <Accordion
        variant="separated"
        styles={{
          label: {
            color: "orange",
          },
          item: {
            border: "solid orange",
            width: "100%",
            "&[data-active]": {
              border: "solid orange",
            },
          },
        }}
      >
        {warnings.map(({ code, message, mockDetails }) => {
          let { location, value } = mockDetails;
          if (typeof value === "string") value = `"${value}"`;

          const equality = `${location} = ${value}`;
          return (
            <Accordion.Item key={equality} value={equality}>
              <Accordion.Control>
                <h4>{code}</h4>
              </Accordion.Control>
              <Accordion.Panel>
                <>
                  <p>{message}</p>
                  <p>{equality}</p>
                </>
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
