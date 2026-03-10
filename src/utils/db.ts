import { config } from "../config/index.js";
import { Pool } from "pg";

const pool = new Pool({connectionString: config.dbUrl});

export const query =async<T>(text:string, params?:any[]):Promise<T[]>=>{
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T[];
  } catch (error) {
    console.error("Database query error:", error)
    throw error;
  }finally{
    client.release();
  }
}

export const dbConnection =async()=>{
const client = await pool.connect();
  try{
    console.log("Database connected successfully");
  }catch(error){
    console.error("Error connecting to the database :", error);
  }finally{
    client.release();
  }
}