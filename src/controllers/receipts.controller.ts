import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import jwt from 'jsonwebtoken' 


export const processReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestBody = req.body as {mesaje:string};
    console.log(requestBody);
    const privateKey = config.PRIVATE_KEY;
    // const token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
    const token = jwt.sign(requestBody, privateKey);
    const id = "";
    let response = { 
      id: token
    }    

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getPointFromReceiptId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    let response = { 
      id: "7fb1377b-b223-49d9-a31a-5a02701dd310" 
    }    

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
