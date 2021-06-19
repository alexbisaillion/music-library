import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "../components/pages/home/Home";
import { RegisterAlbum } from "../components/scrobble-proxy/register-album/RegisterAlbum";
import { ErrorPage } from "../components/pages/ErrorPage";
import { useAuthentication } from "../context/authentication-context";
import { BaseAppComponents } from "./BaseAppComponents";
import { Experience } from "../components/pages/Experience";

export enum RouterPath {
  Home = "/",
  Experience = "/experience",
  Projects = "/projects",
  ScrobbleProxyRegisterAlbum = "/scrobble-proxy/register-album",
}
type RouterPathDisplayValues = { [key in RouterPath]: string };
export const pathDisplayValues: RouterPathDisplayValues = {
  "/": "Home",
  "/experience": "Experience",
  "/projects": "Projects",
  "/scrobble-proxy/register-album": "Register Album",
};

export const Router = () => {
  const { isLoggedIn } = useAuthentication();

  const renderAuthenticatedPage = (page: JSX.Element): JSX.Element => {
    return isLoggedIn ? page : <ErrorPage />;
  };

  return (
    <BrowserRouter>
      <BaseAppComponents />
      <Route exact path={RouterPath.Home} component={Home} />
      <Route path={RouterPath.Experience} component={Experience} />
      {/* Use the new Routes component when React Router DOM is updated to v6 */}
      {/* https://stackoverflow.com/a/49321289 */}
      <Route
        path={RouterPath.ScrobbleProxyRegisterAlbum}
        render={() => renderAuthenticatedPage(<RegisterAlbum />)}
      />
    </BrowserRouter>
  );
};
