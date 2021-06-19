import { Schema, model, Types, Document, Mongoose, mongo } from "mongoose";

interface IEmotions {
  absent: boolean;
  joy: string;
  anger: string;
  sorrow: string;
  surprise: string;
}
export interface IConferenceMetadata extends Document {
  _id: Types.ObjectId;
  username: string;
  userId: string;
  timestamp: Date;
  conferenceRoom: string;
  metadata: any;
}

const conferenceMetadataSchema = new Schema<any>({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  conferenceRoom: {
    type: String,
    require: true,
  },
  type: String,
  metadata: Schema.Types.Mixed,
});

export default model<any>(
  "conferenceMetadata",
  conferenceMetadataSchema,
  "conferenceMetadata"
);
