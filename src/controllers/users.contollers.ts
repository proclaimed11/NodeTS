import type { Response, Request } from "express";
import { UserServices } from "../services/users.services.js";
import { validateLoginInputs, validateRegData } from "../validators/users.validators.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const service = new UserServices();

export const regUser=async(req:Request, res:Response)=>{
const {
firstName,
midName,
lastName,
email,
phoneNumber,
password
}:{
firstName:string,
midName:string,
lastName:string,
email:string,
phoneNumber:string,
password:string
} = req.body;

//validateRegData({firstName,midName,lastName,email,phoneNumber,password});

const saltRounds = 10;

const passwordHash = await bcrypt.hash(password, saltRounds)

const addUser = await service.regUser(firstName,midName,lastName,email,phoneNumber,passwordHash);

res.status(201).json({
    message:"User registered successfully!",
    data:addUser
})
}

export const login=async(req:Request, res:Response)=>{
const {email, password}:{email:string, password:string}=req.body;

validateLoginInputs({email, password});

const user = await service.loginUser(email);

if(!email){
res.status(401).json({status:false, error:"Invalid credentials"})
return;
}

const isMatch = await bcrypt.compare(password, user.passwordHash);

if(!isMatch){
res.status(401).json({status:false, error:"Invalid credentials"})
return;
}

const token = jwt.sign(
    {id:user.id, email:user.email, role:user.role},
    process.env.JWT_SECRET as string,
    {expiresIn: "1h"}
);

res.status(200).json({
    status:true,
    message:"User logged in successfully!",
    token
})
}