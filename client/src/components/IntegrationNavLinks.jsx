import { useState, useEffect } from "react";
// import { ArrowsLeftRight } from "tabler-icons-react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "@mantine/core";

const IntegrationNavLinks = ({ integrations }) => {
  const [active, setActive] = useState(0);
  const path = useLocation().pathname;

  useEffect(() => {
    if (!path.match(/.*integrations.*/i)) {
      setActive(-1);
    }
  }, [path]);

  return integrations.map((integration, index) => {
    const nameString = `${integration.consumer.name} ⇄
    ${integration.provider.name}`;

    return (
      // <ArrowsLeftRight size={24} />
      <NavLink
        to={`/integrations/${integration.id}`}
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
