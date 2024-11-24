import { Request } from "express";
import z from "zod";

export enum ResponseCode {
  Success = 200,
  InputError = 411,
  AlreadyExists = 403,
  ServerError = 500,
}

export interface Token {
  id: string;
}

export interface CustomRequest extends Request {
  userId?: string;
}

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username should atleast be 3 characters long")
    .max(10, "Username should not exceed 10 characters in length"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
});
