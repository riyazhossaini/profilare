import type { Request, Response, NextFunction } from "express";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof Error) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }

  res.status(500).json({ success: false, message: "Unexpected server error" });
}
