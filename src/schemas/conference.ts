import { validate, Joi } from "express-validation";
import { Types } from "mongoose";

const createConferenceValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    startTime: Joi.date().iso().required(),
  }),
};
const inviteToConferenceValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    conferenceId: Joi.string()
      .custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("conference id is not an ObjectId");
        }
        return true;
      })
      .required(),
  }),
};
export const validateInviteToConference = validate(
  inviteToConferenceValidation
);
export const validateCreateConference = validate(createConferenceValidation);
