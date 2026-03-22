import dotenv from "dotenv"

dotenv.config();

export const config ={
    dbUrl:process.env.DATABASE_URL || "",
    port:process.env.PORT || 3000,
    environment:process.env.NODE_ENV || "development"
}