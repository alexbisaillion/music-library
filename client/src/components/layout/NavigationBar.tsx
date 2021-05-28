import styled from "styled-components";
import { AppBar, Toolbar } from "@material-ui/core";
import { useAuthentication } from "../../context/authentication";
import { useTheme } from "../../context/theme";
import {
  DarkModeIcon,
  LightModeIcon,
  MenuToggleIcon,
  SettingsIcon,
} from "../icons/material-icons";
import { LoginButton } from "../functional/authentication/LoginButton";
import { LogoutButton } from "../functional/authentication/LogoutButton";
import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { Heading } from "../common/text/Heading";
import { IconButton } from "../common/forms/IconButton";

const NavigationBarContainer = styled.div`
  flex-grow: 1;
`;

const MenuIconButton = styled(IconButton)`
  && {
    margin-right: 16px;
  }
`;

const SettingsIconButton = styled(IconButton)`
  && {
    margin-left: auto;
  }
`;

export const NavigationBar = () => {
  const { isLoggedIn } = useAuthentication();
  const { useDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const renderLoginStatus = () => {
    return isLoggedIn ? <LogoutButton /> : <LoginButton />;
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSettingsMenu = () => setIsSettingsMenuOpen(!isSettingsMenuOpen);

  return (
    <>
      <NavigationBarContainer>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <MenuIconButton onClick={toggleSidebar} icon={<MenuToggleIcon />} />
            <Heading text="Alex Bisaillion" />
            <IconButton
              onClick={toggleDarkMode}
              icon={useDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            />
            {renderLoginStatus()}
            <SettingsIconButton
              onClick={toggleSettingsMenu}
              icon={<SettingsIcon />}
            />
          </Toolbar>
        </AppBar>
      </NavigationBarContainer>
      <LeftSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};
