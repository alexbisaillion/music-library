import { Request, Response, NextFunction, Router } from 'express';
import { environment } from '../helpers/environment';
import { ErrorCode, sendError } from '../helpers/routing';
import { handleRefreshPlays } from './job-handlers';

export const jobRouter = Router();

const validateSecret = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body.secret) {
    sendError(res, ErrorCode.Unauthorized, 'Provide the secret to access jobs.');
    return;
  }
  if (req.body.secret !== environment.variables.SECRET) {
    sendError(res, ErrorCode.Unauthorized, 'Provided secret is invalid.');
    return;
  }
  next();
};

const routeURL = (route: string) => `/job/${route}`;
jobRouter.post(routeURL('refreshPlays'), validateSecret, handleRefreshPlays);
