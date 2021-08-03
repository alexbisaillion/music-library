import { ContextProviders } from "./ContextProviders";
import { Router } from "./Router";
import { ThemeWrapper } from "./ThemeWrapper";

export const App = () => {
  return (
    <ContextProviders>
      <ThemeWrapper>
        <Router />
      </ThemeWrapper>
    </ContextProviders>
  );
};
