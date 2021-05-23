import { FunctionComponent } from "react";
import { AuthenticationProvider } from "../context/authentication";
import { ThemeProvider } from "../context/theme";

export const ContextProviders: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>{children}</AuthenticationProvider>
    </ThemeProvider>
  );
};
