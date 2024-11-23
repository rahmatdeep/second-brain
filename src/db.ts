import mongoose, { model, Schema, Types } from "mongoose";

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.fjvxy.mongodb.net/second-brain",
    );
    console.log("Connected to the db");
  } catch (e) {
    console.log("Failed to connect to the db ", e);
  }
})();

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});
const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

export const userModel = model("User", userSchema);
export const contentModel = model("Content", contentSchema);
export const tagModel = model("Tag", tagSchema);
