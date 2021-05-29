import { Menu } from "../common/menus/Menu";
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
    <Menu isOpen={isOpen} toggleMenu={toggleSettingsMenu} anchorEl={anchorEl}>
      <ThemeMenuItem />
      <AuthenticationMenuItem />
    </Menu>
  );
};
