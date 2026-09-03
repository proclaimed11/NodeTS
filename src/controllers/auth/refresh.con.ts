import type { Request, Response } from "express";
import { RefreshTokeService } from "../../services/auth/refresh.token.serv.js";
import jwt from "jsonwebtoken";

const refreshTokenController = new RefreshTokeService();

export const refreshAccessToken=async(req:Request, res:Response)=>{
    const {refreshToken} : {refreshToken:string} = req.body;

    if(!refreshToken){
        return res.status(401).json({
            status:false,
            error:"invalid or missing token"
        })
    }

    const tokenData = await refreshTokenController.verifyRefreshToken(refreshToken);

    const newAccessToken = jwt.sign(
        {id:tokenData.user_id, email:tokenData.email, role:tokenData.role},
        process.env.JWT_SECRET as string,
        {expiresIn:"15m"}
    );

    res.status(201).json({
        status:true,
        message:"Token refreshed!",
        newToken:newAccessToken
    })
}

export const logout=async(req:Request, res:Response)=>{
    const {refreshToken} : {refreshToken:string} = req.body; 

        if(!refreshToken){
        return res.status(401).json({
            status:false,
            error:"invalid or missing token"
        })
    }

    const deleteToken = await refreshTokenController.deleteRefreshToken(refreshToken);

    res.status(201).json({
        status:true,
        message:deleteToken.message
    })
}