import type { Request, Response } from "express";
import { userServ} from "../services/users.serv.js";

const userController = new userServ();

export const fetchAllUsers=async(req:Request, res:Response)=>{
const sort = (req.query.sort as string) || "created_at";
const order = (req.query.order as string) || "DESC";
const search = (req.query.search as string) || ""
const page = Number(req.query.page)  || 1;
const limit = Number(req.query.limit) || 10;

const allUsers = await userController.getAllUsers(page,limit,sort,search,order);

res.status(200).json({
    status:true,
    message:"users fetched successfully!",
    data:allUsers
})
}

export const fetchUserProfile=async(req:Request, res:Response)=>{
const user = (req as any)?.user;

const userId = Number(user?.id);

if(!userId){
    return res.status(401).json({
        status:false,
        error:"invalid or missing user id"   
    })
}

const id = Number(req.params.id)

const userProfile = await userController.getUserProfile(id);

res.status(200).json({
    status:true,
    message:"user profile fetched successfuly!",
    ...userProfile
})
}


export const updateUserProfile=async(req:Request, res:Response)=>{
const user = (req as any)?.user;

const userId = Number(user?.id);

if(!userId){
    return res.status(401).json({
        status:false,
        error:"invalid or missing user id"   
    })
}

const id = Number(req.params.id);

const update = req.body;

const updateUserProfile = await userController.updateUserProfile(id, update);

res.status(200).json({
    status:true,
    message:"user profile fetched successfuly!",
    ...updateUserProfile
})
}