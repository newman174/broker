import { useState } from "react";

import {
  //  Text,
  ActionIcon,
  Card,
  Title,
  Box,
  NavLink,
  Grid,
} from "@mantine/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import WebhooksSubmenu from "./WebhooksSubmenu.jsx";

const subMenus = {
  General: <Title order={3}>General</Title>,
  Webhooks: <WebhooksSubmenu />,
};

const SettingsMenu = () => {
  const [active, setActive] = useState(0);
  const path = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <Card>
      <ActionIcon
        variant="outline"
        onClick={() => navigate(-1)}
        title="Close"
        style={{ marginLeft: "auto", marginRight: 0, display: "block" }}
      >
        <IconX size={24} />
      </ActionIcon>
      <Title order={1} style={{ margin: "auto", marginBottom: "2rem" }}>
        Settings
      </Title>
      <Grid grow>
        <Grid.Col span={1}>
          <Box w={240}>
            {Object.keys(subMenus).map((key, index) => {
              return (
                <NavLink
                  label={key}
                  key={key}
                  to={`./${key.toLowerCase()}`}
                  active={index === active}
                  onClick={() => setActive(index)}
                  component={Link}
                />
              );
            })}
          </Box>
        </Grid.Col>
        <Grid.Col span={9}>
          <Card>{Object.values(subMenus)[active]}</Card>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default SettingsMenu;
