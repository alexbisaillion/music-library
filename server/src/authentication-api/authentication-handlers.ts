import { Response, Request, NextFunction } from 'express';
import { environment } from '../helpers/environment';
import { sendError, ErrorCode, sendSuccess, SuccessCode, sendSuccessContent } from '../helpers/routing';

export const handleLogIn = (req: Request, res: Response): void => {
  try {
    if (!req.session) {
      sendError(res, ErrorCode.Unauthorized, 'No session associated with the request');
      return;
    }

    if (req.session.isLoggedIn) {
      sendSuccess(res, SuccessCode.OK);
      return;
    }

    const { username, password } = req.body;
    const isCorrect =
      username === environment.variables.APPLICATION_USERNAME &&
      password === environment.variables.APPLICATION_PASSWORD;

    req.session.isLoggedIn = isCorrect;
    if (!isCorrect) {
      sendError(res, ErrorCode.Unauthorized, 'Incorrect credentials.');
      return;
    }
    sendSuccess(res, SuccessCode.OK);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleIsLoggedIn = async (req: Request, res: Response): Promise<void> => {
  sendSuccessContent(res, SuccessCode.OK, { isLoggedIn: req.session?.isLoggedIn ?? false });
};

export const handleLogOut = (req: Request, res: Response): void => {
  try {
    if (!req.session?.isLoggedIn) {
      sendError(res, ErrorCode.Unauthorized, 'Cannot log out an unauthorized user.');
      return;
    }

    req.session.isLoggedIn = false;
    sendSuccess(res, SuccessCode.OK);
  } catch (error) {
    sendError(res, ErrorCode.InternalServerError, error);
  }
};

export const handleValidateAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.session?.isLoggedIn) {
    sendError(res, ErrorCode.Unauthorized, 'Please log in to access restricted endpoints.');
    return;
  }
  next();
};
