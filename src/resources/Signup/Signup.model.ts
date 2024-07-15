import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import SubscriptionModel from "../Subscriptions/Subscription.model";

export interface Iuser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  role?: string;
  terms?: boolean;
  payments?: [string];
  subscriptions?: [string] | any;
  purposes?: [string];
  isDisabled?: boolean
  comparePassword: (password: string) => Promise<boolean>;
}

const ResgisterSchema = new Schema<Iuser>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email validation regex
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    terms: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDisabled:{
      type: Boolean,
      default:false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    payments: [
      {
        type: Schema.Types.String,
        ref: "payments",
      },
    ],
    subscriptions: [
      {
        type: Schema.Types.String,
        ref: "subscriptions",
      },
    ],
    purposes: [
      {
        type: Schema.Types.String,
        ref: "purposes",
      },
    ],
  },
  {
    timestamps: true,
  }
);

ResgisterSchema.pre<Iuser>("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error: any) {
    next(error);
  }
});

// / compare password
ResgisterSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

ResgisterSchema.post("findOneAndDelete", async function (doc) {
  try {
      await SubscriptionModel.deleteMany({ 'forMe.userId': doc._id });
  } catch (error:any) {
    console.log(error)
  }
});

export default model<Iuser>("user", ResgisterSchema);
