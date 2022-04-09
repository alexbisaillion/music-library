import { Router } from 'express';
import { handleGetAlbum, handleGetHistory } from './deezer-handlers';

export const deezerRouter = Router();

const routeURL = (route: string) => `/deezer/${route}`;
deezerRouter.get(routeURL('getHistory'), handleGetHistory);
deezerRouter.get(routeURL('getAlbum/:id'), handleGetAlbum);
