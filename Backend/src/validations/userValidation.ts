import Joi from "joi";

export const registerUserValidation = Joi.object({
  name: Joi.string().min(2).pattern(/^[A-Za-z ]+$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "user"),
  status: Joi.string().valid("active", "inactive")
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const getCurrentUserValidation = Joi.object({
  userId: Joi.string().length(24).hex().required()
});

export const updateUserValidation = Joi.object({
  name: Joi.string().min(2).pattern(/^[A-Za-z ]+$/),
  password: Joi.string().min(6),
  role: Joi.string().valid("admin", "user"),
  status: Joi.string().valid("active", "inactive")
});