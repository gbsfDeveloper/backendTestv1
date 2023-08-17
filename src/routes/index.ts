import { Router } from 'express';

import { config } from '../config';
import { ignoreFavicon } from '../middlewares/ignoreFavicon';
import { notFoundHandler } from '../middlewares/notFoundHandler';
import apiDocsRoute from './api-docs';
import receiptsRoute from './receipts/receiptsRoute';
import appRoute from './app/appRoute';

const router = Router();

router.use(appRoute);

router.use(receiptsRoute);

// only be present in development
if (config.NODE_ENV === 'development') {
  router.use(apiDocsRoute);
}

// ROUTE MIDDLEWARES
router.use(ignoreFavicon);
// 404 for unhandled endpoints
router.use(notFoundHandler);

export default router;
