import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useAuthentication } from "../../../context/authentication-context";
import { useDialog } from "../../../context/dialogs-context";

export const LoginDialog = () => {
  const { attemptLogin } = useAuthentication();
  const { hideDialog } = useDialog();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const executeLogin = async (username: string, password: string) => {
    const success = await attemptLogin(username, password);
    if (success) {
      setUsername("");
      setPassword("");
      hideDialog();
    }
  };

  return (
    <Dialog onClose={() => hideDialog()} open>
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
        <Button onClick={() => hideDialog()}>Cancel</Button>
        <Button onClick={() => executeLogin(username, password)}>Log in</Button>
      </DialogActions>
    </Dialog>
  );
};
