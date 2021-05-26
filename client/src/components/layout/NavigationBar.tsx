import styled from "styled-components";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { useAuthentication } from "../../context/authentication";
import { useTheme } from "../../context/theme";
import {
  DarkModeIcon,
  LightModeIcon,
  MenuToggleIcon,
} from "../icons/material-icons";
import { LoginButton } from "../functional/authentication/LoginButton";
import { LogoutButton } from "../functional/authentication/LogoutButton";
import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { Heading } from "../common/text/Heading";

const NavigationBarContainer = styled.div`
  flex-grow: 1;
`;

const StyledIconButton = styled(IconButton)`
  margin-right: 16px;
`;

export const NavigationBar = () => {
  const { isLoggedIn } = useAuthentication();
  const { useDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderLoginStatus = () => {
    return isLoggedIn ? <LogoutButton /> : <LoginButton />;
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <NavigationBarContainer>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <StyledIconButton
              edge="start"
              color="inherit"
              onClick={toggleSidebar}
            >
              <MenuToggleIcon />
            </StyledIconButton>
            {/* style={{ flex: 1 }} */}
            <Heading text="Alex Bisaillion" />
            <IconButton onClick={toggleDarkMode}>
              {useDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {renderLoginStatus()}
          </Toolbar>
        </AppBar>
      </NavigationBarContainer>
      <LeftSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};
