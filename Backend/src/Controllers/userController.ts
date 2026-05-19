import { Request, Response } from "express";
import * as userService from "../Services/userService"
import { ResponseBody } from "../Utilities/interfaces";

export const registerUser = async (req: Request,res: Response): Promise<Response> => {
  try {
    const payload = req.body;

    const response: ResponseBody = await userService.registerUser(payload);

    return res.status(response.statusCode).json(response);

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const login = async (req: Request,res: Response): Promise<Response> => {
  try {
    const payload = req.body;

    const response: ResponseBody = await userService.login(payload);

    return res.status(response.statusCode).json(response);

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const getCurrentUser = async (req: Request,res: Response): Promise<Response> => {
  try {
    let payload = req?.user?.id;
    if(req?.params?.userId){
      payload = req.params.userId as string;
    }

    const response: ResponseBody = await userService.getCurrentUser(payload);

    return res.status(response.statusCode).json(response);

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const getAllUsers = async (_req: Request,res: Response): Promise<Response> => {
  try {
    
    const response: ResponseBody = await userService.getAllUsers();

    return res.status(response.statusCode).json(response);

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const updateUser = async (req: Request,res: Response): Promise<Response> => {
  try {
    let userId = req?.user?.id;
    if(req?.params?.userId){
      userId = req.params.userId as string;
    }
    const payload = req?.body

    const response: ResponseBody = await userService.updateUser(userId,payload);

    return res.status(response.statusCode).json(response);

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const deleteUser = async (req: Request,res: Response): Promise<Response> => {
  try {
    
    let userId = req?.user?.id as string;
    if(req?.params?.userId){
      userId = req.params.userId as string;
    }

    const response: ResponseBody = await userService.deleteUser(userId);

    return res.status(response.statusCode).json(response);

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}


// actually i want to create a lead management module, i have implemented user management module. i want to create a lead 

// Leads Management (CRUD)
// Create a Lead Management module.
// Lead Fields
// ● Name
// ● Email
// ● Status - New,Contacted,Qualified,Lost
// ● Source-Website,Instagram,Referral
// ● Created At
// Functionalities
// ● Create Lead
// ● Update Lead
// ● Delete Lead
// View Leads List
// ● View Single Lead Details


// this is my user mongoose model-
// import mongoose, { model } from "mongoose";
// import { create } from "node:domain";

// const userSchema = new mongoose.Schema({
//     name: {type:String, required:true},
//     email:{type:String, required:true, unique:true,trim: true,lowercase: true},
//     password:{type:String, required:true},
//     role:{type:String, enum:["admin", "user"],default: "user", required:true},
//     status:{type:String, enum:["active","inactive"],default: "active", required:true}

// }, { timestamps: true })


// export const User = mongoose.model("User", userSchema);

// so help me to create a lead mongoose model and then we can move forward to create the services and controllers for lead management module.
// i have already created name, email fields in user model, so we can reuse those fields in lead model as well. we just need to add status, source and createdAt fields in lead model. also we need to create a reference of user in lead model to know which user created the lead. 