import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/HttpError';
import logger from '../errors/logger';

export function logError(err: Error) {
  logger.error(err);
}

export function logErrorMiddleware(err: HttpError, req: Request, res: Response, next: NextFunction) {
  logError(err);
  next(err);
}

export function returnError(err: HttpError, req: Request, res: Response, next: NextFunction) {
  res.status(err.statusCode || 500).send(err.message);
}

export function isOperationalError(error: Error) {
  if (error instanceof HttpError) {
    return error.isOperational;
  }
  return false;

}