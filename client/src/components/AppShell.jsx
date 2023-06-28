import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  // Footer,
  // Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import IntegrationNavLinks from "./IntegrationNavLinks.jsx";
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const MyAppShell = ({ children, integrations }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text style={{ opacity: "50%" }}>Integrations</Text>
          <IntegrationNavLinks integrations={integrations} />
        </Navbar>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Link to={"/"}>Signet Broker</Link>
            <div style={{ marginLeft: "auto" }}>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
             {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
           </ActionIcon>
            </div>
          </div>
        </Header>
      }
    >
      {/* <Text>Resize app to see responsive navbar in action</Text> */}
      {children}
    </AppShell>
  );
};

MyAppShell.propTypes = {
  children: PropTypes.node.isRequired,
  integrations: PropTypes.arrayOf(
    PropTypes.shape({
      integrationId: PropTypes.number.isRequired,
      consumer: PropTypes.shape({
        participantId: PropTypes.number.isRequired,
        participantName: PropTypes.string.isRequired,
      }).isRequired,
      provider: PropTypes.shape({
        participantId: PropTypes.number.isRequired,
        participantName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default MyAppShell;
