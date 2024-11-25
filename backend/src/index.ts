import express from "express";
import { userModel, contentModel, linkModel } from "./db";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest, ResponseCode, signupSchema } from "./types";
import dotenv from "dotenv";
import { userMiddleware } from "./middleware";
import e from "express";
import { random } from "./utils";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  const validInput = signupSchema.safeParse({ username, password });
  if (!validInput.success) {
    const errorMessage = validInput.error.errors[0]?.message || "Invalid Input";
    res.status(ResponseCode.InputError).json({
      message: errorMessage,
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const prevUser = await userModel.findOne({ username });
    if (prevUser) {
      res.status(ResponseCode.AlreadyExists).json({
        message: "User Already Exists",
      });
      return;
    }

    await userModel.create({
      username,
      password: hashedPassword,
    });
    res.json({
      message: "User created succesfully",
    });
  } catch (e) {
    console.log(e);
    res.status(ResponseCode.ServerError).json({
      message: "Servor Error",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      res.status(ResponseCode.InputError).json({
        message: "User does not exist",
      });
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      res.status(ResponseCode.InputError).json({
        message: "Invalid Inputs",
      });
      return;
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      jwtSecret,
    );
    res.json({
      message: "Signin successful",
      token,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(ResponseCode.ServerError).json({
      message: "Internal Servor Error",
    });
    return;
  }
});

app
  .route("/api/v1/content")
  .post(userMiddleware, async (req: CustomRequest, res) => {
    const { link, type, title } = req.body;
    try {
      await contentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: [],
      });
      res.json({
        message: "Content created successfully",
      });
      return;
    } catch (e) {
      console.log(e);
      res.status(ResponseCode.ServerError).json({
        message: "Internal Servor Error",
      });
      return;
    }
  })
  .get(userMiddleware, async (req: CustomRequest, res) => {
    try {
      const content = await contentModel
        .find({ userId: req.userId })
        .populate("userId", "username");
      res.json({
        content,
      });
      return;
    } catch (e) {
      console.log(e);
      res.status(ResponseCode.ServerError).json({
        message: "Internal Servor Error",
      });
      return;
    }
  })
  .delete(userMiddleware, async (req: CustomRequest, res) => {
    const contentId = req.body.contentId;
    try {
      await contentModel.deleteOne({ _id: contentId, userId: req.userId });
      res.json({
        message: "Deleted successfully",
      });
      return;
    } catch (e) {
      console.log(e);
      res.status(ResponseCode.ServerError).json({
        message: "Internal Servor Error",
      });
    }
  });

app.post(
  "/api/v1/brain/share",
  userMiddleware,
  async (req: CustomRequest, res) => {
    const share = req.body.share;
    if (share) {
      const alreadyExsists = await linkModel.findOne({
        userId: req.userId,
      });
      if (alreadyExsists) {
        res.status(ResponseCode.AlreadyExists).json({
          message: `share/${alreadyExsists.hash}`,
        });
        return;
      }
      const link = await linkModel.create({
        userId: req.userId,
        hash: random(10),
      });
      res.json({
        message: `/share/${link.hash}`,
      });
    } else {
      await linkModel.deleteOne({
        userId: req.userId,
      });
      res.json({
        message: "link removed",
      });
    }
  },
);

app.get("/api/v1/brain/:shareLink", async (req: CustomRequest, res) => {
  const hash = req.params.shareLink;

  const link = await linkModel.findOne({ hash });

  if (!link) {
    res.status(ResponseCode.InputError).json({
      message: "Incorrect Inputs",
    });
    return;
  }

  const content = await contentModel.findOne({
    userId: link.userId,
  });

  const user = await userModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(ResponseCode.InputError).json({
      message: "Invalid Inputs",
    });
    return;
  }

  res.json({
    username: user.username,
    content,
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
