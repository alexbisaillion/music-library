import { Router } from 'express';
import { handleGetTopAlbums, handleGetTopArtists, handleGetTopTracks, handleScrobblePlay } from './lastfm-handlers';

export const lastfmRouter = Router();

const routeURL = (route: string) => `/lastfm/${route}`;
lastfmRouter.post(routeURL('scrobblePlay'), handleScrobblePlay);
lastfmRouter.get(routeURL('getTopArtists'), handleGetTopArtists);
lastfmRouter.get(routeURL('getTopAlbums'), handleGetTopAlbums);
lastfmRouter.get(routeURL('getTopTracks'), handleGetTopTracks);
