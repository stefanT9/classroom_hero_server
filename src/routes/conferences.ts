import {
  validateCreateConference,
  validateInviteToConference,
} from "../schemas/conference";
import { Router } from "express";
import {
  getUserConferences,
  createNewConference,
  inviteUserToConference,
  getAvailableConferencesHandler,
} from "../controllers/conferenceController";

const authRouter = Router();
// todo: think how to rename the routes maybe remove some useless ones
authRouter.get("/", getUserConferences);
authRouter.get("/available", getAvailableConferencesHandler);
authRouter.post("/", validateCreateConference, createNewConference);
authRouter.post("/invite", validateInviteToConference, inviteUserToConference);

export default authRouter;
