import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        email?: string;
        adminDetail?: Document;
      };
    }
  }
}

export {};