import { useState } from "react";
import { useAuthentication } from "../../../context/authentication";
import { MenuListItem } from "../../common/menus/MenuListItem";
import { LoginDialog } from "../../functional/authentication/LoginDialog";
import { LoginIcon, LogoutIcon } from "../../icons/material-icons";

export const AuthenticationMenuItem = () => {
  const { isLoggedIn, attemptLogout } = useAuthentication();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const toggleLoginDialog = () => setIsLoginDialogOpen(!isLoginDialogOpen);

  return (
    <>
      <MenuListItem
        onClick={isLoggedIn ? attemptLogout : toggleLoginDialog}
        text={isLoggedIn ? "Log out" : "Log in"}
        icon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
      />
      <LoginDialog
        isDialogOpen={isLoginDialogOpen}
        setIsDialogOpen={toggleLoginDialog}
      />
    </>
  );
};
