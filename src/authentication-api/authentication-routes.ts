import { Router } from 'express';
import { handleLogIn, handleIsLoggedIn, handleLogOut } from './authentication-handlers';

export const authenticationRouter = Router();

const routeURL = (route: string) => `/authentication/${route}`;
authenticationRouter.post(routeURL('login'), handleLogIn);
authenticationRouter.get(routeURL('isLoggedIn'), handleIsLoggedIn);
authenticationRouter.post(routeURL('logout'), handleLogOut);
