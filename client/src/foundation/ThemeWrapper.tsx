import { useTheme } from "../context/theme-context";
import { MuiThemeProvider } from "@material-ui/core";
import { FunctionComponent } from "react";

export const ThemeWrapper: FunctionComponent = ({ children }) => {
  const { theme } = useTheme();
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
