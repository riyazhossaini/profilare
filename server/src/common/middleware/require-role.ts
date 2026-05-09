import type { NextFunction, Response } from "express";
import type { AuthRequest } from "./authenticate";

export function requireRole(allowed: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.auth || !allowed.includes(req.auth.role)) {
      res.status(403).json({ success: false, message: "Forbidden" });
      return;
    }
    next();
  };
}
