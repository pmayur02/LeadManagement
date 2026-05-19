import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { User } from "../Models/UserModel";

export const authenticateUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json("No token provided");
        }
        const token = authHeader.split(" ")[1];
        const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error("SECRET_KEY is missing");
    }
        const decryptedData = jwt.verify(token,secretKey);
        req.user = decryptedData as any;
    next();

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const isAdmin = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const email = req.user?.email;
        const isAdmin = await User.findOne({email:email, role:"admin", status:"active"})
        if(!isAdmin){
            return res.status(400).json({"message":"Unauthorised access."})
        }
       req.user!.adminDetail = isAdmin;

        next()
    } catch (error) {
        return res.json({
            success: false,
            message: error,
            statusCode: 500
        });
    }
}