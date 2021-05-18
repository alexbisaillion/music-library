import { Router } from 'express';
import { handleGetRecentPlays } from './spotify-handlers';

export const spotifyRouter = Router();

const routeURL = (route: string) => `/spotify/${route}`;
spotifyRouter.get(routeURL('getRecentPlays'), handleGetRecentPlays);
