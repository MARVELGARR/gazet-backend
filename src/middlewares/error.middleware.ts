import { type Request, type Response, type NextFunction } from 'express';
import { logger, AppError } from '@app/utils';

export const NotFoundError = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(404, `Not Found - ${req.originalUrl}`);

  res.status(404);
  next(err);
};

export const ErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  try {
    let status: number = err.status ?? 500;
    let message: string = err.message ?? 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

    if (err.name === 'CastError') {
      status = 404;
      message = 'Resource not found';
    }

    res
      .status(status)
      .json({ success: false, message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
  } catch (err) {
    next(err);
  }
};
