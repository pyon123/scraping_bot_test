import { MongoClient } from 'mongodb';

export const client = new MongoClient(process.env.MONGO_URI as string);

export const db = client.db(process.env.MONGO_DB_NAME as string);
