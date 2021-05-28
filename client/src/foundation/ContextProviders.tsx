import { FunctionComponent } from "react";
import { AuthenticationProvider } from "../context/authentication";
import { DialogsProvider } from "../context/dialogs";
import { ThemeProvider } from "../context/theme";

export const ContextProviders: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <DialogsProvider>{children}</DialogsProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};
