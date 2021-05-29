import { forwardRef } from "react";
import { useAuthentication } from "../../../context/authentication";
import { DialogType, useDialogs } from "../../../context/dialogs";
import { MenuListItem } from "../../common/menus/MenuListItem";
import { LoginIcon, LogoutIcon } from "../../icons/material-icons";

export const AuthenticationMenuItem = forwardRef<HTMLLIElement>(
  (_props, ref) => {
    const { isLoggedIn, attemptLogout } = useAuthentication();
    const { showDialog } = useDialogs();

    return (
      <MenuListItem
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
