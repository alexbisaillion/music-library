import styled from "styled-components";
import { AppBar, Divider, Toolbar } from "@material-ui/core";
import { MenuToggleIcon } from "../icons/material-icons";
import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { Heading } from "../common/text/Heading";
import { IconButton } from "../common/forms/IconButton";
import { SettingsButton } from "../functional/settings/SettingsButton";
import { pathDisplayValues, RouterPath } from "../../foundation/Router";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

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
    margin: 0 12px;
    width: 1.5px;
  }
`;

const StyledHeading = styled(Heading)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const NavigationBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { pathname } = useLocation();
  const pathDisplay = useMemo(
    () => getLocationDisplayValue(pathname),
    [pathname]
  );

  return (
    <>
      <NavigationBarContainer>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <MenuIconButton onClick={toggleSidebar} icon={<MenuToggleIcon />} />
            <StyledHeading text="Alex Bisaillion" />
            {pathDisplay && (
              <>
                <StyledDivider orientation="vertical" color="textSecondary" />
                <StyledHeading text={pathDisplay} isSecondary />
              </>
            )}
            <SettingsButton />
          </Toolbar>
        </AppBar>
      </NavigationBarContainer>
      <LeftSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};
