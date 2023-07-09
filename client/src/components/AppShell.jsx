import { useState } from "react";
import {
  AppShell,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import AppShellHeader from "./AppShellHeader.jsx";
import IntegrationsNavBar from "./IntegrationsNavBar.jsx";
import PropTypes from "prop-types";
import Integration from "../models/Integration.js";

const MyAppShell = ({ children, integrations }) => {
  const [navbarOpened, setNavbarOpened] = useState(false);

  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === "dark";

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
        <IntegrationsNavBar
          integrations={integrations}
          hidden={!navbarOpened}
        />
      }
      header={
        <AppShellHeader
          navbarOpened={navbarOpened}
          setNavbarOpened={setNavbarOpened}
          theme={theme}
          toggleColorScheme={toggleColorScheme}
          dark={dark}
        />
      }
    >
      {children}
    </AppShell>
  );
};

MyAppShell.propTypes = {
  children: PropTypes.node.isRequired,
  integrations: PropTypes.arrayOf(PropTypes.instanceOf(Integration)).isRequired,
};

export default MyAppShell;
