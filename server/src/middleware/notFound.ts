import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Resource not found',
    status: 404,
    method: req.method,
    url: req.originalUrl,
  });
};

export default notFound;