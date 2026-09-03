import { Pool } from "pg";
import { config } from "../config/index.js";

export const pool = new Pool({
    connectionString:config.dbUrl,
    connectionTimeoutMillis:30000,
    idleTimeoutMillis:2000,
    max:20
});

export const dbTestConn=async()=>{
const client = await pool.connect();
    try {
        const res = await client.query(`select * FROM NOW() as now`);
        console.log(`Dattabase established connection at : [${res.rows[0].now}]`)   
    } catch (error) {
        throw error;  
    } finally {
        client.release();
    }
}

export const dbQuery=async<T=any>(sql:string, params?:any[]):Promise<T[]>=>{
const client = await pool.connect();
    try {
        const res = await client.query(sql, params);
        return res.rows as T[];
    } catch (error) {
        throw error; 
    } finally {
        client.release();
    }
}