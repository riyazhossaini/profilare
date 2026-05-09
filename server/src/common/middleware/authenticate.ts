import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export interface AuthRequest extends Request {
  auth?: { userId: string; role: string };
}

export function authenticate(req: AuthRequest, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next();
    return;
  }

  const token = header.replace("Bearer ", "");
  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as { sub: string; role: string };
  req.auth = { userId: payload.sub, role: payload.role };
  next();
}
