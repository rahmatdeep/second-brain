import mongoose, { model, Schema, Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    if (!process.env.MONGO_CONNECTION) {
      return;
    }
    await mongoose.connect(process.env.MONGO_CONNECTION);

    console.log("Connected to the db");
  } catch (e) {
    console.log("Failed to connect to the db ", e);
  }
})();

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const contentTypes = ["youtube", "twitter"];

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});
const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const linkSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const userModel = model("User", userSchema);
export const contentModel = model("Content", contentSchema);
export const tagModel = model("Tag", tagSchema);
export const linkModel = model("Link", linkSchema);
