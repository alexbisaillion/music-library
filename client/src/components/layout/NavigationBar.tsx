import styled from "styled-components";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { useAuthentication } from "../../context/authentication";
import { useTheme } from "../../context/theme";
import { DarkModeIcon, LightModeIcon, MenuToggleIcon } from "../icons/Material";
import { LoginButton } from "../functional/authentication/LoginButton";
import { LogoutButton } from "../functional/authentication/LogoutButton";

const NavBarContainer = styled.div`
  flex-grow: 1;
`;

const StyledIconButton = styled(IconButton)`
  margin-right: 16px;
`;

type NavigationBarProps = {
  menuOnClick: () => void;
};
export const NavigationBar = (props: NavigationBarProps) => {
  const { menuOnClick } = props;
  const { isLoggedIn } = useAuthentication();
  const { useDarkMode, toggleDarkMode } = useTheme();

  const renderLoginStatus = () => {
    return isLoggedIn ? <LogoutButton /> : <LoginButton />;
  };

  return (
    <NavBarContainer>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <StyledIconButton
            edge="start"
            color="inherit"
            onClick={() => menuOnClick()}
          >
            <MenuToggleIcon />
          </StyledIconButton>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            Alex Bisaillion
          </Typography>
          <IconButton onClick={toggleDarkMode}>
            {useDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          {renderLoginStatus()}
        </Toolbar>
      </AppBar>
    </NavBarContainer>
  );
};
