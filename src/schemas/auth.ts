import { validate, Joi } from "express-validation";

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }),
};

const registerValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
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
