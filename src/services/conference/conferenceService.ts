import { Types } from "mongoose";
import conference from "../../model/conference";
import { IUser } from "../../model/user";
import { getUserByEmail } from "../userService.ts/userService";

export const getOwnedConferences = async (user: IUser) => {
  const conferences = await conference.find({
    hostId: user.id,
  });

  return conferences;
};

export const createConference = async (user: IUser, conferenceBody) => {
  const newConference = await conference.create({
    ...conferenceBody,
    hostId: user.id,
  });
  return newConference;
};

export const addUserToInvites = async (
  owner: IUser,
  email: string,
  conferenceId: string
) => {
  const conf = await conference.findById(Types.ObjectId(conferenceId));
  const invitedUser = await getUserByEmail(email);
  // todo: send invite email
  if (conf.participantEmails.find((val) => val === invitedUser.email)) {
    throw new Error("user is already invited");
  }
  conf.participantEmails.push(email);
  await conf.save();
};

export const getAvailableConferences = async (user: IUser) => {
  const conferences = await conference.find({
    participantEmails: user.email,
    hostId: { $ne: user.id },
  });
  const ownedConferences = await conference.find({
    hostId: user.id,
  });
  return [...conferences, ...ownedConferences];
};
