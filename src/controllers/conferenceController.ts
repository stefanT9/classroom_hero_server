import { getUserFromHeader } from "../services/auth/authService";
import {
  getOwnedConferences,
  createConference,
  addUserToInvites,
  getAvailableConferences,
} from "../services/conference/conferenceService";
import { RequestHandler } from "express";
import getLogger from "../utlis/logger";
import { conferenceMetadata, conference } from "../model";
const logger = getLogger("[Conference]");

export const getConferenceById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const resConference = await conference.findById(id);
    if (resConference) {
      return res
        .status(200)
        .json({ conference: resConference, message: "success" });
    }
    return res.status(404).json({ conference: null, message: "not found" });
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({ conference: null, message: err.message });
  }
};
export const getUserConferences: RequestHandler = async (req, res) => {
  try {
    const user = await getUserFromHeader(req.headers);
    logger.info(user);
    const conferences = await getOwnedConferences(user);
    logger.info(conferences);
    return res.status(200).json({ conferences });
  } catch (err) {
    return res.status(500).json({ conferences: null, message: err.message });
  }
};

export const createNewConference: RequestHandler = async (req, res) => {
  try {
    const user = await getUserFromHeader(req.headers);
    const conference = await createConference(user, req.body);
    return res.status(200).json({ conference });
  } catch (err) {
    logger.error({ message: err.message, body: req.body });
    return res.status(500).json({ conferences: null, message: err.message });
  }
};

export const inviteUserToConference: RequestHandler = async (req, res) => {
  try {
    const { email, conferenceId }: { email: string; conferenceId: string } =
      req.body;
    const user = await getUserFromHeader(req.headers);
    await addUserToInvites(user, email, conferenceId);
    return res
      .status(200)
      .json({ message: "successfuly invited user to conference" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAvailableConferencesHandler: RequestHandler = async (
  req,
  res
) => {
  try {
    const user = await getUserFromHeader(req.headers);
    const conferences = await getAvailableConferences(user);
    return res.status(200).json({ conferences });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addMetadataToConference: RequestHandler = async (req, res) => {
  try {
    await conferenceMetadata.create({
      userId: req.body.user.id,
      conferenceRoom: req.body.user.room,
      username: req.body.user.username,
      timestamp: Date.now(),
      type: req.body.type,
      metadata: {
        ...req.body.metadata,
      },
    });
    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getConferenceMetadata: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const metadata = await conferenceMetadata.find({
      conferenceRoom: id,
    });
    return res.status(200).json({ metadata });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
