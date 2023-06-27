import { useState, useEffect } from "react";
// import { ArrowsLeftRight } from "tabler-icons-react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "@mantine/core";

const IntegrationNavLinks = ({ integrations }) => {
  const [active, setActive] = useState(0);
  const path = useLocation().pathname;

  useEffect(() => {
    if (path === "/") {
      setActive(-1);
    }
  }, [path]);

  return integrations.map((integration, index) => {
    const nameString = `${integration.consumer.participantName} ⇄
    ${integration.provider.participantName}`;

    return (
      // <ArrowsLeftRight size={24} />
      <NavLink
        to={`/integrations/${integration.integrationId}`}
        label={nameString}
        key={nameString}
        active={index === active}
        onClick={() => setActive(index)}
        component={Link}
      />
    );
  });
};

export default IntegrationNavLinks;
