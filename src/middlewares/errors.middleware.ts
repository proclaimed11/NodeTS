import type { NextFunction, Request, Response } from "express"
import { config } from "../config/index.js";

export const errorHandler=(err:any, req:Request, res:Response, next:NextFunction)=>{

console.error(`[Error]: ${err.message}`);

let statusCode = 500;
let message = "Server error"

if(err.message.includes("not found") || err.message.includes("invalid") || err.message.includes("not available")){
statusCode = 404;
message=err.message
}else if(err.message.includes("required") || err.message.includes("must be")){
statusCode = 400;
message=err.message;
}else if(err.message.includes("invalid credentials") || err.message.includes("denied")){
statusCode = 401;
message=err.message;   
}

res.status(statusCode).json({
status:false,
error:message,
...(config.env === "development" && {stack:err.stack})
})
}