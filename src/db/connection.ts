import { Pool } from "pg";
import { config } from "../config/index.js";

const pool = new Pool({
    connectionString:config.dbUrl,
    connectionTimeoutMillis:2000,
    idleTimeoutMillis:30000
});

export const query=async<T=any>(sql:string, params?:any[]):Promise<T[]>=>{
const client = await pool.connect();
try {
   const res = await client.query(sql,params);
   return res.rows as T[]; 
} catch (error) {
    console.error(`Error performing operation ${sql} : ${error}`);
    throw error;
} finally {
   client.release();
}
}

export const dbConnTest =async()=>{
    const client = await pool.connect();
    try {
      const res = await client.query("SELECT * FROM NOW() as now");
      console.log(`Database established connection at : ${res.rows[0].now}`)  
    } catch (error) {
       console.error("Error connecting to database : ", error);
    } finally {
      client.release();
    }
}