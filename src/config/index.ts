import dotenv from "dotenv";
import { RowDescriptionMessage } from "pg-protocol/dist/messages";

dotenv.config();

export const config = {
    port:process.env.PORT,
    env:process.env.ENV,
    dbUrl:process.env.DATABASE_URL
}