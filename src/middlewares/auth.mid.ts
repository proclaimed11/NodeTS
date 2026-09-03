import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const authMid=(req:Request, res:Response, next:NextFunction)=>{
const authHeader = req.headers?.authorization;

const token = authHeader?.split(" ")[1];

if(!token){
    return res.status(400).json({
       status:false,
       error:"invalid or missing token"
    })
}

const decode = jwt.verify(token, process.env.JWT_SECRET as string);

(req as any).user = decode;

next();
}

export const authRoleMid=(...roles:string[])=>{
return((req:Request, res:Response, next:NextFunction)=>{
  const user = (req as any)?.user;

  if(!user){
    return res.status(401).json({
       status:false,
       error:"user not found!", 
    })
  }

  const authRole = user?.role;

  const allowedRole = roles.includes(authRole);

  if(!allowedRole){
    return res.status(401).json({
       status:false,
       error:"access: missing or invalid permission", 
    })
  }

  next();
})
}