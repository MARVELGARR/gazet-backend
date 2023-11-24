/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect, set } from "mongoose";
import { DATABASE_URL } from '@app/config';
import { logger } from "@app/utils";

const db: string = `${DATABASE_URL as string}`;

export const connectDB = async () => {
  try {
    set('strictQuery', false);
    await connect(db);
    logger.info('==== Database Connected ====');
    logger.info(`============================`);
  } catch (err: any) {
    logger.error(err.message);
  }
};