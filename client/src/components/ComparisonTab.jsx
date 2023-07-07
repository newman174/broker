import Comparison from "../models/Comparison.js";
import PropTypes from "prop-types";
import ComparisonDetails from "./ComparisonDetails.jsx";
import { Stack, Group, Title } from "@mantine/core";
import ReactTimeAgo from "react-time-ago";

const ComparisonTab = ({ comparison }) => {
  const pathTests = {};
  const result = comparison.result;

  for (const test of [...result.errors, ...result.warnings]) {
    const path = `${test.specDetails.pathMethod.toUpperCase()}  ${
      test.specDetails.pathName
    }`;
    if (!pathTests[path]) pathTests[path] = [];

    pathTests[path].push(test);
  }

  return (
    <>
      <Title order={3} mt={"lg"} style={{ textAlign: "left" }}>
        Contract Comparison Detail
      </Title>
      <Group spacing="10rem">
        <dl className="comparison-details">
          <dt>Contract Comparison Status</dt>
          <dd>{result.success ? "Compatible" : "Incompatible"}</dd>
        </dl>

        <dl className="comparison-details">
          <dt>Compared At</dt>
          <dd>
            <ReactTimeAgo date={comparison.createdAt} />
          </dd>
        </dl>
      </Group>
      <Stack justify="flex-start" style={{ textAlign: "left" }}>
        {Object.entries(pathTests).map(([path, tests]) => (
          <ComparisonDetails key={path} path={path} tests={tests} />
        ))}
      </Stack>
    </>
  );
};

ComparisonTab.propTypes = {
  comparison: PropTypes.instanceOf(Comparison).isRequired,
};

export default ComparisonTab;
