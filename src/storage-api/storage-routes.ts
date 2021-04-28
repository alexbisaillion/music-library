import { Router } from 'express';
import { handleGetAlbumInfo, handleRefreshPlays, handleRegisterRelease } from './storage-handlers';

export const storageRouter = Router();

const routeURL = (route: string) => `/storage/${route}`;
storageRouter.post(routeURL('refreshPlays'), handleRefreshPlays);
storageRouter.post(routeURL('registerRelease'), handleRegisterRelease);
storageRouter.post(routeURL('getAlbumInfo'), handleGetAlbumInfo);
