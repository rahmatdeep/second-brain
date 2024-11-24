import { Response, Request, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomRequest, ResponseCode, Token } from "./types";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export async function userMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers["authorization"];
  if (!header || !jwtSecret) {
    res.status(ResponseCode.InputError).json({
      message: "You are not logged in",
    });
    return;
  }
  try {
    const decoded = jwt.verify(header, jwtSecret) as Token;
    if (decoded) {
      req.userId = decoded.id;
    }
    next();
  } catch (e) {
    res.status(ResponseCode.InputError).json({
      message: "You are not logged in",
    });
    console.log(e);
  }
}
