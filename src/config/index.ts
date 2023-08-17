import 'dotenv/config'
const PORT = process.env.PORT || '3000';
const IS_LOCAL = process.env.IS_LOCAL === 'true';
const NODE_ENV = process.env.NODE_ENV || 'development';
const APP_VERSION = process.env.APP_VERSION || '1';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'apikey';

export const config = {
    NODE_ENV,
    PORT,
    IS_LOCAL,
    ENDPOINT_NOT_FOUND: 'ENDPOINT_NOT_FOUND' as const,
    APP_VERSION,
    PRIVATE_KEY,
}