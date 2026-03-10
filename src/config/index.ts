import dotenv from 'dotenv';

dotenv.config();

export const config = {
   port:process.env.PORT || 3000,
   dbUrl:process.env.DATABASE_URL || "",
   environment:process.env.NODE_ENV || "development"
}