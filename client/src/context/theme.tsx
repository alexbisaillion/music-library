import { createMuiTheme, Theme } from "@material-ui/core";
import { cyan, pink } from "@material-ui/core/colors";
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from "react";

const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: cyan,
    secondary: pink,
  },
  props: {
    MuiInput: { inputProps: { spellCheck: "false" } },
  },
});

const LightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: cyan,
    secondary: pink,
  },
  props: {
    MuiInput: { inputProps: { spellCheck: "false" } },
  },
});

type ThemeContextProps = {
  useDarkMode: boolean;
  setUseDarkMode: (useDarkMode: boolean) => void;
  theme: Theme;
};
export const ThemeContext =
  createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [useDarkMode, setUseDarkMode] = useState(true);

  const theme = useMemo(
    () => (useDarkMode ? DarkTheme : LightTheme),
    [useDarkMode]
  );

  return (
    <ThemeContext.Provider value={{ useDarkMode, setUseDarkMode, theme }}>
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
