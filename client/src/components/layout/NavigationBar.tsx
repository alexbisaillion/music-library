import styled from "styled-components";
import { AppBar, Divider, Toolbar } from "@material-ui/core";
import { MenuToggleIcon } from "../icons/material-icons";
import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { Heading } from "../common/text/Heading";
import { IconButton } from "../common/forms/IconButton";
import { SettingsButton } from "../functional/settings/SettingsButton";
import { pathDisplayValues, RouterPath } from "../../foundation/Router";

const NavigationBarContainer = styled.div`
  flex-grow: 1;
`;

const MenuIconButton = styled(IconButton)`
  && {
    margin-right: 16px;
  }
`;

const getLocationDisplayValue = (location: string) => {
  const matchingPath = Object.values(RouterPath).find((path) =>
    location.endsWith(path)
  );
  return matchingPath ? pathDisplayValues[matchingPath] : undefined;
};

const StyledDivider = styled(Divider)`
  && {
    height: 24px;
    margin: 0 16px;
    width: 1.5px;
  }
`;

export const NavigationBar = () => {
  console.log(getLocationDisplayValue(window.location.href));
  // const location = useLocation();
  // console.log(location);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <NavigationBarContainer>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <MenuIconButton onClick={toggleSidebar} icon={<MenuToggleIcon />} />
            <Heading text="Alex Bisaillion" />
            <StyledDivider orientation="vertical" color="textSecondary" />
            <Heading
              text={getLocationDisplayValue(window.location.href) || ""}
              isSecondary
            />
            <SettingsButton />
          </Toolbar>
        </AppBar>
      </NavigationBarContainer>
      <LeftSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};
