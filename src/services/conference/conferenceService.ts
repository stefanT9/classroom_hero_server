import { Types } from "mongoose";
import conference from "../../model/conference";
import { IUser } from "../../model/user";
import { getUserByEmail } from "../userService.ts/userService";
import * as sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const SEND_INVITE_TEMPLATE = "d-1d30ce94619f40a4ae8394036327b891";

// const base = "localhost:3000/conference";
const base = "https://projects.zicar.info/conference";

export const sendMail = (
  to: string,
  conferenceName: string,
  description: string,
  username: string,
  from: Date,
  link: string
) => {
  console.log({
    to,
    from: "stefan.tomsa99gmail.com",
    templateId: SEND_INVITE_TEMPLATE,
    dynamicTemplateData: {
      username,
      link,
      name: conferenceName,
      description,
      startDate: from.toDateString(),
      startTime: from.toTimeString(),
    },
  });
  return sgMail
    .send({
      to,
      from: "stefan.tomsa99@gmail.com",
      templateId: SEND_INVITE_TEMPLATE,
      dynamicTemplateData: {
        username,
        link,
        name: conferenceName,
        description,
        startDate: from.toDateString(),
        startTime: from.toTimeString(),
      },
    })
    .then((res) => {
      console.log("email sent", res);
    })
    .catch((err) => {
      console.error("err=>", JSON.stringify(err));
    });
};
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
  console.log(newConference);
  console.log(user);
  newConference.participantEmails.forEach((email) => {
    console.log("sending to ", email);
    sendMail(
      email,
      newConference.name,
      newConference.description,
      user.username,
      newConference.startTime,
      `${base}/${newConference.id}`
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
  sendMail(
    email,
    conf.name,
    conf.description,
    owner.username,
    conf.startTime,
    `${base}/${conf.id}`
  );
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
