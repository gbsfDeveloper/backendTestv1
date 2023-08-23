// import { jest } from '@jest/globals';
import request from 'supertest';

import app from '../app';

import { describe } from 'node:test';

describe('/receipts/process',()=> {
    it('should return 200', async ()=> {
        const response = await request(app)
            .post('/receipts/process')
            .send({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-03-20",
                "purchaseTime": "14:33",
                "items": [
                  {
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                  },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                  },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                  },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                  }
                ],
                "total": "9.00"
              });
        expect(response.statusCode).toBe(200);
    });

    it('return a valid object with a valid string', async ()=> {
        const response = await request(app)
            .post('/receipts/process')
            .send({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-03-20",
                "purchaseTime": "14:33",
                "items": [
                  {
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                  },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                  },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                  },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                  }
                ],
                "total": "9.00"
              });
        expect(response.body).toEqual(expect.objectContaining({id:expect.any(String)}));
    })
});

describe('/receipts/1234/points', async ()=> {
    it('calculate points should return 200', async ()=> {
        const response = await request(app)
            .get('/receipts/1234/points');
        expect(response.statusCode).toBe(200);
        
    });
});