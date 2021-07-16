import { Router } from 'express';
import {
  handleCreateArtist,
  handleCreateManyTracks,
  handleCreateRelease,
  handleCreateTrack,
  handleGetAlbumInfo,
  handleGetReleases,
  handleGetTracks,
  handleRegisterPlays,
  handleRegisterRelease
} from './storage-handlers';

export const storageRouter = Router();

const routeURL = (route: string) => `/storage/${route}`;
storageRouter.post(routeURL('registerRelease'), handleRegisterRelease);
storageRouter.post(routeURL('getAlbumInfo'), handleGetAlbumInfo);
storageRouter.post(routeURL('createArtist'), handleCreateArtist);
storageRouter.post(routeURL('createRelease'), handleCreateRelease);
storageRouter.post(routeURL('createTrack'), handleCreateTrack);
storageRouter.post(routeURL('createManyTracks'), handleCreateManyTracks);
storageRouter.get(routeURL('getTracks'), handleGetTracks);
storageRouter.get(routeURL('getReleases'), handleGetReleases);
storageRouter.post(routeURL('registerPlays'), handleRegisterPlays);
