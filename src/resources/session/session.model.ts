import { Schema, model, Document, Model } from "mongoose";

interface Session extends Document {
  expires: Date;
  lastModified: Date;
  session: any;
}

const sessionSchema = new Schema<Session>({
  _id: String,
  expires: Date,
  lastModified: Date,
  session: Object,
});

const SessionModel: Model<Session> = model<Session>(
  "whymylifeSession",
  sessionSchema
);

export default SessionModel;
