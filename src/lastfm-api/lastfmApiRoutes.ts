import { Router } from 'express';
import { handleScrobblePlay } from './lastfmApiHandlers';

export const lastfmApiRouter = Router();

lastfmApiRouter.post('/lastfm/scrobblePlay', handleScrobblePlay);
