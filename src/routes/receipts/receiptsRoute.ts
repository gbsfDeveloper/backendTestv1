import { Router } from 'express';

import { processReceipt, getPointFromReceiptId } from '../../controllers/receipts.controller';

const receiptsRoute = Router();
const ROUTE = '/receipts';

/**
 * @swagger
 * /app/head-of-display:
 *   post:
 *     tags: [App]
 *     summary: Route to get head of display information of a student
 *     description: This endpoint will return the display header information of the logged student. To consume this endpoint, is required to use a studentAccessToken.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      '401':
 *        $ref: '#/components/responses/401-unauthorized'
 *      '200':
 *        description: An JSON Web Token (JWT). This JWT has to be stored somewhere in our client. This JWT token allows the user to make authorized-only requests.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                avatar:
 *                  type: string
 *                  example: ""
 *                studentname:
 *                  type: string
 *                  example: "test2016"
 *                points:
 *                  type: number
 *                  example: 1899
 *                streak:
 *                  type: array
 *                  items:
 *                   type: boolean
 *                  example: [true, false, true, true, false]
 *                ranking:
 *                  type: number
 *                  example: 2
 */

receiptsRoute.post(`${ROUTE}/process`, processReceipt);

/**
 * @swagger
 * /app/head-of-display:
 *   get:
 *     tags: [App]
 *     summary: Route to get head of display information of a student
 *     description: This endpoint will return the display header information of the logged student. To consume this endpoint, is required to use a studentAccessToken.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      '401':
 *        $ref: '#/components/responses/401-unauthorized'
 *      '200':
 *        description: An JSON Web Token (JWT). This JWT has to be stored somewhere in our client. This JWT token allows the user to make authorized-only requests.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                avatar:
 *                  type: string
 *                  example: ""
 *                studentname:
 *                  type: string
 *                  example: "test2016"
 *                points:
 *                  type: number
 *                  example: 1899
 *                streak:
 *                  type: array
 *                  items:
 *                   type: boolean
 *                  example: [true, false, true, true, false]
 *                ranking:
 *                  type: number
 *                  example: 2
 */

receiptsRoute.get(`${ROUTE}/:id/points`, getPointFromReceiptId);

export default receiptsRoute;
