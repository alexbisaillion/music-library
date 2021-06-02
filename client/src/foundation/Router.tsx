import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "../components/pages/home/Home";
import { RegisterAlbum } from "../components/scrobble-proxy/register-album/RegisterAlbum";
import { ErrorPage } from "../components/pages/ErrorPage";
import { useAuthentication } from "../context/authentication-context";
import { BaseAppComponents } from "./BaseAppComponents";
import { Experience } from "../components/pages/Experience";

export const Router = () => {
  const { isLoggedIn } = useAuthentication();

  const renderAuthenticatedPage = (page: JSX.Element): JSX.Element => {
    return isLoggedIn ? page : <ErrorPage />;
  };

  return (
    <BrowserRouter>
      <BaseAppComponents />
      <Route exact path="/" component={Home} />
      <Route path="/experience" component={Experience} />
      {/* Use the new Routes component when React Router DOM is updated to v6 */}
      {/* https://stackoverflow.com/a/49321289 */}
      <Route
        path="/scrobble-proxy/register-album"
        render={() => renderAuthenticatedPage(<RegisterAlbum />)}
      />
      <Route
        path="/updateAlbumTracks"
        render={() => renderAuthenticatedPage(<p>logged in</p>)}
      />
    </BrowserRouter>
  );
};
