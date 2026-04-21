import dotenv from "dotenv"

dotenv.config();

export const config={
    port:process.env.PORT,
    dbUrl:process.env.DATABASE_URL,
    env:process.env.NODE_ENV
}