import { Schema, model, Types, Document } from "mongoose";

export interface IConference extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  participantEmails: string[];
  hostId: Types.ObjectId;
}

const conferenceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  hostId: {
    type: Types.ObjectId,
    require: true,
  },
  participantEmails: {
    type: [String],
  },
});

conferenceSchema.virtual("conferenceId").get(function () {
  return this._id;
});
export default model<IConference>(
  "conference",
  conferenceSchema,
  "conferences"
);
