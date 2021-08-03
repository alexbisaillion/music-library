import { forwardRef } from "react";
import { useTheme } from "../../../context/theme-context";
import { MenuItem } from "../../common/menus/MenuItem";
import { DarkModeIcon, LightModeIcon } from "../../icons/material-icons";

export const ThemeMenuItem = forwardRef<HTMLLIElement>((_props, ref) => {
  const { useDarkMode, toggleDarkMode } = useTheme();
  return (
    <MenuItem
      ref={ref}
      onClick={toggleDarkMode}
      text={useDarkMode ? "Toggle light mode" : "Toggle dark mode"}
      icon={useDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    />
  );
});
