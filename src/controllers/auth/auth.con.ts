import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Auth } from "../../services/auth/auth.serv.js";
import jwt from "jsonwebtoken";
import { RefreshTokeService } from "../../services/auth/refresh.token.serv.js";

const authController = new Auth();
const refreshTokenController = new RefreshTokeService();

export const regUserAcc=async(req:Request, res:Response)=>{
const {
firstName,
midName,
lastName,
email,
phoneNo,
location,
password
}:{
firstName:string,
midName:string,
lastName:string,
email:string,
phoneNo:string,
location:string,
password:string
}=req.body;

const saltRounds = 10

const passwordHash = await bcrypt.hash(password, saltRounds);

const newUser = await authController.userAccReg(
firstName,
midName,
lastName,
email,
phoneNo,
location,
passwordHash
);

res.status(201).json({
    status:true,
    message:"User account created successfully!",
    data:newUser
})
}

export const loginByEmail=async(req:Request, res:Response)=>{
const {email, password}:{email:string, password:string}= req.body;

const account = await authController.fetchUserAcc(email);

const isMatch = await bcrypt.compare(password, account.passwordHash);

if(!isMatch){
res.status(400).json({
    status:false,
    error:"invalid email or password"
})
}

const refreshToken = await refreshTokenController.newRefreshToken(account.id);

const accessToken = jwt.sign(
    {id:account.id, role:account.role, email:account.email},
    process.env.JWT_SECRET as string,
    {expiresIn: "15m"}
);

res.status(200).json({
    status:true,
    message:`${account.first_name} [{${account.role}] logged in successfully!`,
    accessToken:accessToken,
    refreshToken:refreshToken,
})
}