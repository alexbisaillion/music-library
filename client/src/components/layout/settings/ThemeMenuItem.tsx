import { forwardRef } from "react";
import { useTheme } from "../../../context/theme";
import { MenuListItem } from "../../common/menus/MenuListItem";
import { DarkModeIcon, LightModeIcon } from "../../icons/material-icons";

export const ThemeMenuItem = forwardRef<HTMLLIElement>((_props, ref) => {
  const { useDarkMode, toggleDarkMode } = useTheme();
  return (
    <MenuListItem
      ref={ref}
      onClick={toggleDarkMode}
      text={useDarkMode ? "Toggle light mode" : "Toggle dark mode"}
      icon={useDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    />
  );
});
