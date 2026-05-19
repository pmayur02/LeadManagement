import mongoose, { Types } from "mongoose";
import {User} from "../Models/UserModel"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


interface UserPayload {
    name:string;
    email:string;
    password:string;
    role?: "admin" | "user";
    status?: "active" | "inactive";
}

interface updatePayload {
    name?:string;
    password?:string;
    role?: "admin" | "user";
    status?: "active" | "inactive";
}

interface loginPayload{
    email:string;
    password:string;
}

interface currentUserDetail{
    userId:Types.ObjectId;
    name:string;
    email:string;
    role?: "admin" | "user";
    status?: "active" | "inactive";
}

interface ResetPasswordPayload{
    email:string;
}


export const registerUser = async(payload:UserPayload)=>{
    try {
        if(!payload.name || !payload.email || !payload.password){
            return {
                statusCode:400,
                message:"name, email or password required.",
                data:null
            }
        }

        const existingUser = await User.findOne({email:payload.email, status:"active"})

        if(existingUser?._id){
            return {
                statusCode: 400,
                message: "user already exists.",
                data: null
            }
        }

        const hashPassword:string = await bcrypt.hash(payload.password,10);

        payload.password = hashPassword;

        const  newUser = await User.create(payload);
        
        if(!newUser?._id){
            return {
                statusCode:500,
                message:"Failed to insert data",
                data:null
            }
        }

        const user:currentUserDetail = {
            userId:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role
        }


            return {
                statusCode:201,
                message:"User Registered Successfully.",
                data:user
            }

    } catch (error) {
         throw error;
    }
}


export const login = async(payload: loginPayload)=>{
try {
    if(!payload.email || !payload.password){
        return {
            statusCode:400,
            message:"email and password required.",
            data:null
        }
    }

    const existUser = await User.findOne({email:payload.email, status:"active"});

    if(!existUser){
        return {
            statusCode:400,
            message:"No user exists",
            data:null
        }
    }

    const isValidPassword = await bcrypt.compare(payload.password, existUser.password);

    if(!isValidPassword){
        return {
            statusCode:400,
            message:"Invalid credentials",
            data:null
        }
    }

    const SECRET_KEY:any = process.env.SECRET_KEY
    const token:string = jwt.sign({id:existUser._id,email:existUser.email,role:existUser.role},SECRET_KEY,{expiresIn:"24Hours"})

    if(!token){
        return {
            statusCode:400,
            message:"Failed to generate token",
            data:null
        }
    }

    const userData : currentUserDetail = {
        userId: existUser._id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role
    }

        return {
            statusCode:200,
            message:"Logged in Successful!",
            data:{
                userData:userData,
                token: token
            }
        }

} catch (error) {
    throw error;
}
}


export const getCurrentUser = async(userId:Types.ObjectId)=>{
    try {
        if(!userId) return{
            statusCode:400,
            message:"missing userId",
            data:null
        }

        const existUser = await User.findOne({_id:userId, status:"active"});
        if(!existUser) return {
            statusCode:404,
            message:"No user exists",
            data:null            
        }

        const user:currentUserDetail = {
            userId:existUser._id,
            name:existUser.name,
            email:existUser.email,
            role:existUser.role
        } 

        return {
            statusCode:200,
            message:"User Found.",
            data:  user          
        }

    } catch (error) {
        throw error
    }
}

export const getAllUsers = async()=>{
    try {
        const allUsers = await User.find();
        if(!allUsers || allUsers?.length ===0){
            return {
                statusCode:404,
                message:"No users found",
                data:null
            }
        }

    const formattedUsers: currentUserDetail[] = allUsers.map((user) => ({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status

    }));
            return {
                statusCode:200,
                message:"Users found successfully.",
                data:formattedUsers
            }

    } catch (error) {
        throw error
    }
}

export const updateUser = async(userId:string, payload:updatePayload)=>{
    try {
        if(!userId) return{
            statusCode:400,
            message:"missing userId",
            data:null
        }
        
        if(Object.keys(payload).length ===0){
            return{
                statusCode:400,
                message:"Enter data to update.",
                data:null
            }
        }

        const existUser = await User.findOne({_id:userId, status:"active"});
        if(!existUser) return {
            statusCode:400,
            message:"No user exists",
            data:null            
        }

        if(payload?.password){
            const hashPassword:string = await bcrypt.hash(payload.password,10);
            payload.password = hashPassword;
        }

        const updatedData = await User.updateOne({ _id: userId, status: "active" },{ $set: payload },{ runValidators: true });

                if (updatedData.modifiedCount === 0) {
            return {
                statusCode: 204,
                message: "Failed to update.",
                data: null
            };
        }

        return {
            statusCode: 200,
            message: "User updated successfully",
            data: null
        };

    } catch (error) {
        throw error
    }
}

export const deleteUser = async(userId:string)=>{
    try {
        if(!userId) return{
            statusCode:400,
            message:"missing userId",
            data:null
        }
        const existUser = await User.findOne({_id:userId, status:"active"});
        if(!existUser) return {
            statusCode:400,
            message:"No user exists",
            data:null            
        }

        const deleteUser = await User.updateOne({_id:userId, status:"active"},{$set:{status:"inactive"}},{runValidators:true});

        if (deleteUser?.modifiedCount === 0) {
            return {
                statusCode: 204,
                message: "Failed to update.",
                data: null
            };
        }

        return {
            statusCode: 200,
            message: "User deleted successfully",
            data: null
        };

    } catch (error) {
        throw error
    }
}

export const resetPassword = async(payload:ResetPasswordPayload)=>{
    try {
        if(!payload.email){
            return{
                statusCode:400,
                message:"Email required.",
                data:null
            }
        }

        const emailExists = await User.findOne({email:payload.email});
        if(!emailExists){
            return{
                statusCode:404,
                message:"no user found.",
                data:null
            }
        }

            return{
                statusCode:200,
                message:"user found.",
                data:emailExists?.email
            }

    } catch (error) {
        throw error
    }
}