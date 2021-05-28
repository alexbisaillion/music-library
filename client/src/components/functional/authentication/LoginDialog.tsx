import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useAuthentication } from "../../../context/authentication";

type LoginDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};
export const LoginDialog = (props: LoginDialogProps) => {
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

  // TODO: Add global dialog handling and get rid of this workaround.
  const stopPropagationForTab = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };

  return (
    <Dialog
      onClose={() => setIsDialogOpen(false)}
      open={isDialogOpen}
      onKeyDown={stopPropagationForTab}
    >
      <DialogTitle>Log in</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
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
