import { Request, Response, NextFunction } from 'express';
import { environment } from './environment';

export enum SuccessCode {
  OK = 200,
  Created = 201,
  Accepted = 202
}
export const sendSuccess = (res: Response, code: SuccessCode): void => {
  res.status(code).json({ success: true });
};

export enum ErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  InternalServerError = 500
}
export const sendError = (res: Response, code: ErrorCode, errorMessage: string): void => {
  res.status(code).json({ success: false, error: errorMessage });
};

export const sendSuccessContent = <T>(res: Response, code: SuccessCode, content: T): void => {
  res.status(code).json(content);
};

export const validateAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body.secret) {
    sendError(res, ErrorCode.Unauthorized, 'Provide the secret to access restricted endpoints.');
    return;
  }
  if (req.body.secret !== environment.variables.SECRET) {
    sendError(res, ErrorCode.Unauthorized, 'Provided secret is invalid.');
    return;
  }
  next();
};
