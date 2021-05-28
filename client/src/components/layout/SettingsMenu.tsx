import { Menu } from "@material-ui/core";
import { AuthenticationMenuItem } from "./settings/AuthenticationMenuItem";
import { ThemeMenuItem } from "./settings/ThemeMenuItem";

type SettingsMenuProps = {
  isOpen: boolean;
  toggleSettingsMenu: () => void;
  anchorEl: HTMLButtonElement | null;
};
export const SettingsMenu = ({
  isOpen,
  toggleSettingsMenu,
  anchorEl,
}: SettingsMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      // getContentAnchorEl={null}
      // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      // transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      onClose={toggleSettingsMenu}
    >
      <ThemeMenuItem />
      <AuthenticationMenuItem />
    </Menu>
  );
};
