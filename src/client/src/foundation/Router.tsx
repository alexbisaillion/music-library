import { BrowserRouter, Route } from 'react-router-dom';
import { RegisterAlbumPage } from '../components/pages/register-album/RegisterAlbumPage';
import { ErrorPage } from '../components/pages/ErrorPage';
import { useAuthentication } from '../context/authentication-context';
import { BaseAppComponents } from './BaseAppComponents';

export enum RouterPath {
  RegisterAlbum = '/register-album'
}
type RouterPathDisplayValues = { [key in RouterPath]: string };
export const pathDisplayValues: RouterPathDisplayValues = {
  '/register-album': 'Register Album'
};

export const Router = () => {
  const { isLoggedIn } = useAuthentication();

  const renderAuthenticatedPage = (page: JSX.Element): JSX.Element => {
    return isLoggedIn ? page : <ErrorPage />;
  };

  return (
    <BrowserRouter>
      <BaseAppComponents />
      {/* Use the new Routes component when React Router DOM is updated to v6 */}
      {/* https://stackoverflow.com/a/49321289 */}
      <Route path={RouterPath.RegisterAlbum} render={() => renderAuthenticatedPage(<RegisterAlbumPage />)} />
    </BrowserRouter>
  );
};
