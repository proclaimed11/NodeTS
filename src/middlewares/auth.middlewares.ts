import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const verifyToken=async(req:Request, res:Response, next:NextFunction)=>{
const authHeaders = req.headers.authorization;

const token = authHeaders?.split(" ")[1];

if(!token){
res.status(401).json({error:"Acess denied: missing authorization token!"})
return;
}

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

(req as any).user = decoded;

next();
} catch (error) {
 res.status(401).json({error:"invalid token"})
 throw error;   
}
}