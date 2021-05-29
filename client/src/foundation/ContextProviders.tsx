import { FunctionComponent } from "react";
import { AuthenticationProvider } from "../context/authentication-context";
import { DialogsProvider } from "../context/dialogs";
import { ThemeProvider } from "../context/theme-context";

export const ContextProviders: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <DialogsProvider>{children}</DialogsProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};
