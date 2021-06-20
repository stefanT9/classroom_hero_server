import { validate, Joi } from "express-validation";

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const registerValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};

const resetPasswordValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};
export const validateLogin = validate(loginValidation);
export const validateRegister = validate(registerValidation);
export const validateResetPassword = validate(resetPasswordValidation);
