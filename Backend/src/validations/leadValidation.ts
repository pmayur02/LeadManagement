import Joi from "joi";

export const createLeadValidation = Joi.object({
  name: Joi.string().min(2).pattern(/^[A-Za-z ]+$/).required(),
  email: Joi.string().email().required(),
  status: Joi.string().valid("new", "contacted", "qualified", "lost"),
  source: Joi.string().valid("website", "instagram", "referral").required()
});

export const updateLeadValidation = Joi.object({
  name: Joi.string().min(2).pattern(/^[A-Za-z ]+$/),
  email: Joi.string().email(),
  status: Joi.string().valid("new", "contacted", "qualified", "lost"),
  source: Joi.string().valid("website", "instagram", "referral")
});

export const leadIdValidation = Joi.object({
  leadId: Joi.string().length(24).hex().required()
});

export const leadQueryValidation = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1).max(100),
  status: Joi.string().valid("new", "contacted", "qualified", "lost"),
  source: Joi.string().valid("website", "instagram", "referral"),
  search: Joi.string().allow(""),
  sort: Joi.string().valid("latest", "oldest")
});