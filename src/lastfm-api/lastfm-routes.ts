import { Router } from 'express';
import { handleGetTopTracks, handleScrobblePlay } from './lastfm-handlers';

export const lastfmApiRouter = Router();

lastfmApiRouter.post('/lastfm/scrobblePlay', handleScrobblePlay);
lastfmApiRouter.get('/lastfm/getTopTracks', handleGetTopTracks);
