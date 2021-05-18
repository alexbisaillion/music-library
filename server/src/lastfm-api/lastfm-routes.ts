import { Router } from 'express';
import { handleGetTopTracks, handleScrobblePlay } from './lastfm-handlers';

export const lastfmRouter = Router();

const routeURL = (route: string) => `/lastfm/${route}`;
lastfmRouter.post(routeURL('scrobblePlay'), handleScrobblePlay);
lastfmRouter.get(routeURL('getTopTracks'), handleGetTopTracks);
