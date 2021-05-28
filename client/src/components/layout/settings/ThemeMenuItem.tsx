import { useTheme } from "../../../context/theme";
import { MenuListItem } from "../../common/menus/MenuListItem";
import { DarkModeIcon, LightModeIcon } from "../../icons/material-icons";

export const ThemeMenuItem = () => {
  const { useDarkMode, toggleDarkMode } = useTheme();
  return (
    <MenuListItem
      onClick={toggleDarkMode}
      text={useDarkMode ? "Toggle light mode" : "Toggle dark mode"}
      icon={useDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    />
  );
};
