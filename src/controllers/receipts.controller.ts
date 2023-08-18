import { NextFunction, Request, Response } from 'express';
import NodeCache from 'node-cache'
import { v4 as uuidv4 } from 'uuid';

var db = new NodeCache({ stdTTL: 0 } );

type ReceiptItem = {
  shortDescription: string,
  price: string | number
}

type ReceiptData = {
  retailer: string,
  purchaseDate: string,
  purchaseTime: string,
  items: ReceiptItem[]
  total: string | number
};

export const processReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestBody = req.body;
    const id = uuidv4();
    db.set( id, requestBody );
    res.status(200).json({ id } );
  } catch (error) {
    next(error);
  }
};

const getAlphanumericCharacter = (retailerName : string) => {
  const regex = /[a-zA-Z0-9]/g;
  return retailerName.match(regex)?.length;
}

const getCountEveryTwoItems = (items : ReceiptItem[], points:number) => {
  const countPerTwoItems = Math.floor(items.length / 2);
  return countPerTwoItems * points;
}

const getItemsTotalPointsEarned = (items : ReceiptItem[], initialPoints:number) => {
  let itemsTotalPointsEarned = initialPoints;
  for (const item of items) {
    const itemDescription = item.shortDescription;
    const itemDescriptionWithoutTrimlenght = itemDescription.trim().length;
    const isTreeMultiplo = ( (itemDescriptionWithoutTrimlenght % 3) === 0 ) && ( itemDescriptionWithoutTrimlenght !== 0 ) ;// view if sirve
    if(isTreeMultiplo){
      let itemPrice = item.price;
      itemPrice = (typeof itemPrice === 'string') ? Number(itemPrice) : itemPrice;
      const itemPointsEarned = Math.ceil(itemPrice * 0.2);
      itemsTotalPointsEarned += itemPointsEarned;
    }
  }
  return itemsTotalPointsEarned;
}

const getIfDayIsOdd = (date : string) => {
  const parseDate = new Date(date);
  const day = parseDate.getUTCDate();
  return ((day % 2) !== 0 );
}

const getInTime = (date : string, purchaseTime : string) => {
  const parseTime = new Date(`${date}T${purchaseTime}`);
  const minorTime = new Date(`${date}T14:00`);
  const mayorTime = new Date(`${date}T16:00`);
  return (parseTime > minorTime && parseTime < mayorTime) ;
}

export const getPointFromReceiptId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const { id } = req.params as { id: string }
    
    let receiptData = db.get( id ) as ReceiptData; 
    
    const INITIAL_POINTS = 0;
    
    if( !receiptData ){
      res.status(200).json({ points:INITIAL_POINTS, message:"receipt not found" });
    }
    
    const NO_GAIN_POINTS = 0;
    const POINTS_IF_NO_DECIMALS = 50;
    const POINTS_IF_DOT_TWENTY_FIVE_MULTIPLIER = 25;
    const POINTS_FOR_EVERY_TWO_ITEMS = 5;
    const POINTS_IF_DAY_IS_ODD = 6;
    const POINTS_IF_IS_IN_TIME = 10;

    let points = INITIAL_POINTS;
    const retailerName = receiptData.retailer;
    let total = receiptData.total;
    let items = receiptData.items;
    const date = receiptData.purchaseDate;
    const purchaseTime = receiptData.purchaseTime;
    total = (typeof total === 'string') ? Number(total) : total;

    // One point for every alphanumeric character in the retailer name.
    const countAlphanumericCharacter = getAlphanumericCharacter(retailerName);
    points += ( countAlphanumericCharacter ) ? countAlphanumericCharacter : NO_GAIN_POINTS;

    // 50 points if the total is a round dollar amount with no cents.
    const isTotalInt = Number.isInteger(total);
    points += ( isTotalInt ) ? POINTS_IF_NO_DECIMALS : NO_GAIN_POINTS;
    
    // 25 points if the total is a multiple of 0.25
    const isDotTwentyFiveMultiplier = ( (total % 0.25) === 0 );
    points += ( isDotTwentyFiveMultiplier ) ? POINTS_IF_DOT_TWENTY_FIVE_MULTIPLIER : NO_GAIN_POINTS;
    
    // 5 points for every two items on the receipt.
    const everyTwoItemsCount = getCountEveryTwoItems(items, POINTS_FOR_EVERY_TWO_ITEMS);
    points += everyTwoItemsCount;

    // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    let itemsTotalPointsEarned = getItemsTotalPointsEarned(items, INITIAL_POINTS);
    points += itemsTotalPointsEarned;

    // 6 points if the day in the purchase date is odd.
    const dayIsOdd = getIfDayIsOdd(date);
    points += ( dayIsOdd ) ? POINTS_IF_DAY_IS_ODD : NO_GAIN_POINTS;

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const isInTime = getInTime(date, purchaseTime);
    points += ( isInTime ) ? POINTS_IF_IS_IN_TIME : NO_GAIN_POINTS;

    res.status(200).json({ points });
  } catch (error) {
    next(error);
  }
};
