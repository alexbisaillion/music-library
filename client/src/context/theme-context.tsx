import { createMuiTheme, Theme } from "@material-ui/core";
import { teal, pink } from "@material-ui/core/colors";
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from "react";

type ThemeContextProps = {
  useDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
};
export const ThemeContext =
  createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [useDarkMode, setUseDarkMode] = useState(true);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: useDarkMode ? "dark" : "light",
          primary: teal,
          secondary: pink,
        },
        props: {
          MuiInput: { inputProps: { spellCheck: "false" } },
        },
      }),
    [useDarkMode]
  );

  const toggleDarkMode = () => setUseDarkMode(!useDarkMode);

  return (
    <ThemeContext.Provider value={{ useDarkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Attempted to access useTheme without provider wrapper");
  }
  return context;
};
