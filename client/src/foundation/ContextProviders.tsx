import { FunctionComponent } from "react";
import { AuthenticationProvider } from "../context/authentication-context";
import { DialogProvider } from "../context/dialogs-context";
import { ThemeProvider } from "../context/theme-context";

export const ContextProviders: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <DialogProvider>{children}</DialogProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};
