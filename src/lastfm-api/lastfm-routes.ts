import { Router } from 'express';
import { handleScrobblePlay } from './lastfm-handlers';

export const lastfmApiRouter = Router();

lastfmApiRouter.post('/lastfm/scrobblePlay', handleScrobblePlay);
