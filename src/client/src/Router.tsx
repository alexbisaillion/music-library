import { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getIsLoggedIn } from './api/authentication';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';
import { Home } from './components/pages/Home';
import { NavigationBar } from './components/layout/NavigationBar';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: cyan
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
    return isLoggedIn ? page : <p>Unauthorized</p>;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} menuOnClick={() => {}} />
        <Route exact path="/" component={Home} />
        <Route path="/updateAlbumTracks" render={() => renderAuthenticatedPage(<p>logged in</p>)} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};
