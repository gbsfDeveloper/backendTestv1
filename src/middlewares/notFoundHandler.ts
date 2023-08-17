import { Request, Response } from 'express';

import { config } from '../config';

export function notFoundHandler(_req: Request, _res: Response) {
  throw new Error(config.ENDPOINT_NOT_FOUND);
}
