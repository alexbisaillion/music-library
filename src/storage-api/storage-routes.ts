import { Router } from 'express';
import {
  handleCreateArtist,
  handleCreateManyTracks,
  handleCreateRelease,
  handleCreateTrack,
  handleGetAlbumInfo,
  handleRefreshPlays,
  handleRegisterRelease
} from './storage-handlers';

export const storageRouter = Router();

const routeURL = (route: string) => `/storage/${route}`;
storageRouter.post(routeURL('refreshPlays'), handleRefreshPlays);
storageRouter.post(routeURL('registerRelease'), handleRegisterRelease);
storageRouter.post(routeURL('getAlbumInfo'), handleGetAlbumInfo);
storageRouter.post(routeURL('createArtist'), handleCreateArtist);
storageRouter.post(routeURL('createRelease'), handleCreateRelease);
storageRouter.post(routeURL('createTrack'), handleCreateTrack);
storageRouter.post(routeURL('createManyTracks'), handleCreateManyTracks);
