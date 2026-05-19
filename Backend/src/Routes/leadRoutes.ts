import { Router } from "express";

import {
  createLead,
  getAllLeads,
  getSingleLead,
  updateLead,
  deleteLead
} from "../Controllers/leadController";

import { authenticateUser, isAdmin } from "../Middlewares/authMiddleware";
import { validate,validateParams } from "../Middlewares/validateJoi";
import * as leadValidation from "../validations/leadValidation";

const leadRouter = Router();


leadRouter.post("/create",authenticateUser,validate(leadValidation.createLeadValidation),createLead);
leadRouter.get( "/get-leads",authenticateUser,getAllLeads);
leadRouter.get("/:leadId",authenticateUser,validateParams(leadValidation.leadIdValidation),getSingleLead);
leadRouter.put("/:leadId",authenticateUser,validateParams(leadValidation.leadIdValidation),validate(leadValidation.updateLeadValidation),updateLead);
leadRouter.delete("/:leadId",authenticateUser,validateParams(leadValidation.leadIdValidation),deleteLead);

export default leadRouter;