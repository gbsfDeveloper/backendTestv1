import { Router } from 'express';

import { processReceipt, getPointFromReceiptId } from '../../controllers/receipts.controller';

const receiptsRoute = Router();
const ROUTE = '/receipts';

/** 
 *  @swagger
 * /receipts/process:
 *  post:
 *    tags: [Receipts]
 *    summary: Route to process user info and generate id for user
 *    description: This endpoint will return an id to identify user info.
 *    requestBody:
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                retailer:
 *                  type: string
 *                purchaseDate:
 *                  type: string
 *                purchaseTime:
 *                  type: string
 *                items:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      shortDescription:
 *                        type: string
 *                      price:
 *                        type: string
 *                total:
 *                  type: string
 *              example:   # Sample object
 *                retailer: M&M Corner Market
 *                purchaseDate: 2022-03-20
 *                purchaseTime: 14:33
 *                items: [
 *                  {
 *                    shortDescription: Gatorade,
 *                    price: 2.25
 *                  },{
 *                    shortDescription: Gatorade,
 *                    price: 2.25
 *                  },{
 *                    shortDescription: Gatorade,
 *                    price: 2.25
 *                  },{
 *                    shortDescription: Gatorade,
 *                    price": 2.25
 *                  }
 *                ]
 *                total: 9.00
 *    responses:
 *      '200':
 *        description: 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: "" 
 */
receiptsRoute.post(`${ROUTE}/process`, processReceipt);

/** 
 *  @swagger
 * /receipts/{id}/points:
 *  get:
 *    tags: [Receipts]
 *    summary: Route to process user id to get total points earned
 *    description: This endpoint will return an total points for user.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                points:
 *                  type: integer 
 *                  example: 0
 */
receiptsRoute.get(`${ROUTE}/:id/points`, getPointFromReceiptId);

export default receiptsRoute;
