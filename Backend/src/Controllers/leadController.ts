import { Request, Response } from "express";
import * as leadService from "../Services/leadService";
import { ResponseBody } from "../Utilities/interfaces";

// Create Lead
export const createLead = async (req: Request,res: Response): Promise<Response> => {
  try {
    const payload = req.body;
    const userId = req?.user?.id as string;

    const response: ResponseBody = await leadService.createLead(userId,payload);
    
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

// Get All Leads
export const getAllLeads = async (req: Request,res: Response): Promise<Response> => {
  try {
    const response: ResponseBody =await leadService.getAllLeads(req.query);

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

// Get Single Lead
export const getSingleLead = async (req: Request,res: Response): Promise<Response> => {
  try {

    const leadId  = req.params.leadId as string;

    const response: ResponseBody = await leadService.getSingleLead(leadId);

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

// Update Lead
export const updateLead = async (req: Request,res: Response): Promise<Response> => {
  try {

   const leadId:string  = req.params.leadId as string;;

    const payload = req.body;

    const response: ResponseBody = await leadService.updateLead(leadId, payload);

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

// Delete Lead
export const deleteLead = async (req: Request,res: Response): Promise<Response> => {
  try {

    const leadId  = req.params.leadId as string;

    const response: ResponseBody = await leadService.deleteLead(leadId);

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