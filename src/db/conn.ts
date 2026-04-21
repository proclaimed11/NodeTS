import {Pool} from "pg";
import {config} from "../config/index.js";
import type {Request, Response} from "express"

const pool = new Pool({
  connectionString:config.dbUrl,
  idleTimeoutMillis:2000,
  connectionTimeoutMillis:30000,
  max:20
});

export const query=async<T=any>(sql:string, params?:any[]):Promise<T[]>=>{
const client = await pool.connect();
try {
const res = await client.query(sql,params);
return res.rows as T[];
} catch (error) {
throw new Error("Error performing operation");
throw error; 
}
}

export const dbTestConn=async()=>{
const client = await pool.connect();
try {
const res = await client.query(`SELECT NOW() as now`);
console.log(`Database established connection at: ${res.rows[0].now}`);
} catch (error) {
throw new Error(`Error connecting to database : ${error}`);
}
}




