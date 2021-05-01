import { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getIsLoggedIn } from './api/authentication';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { cyan, green } from '@material-ui/core/colors';
import { Home } from './components/pages/Home';
import { NavigationBar } from './components/layout/NavigationBar';
import { RegisterAlbum } from './components/scrobble-proxy/register-album/RegisterAlbum';
import { ErrorPage } from './components/pages/ErrorPage';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: cyan,
    secondary: green
  },
  props: {
    MuiInput: { inputProps: { spellCheck: 'false' } }
  }
});

export const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchIsLoggedIn() {
      setIsLoggedIn(await getIsLoggedIn());
    }
    fetchIsLoggedIn();
  }, []);

  const renderAuthenticatedPage = (page: JSX.Element): JSX.Element => {
    return isLoggedIn ? page : <ErrorPage />;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} menuOnClick={() => {}} />
        <Route exact path="/" component={Home} />
        {/* Use the new Routes component when React Router DOM is updated to v6 */}
        {/* https://stackoverflow.com/a/49321289 */}
        <Route path="/scrobble-proxy/register-album" render={() => renderAuthenticatedPage(<RegisterAlbum />)} />
        <Route path="/updateAlbumTracks" render={() => renderAuthenticatedPage(<p>logged in</p>)} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};
