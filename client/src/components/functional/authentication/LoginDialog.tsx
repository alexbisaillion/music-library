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
import { DialogType, useDialogs } from "../../../context/dialogs";

export const LoginDialog = () => {
  const { attemptLogin } = useAuthentication();
  const { hideDialog } = useDialogs();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const executeLogin = async (username: string, password: string) => {
    const success = await attemptLogin(username, password);
    if (success) {
      setUsername("");
      setPassword("");
      hideDialog(DialogType.Login);
    }
  };

  return (
    <Dialog onClose={() => hideDialog(DialogType.Login)} open>
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
        <Button onClick={() => hideDialog(DialogType.Login)}>Cancel</Button>
        <Button onClick={() => executeLogin(username, password)}>Log in</Button>
      </DialogActions>
    </Dialog>
  );
};
