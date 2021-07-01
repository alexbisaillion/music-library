import { Request, Response, NextFunction, Router } from 'express';
import { environment } from '../helpers/environment';
import { ErrorCode, sendError } from '../helpers/routing';
import { handleRefreshPlays } from './job-handlers';

export const jobRouter = Router();

const handleValidateAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body.secret) {
    sendError(res, ErrorCode.Unauthorized, 'Provide the secret to access jobs.');
  }
  if (req.body.secret !== environment.variables.SECRET) {
    sendError(res, ErrorCode.Unauthorized, 'Provided secret is invalid.');
  }
  next();
};

jobRouter.post('*', handleValidateAuthorized);

const routeURL = (route: string) => `/job/${route}`;
jobRouter.post(routeURL('refreshPlays'), handleRefreshPlays);
