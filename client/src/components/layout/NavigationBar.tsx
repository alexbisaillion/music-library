import styled from "styled-components";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { useAuthentication } from "../../context/authentication";

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
  const { isLoggedIn, attemptLogout } = useAuthentication();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const renderLoginStatus = () => {
    return isLoggedIn ? (
      <Button color="inherit" onClick={() => attemptLogout()}>
        Log out
      </Button>
    ) : (
      <Button color="inherit" onClick={() => setIsDialogOpen(true)}>
        Log in
      </Button>
    );
  };

  return (
    <>
      <NavBarContainer>
        <AppBar position="static">
          <Toolbar variant="dense">
            <StyledIconButton
              edge="start"
              color="inherit"
              onClick={() => menuOnClick()}
            >
              <MenuIcon />
            </StyledIconButton>
            <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
              Alex Bisaillion
            </Typography>
            {renderLoginStatus()}
          </Toolbar>
        </AppBar>
      </NavBarContainer>
      <LoginDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

type LoginDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};
const LoginDialog = (props: LoginDialogProps) => {
  const { attemptLogin } = useAuthentication();
  const { isDialogOpen, setIsDialogOpen } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const executeLogin = async (username: string, password: string) => {
    const success = await attemptLogin(username, password);
    if (success) {
      setUsername("");
      setPassword("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
      <DialogTitle>Log in</DialogTitle>
      <DialogContent>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => executeLogin(username, password)}>Log in</Button>
      </DialogActions>
    </Dialog>
  );
};
