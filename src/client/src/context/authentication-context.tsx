import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { getIsLoggedIn, login, logout } from "../api/authentication";

type AuthenticationContextProps = {
  isLoggedIn: boolean;
  attemptLogin: (username: string, password: string) => Promise<boolean>;
  attemptLogout: () => Promise<void>;
};
export const AuthenticationContext =
  createContext<AuthenticationContextProps | undefined>(undefined);

export const AuthenticationProvider: FunctionComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchIsLoggedIn() {
      setIsLoggedIn(await getIsLoggedIn());
    }
    fetchIsLoggedIn();
  }, []);

  const attemptLogin = async (username: string, password: string) => {
    const result = await login({ username, password });
    setIsLoggedIn(result);
    return result;
  };

  const attemptLogout = async () => {
    const success = await logout();
    if (success) {
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ isLoggedIn, attemptLogin, attemptLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "Unable to access useAuthentication without provider wrapper"
    );
  }
  return context;
};
