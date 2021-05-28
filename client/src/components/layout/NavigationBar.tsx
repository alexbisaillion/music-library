import styled from "styled-components";
import { AppBar, Toolbar } from "@material-ui/core";
import { MenuToggleIcon } from "../icons/material-icons";
import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { Heading } from "../common/text/Heading";
import { IconButton } from "../common/forms/IconButton";
import { SettingsButton } from "../functional/settings/SettingsButton";

const NavigationBarContainer = styled.div`
  flex-grow: 1;
`;

const MenuIconButton = styled(IconButton)`
  && {
    margin-right: 16px;
  }
`;

export const NavigationBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <NavigationBarContainer>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <MenuIconButton onClick={toggleSidebar} icon={<MenuToggleIcon />} />
            <Heading text="Alex Bisaillion" />
            <SettingsButton />
          </Toolbar>
        </AppBar>
      </NavigationBarContainer>
      <LeftSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};
