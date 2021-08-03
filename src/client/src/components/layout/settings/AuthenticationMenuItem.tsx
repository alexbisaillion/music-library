import { forwardRef } from "react";
import { useAuthentication } from "../../../context/authentication-context";
import { DialogType, useDialog } from "../../../context/dialogs-context";
import { MenuItem } from "../../common/menus/MenuItem";
import { LoginIcon, LogoutIcon } from "../../icons/material-icons";

export const AuthenticationMenuItem = forwardRef<HTMLLIElement>(
  (_props, ref) => {
    const { isLoggedIn, attemptLogout } = useAuthentication();
    const { showDialog } = useDialog();

    return (
      <MenuItem
        ref={ref}
        onClick={() => {
          if (isLoggedIn) {
            attemptLogout();
          } else {
            showDialog(DialogType.Login);
          }
        }}
        text={isLoggedIn ? "Log out" : "Log in"}
        icon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
      />
    );
  }
);
