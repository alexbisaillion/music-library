import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { NavigationBar } from "../components/layout/NavigationBar";
import { RegisterAlbum } from "../components/scrobble-proxy/register-album/RegisterAlbum";
import { ErrorPage } from "../components/pages/ErrorPage";
import { useAuthentication } from "../context/authentication";

export const Router = () => {
  const { isLoggedIn } = useAuthentication();

  const renderAuthenticatedPage = (page: JSX.Element): JSX.Element => {
    return isLoggedIn ? page : <ErrorPage />;
  };

  return (
    <BrowserRouter>
      <NavigationBar />
      <Route exact path="/" component={Home} />
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
