import type { Request, Response } from "express";
import { config } from "../config/index.js";

export const errorMid=(err:any, req:Request, res:Response)=>{
console.error(`error : [${err.message}]`);

let message = "Server error";
let statusCode = 500;

if(err.message.includes("undefined") || 
err.message.includes("missing") ||
err.message.includes("invalid")
){
message = err.message;
statusCode = 400
}

if(err.message.includes("unauthorized") || 
err.message.includes("not allowed")
){
message = err.message;
statusCode = 401
}

if(err.message.includes("forbidden")
){
message = err.message;
statusCode = 403
}

if(err.message.includes("undefined") || 
err.message.includes("not found")
){
message = err.message;
statusCode = 404
}

if(err.message.includes("duplicate") || 
err.message.includes("already exists")
){
message = err.message;
statusCode = 409
}

res.status(statusCode).json({
    status:false,
    error:message,
    ...(config.env == "developmment" && {stack: err.stack})
})
}