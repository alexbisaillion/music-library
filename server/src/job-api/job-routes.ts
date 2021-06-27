import { Router } from 'express';
import { handleRefreshPlays } from './job-handlers';

export const jobRouter = Router();

const routeURL = (route: string) => `/job/${route}`;
jobRouter.post(routeURL('refreshPlays'), handleRefreshPlays);
