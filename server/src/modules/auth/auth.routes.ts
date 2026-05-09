import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../../common/prisma";
import { env } from "../../config/env";

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const data = registerSchema.parse(req.body);
  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      passwordHash,
    },
  });

  res.status(201).json({ success: true, userId: user.id });
});

authRouter.post("/login", async (req, res) => {
  const data = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  const accessToken = jwt.sign({ sub: user.id, role: user.role }, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ sub: user.id }, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

  res.json({ success: true, accessToken, refreshToken });
});

authRouter.post("/refresh", async (req, res) => {
  const token = z.string().parse(req.body.refreshToken);
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string };
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) {
    res.status(401).json({ success: false, message: "Invalid refresh token" });
    return;
  }

  const accessToken = jwt.sign({ sub: user.id, role: user.role }, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
  res.json({ success: true, accessToken });
});

authRouter.post("/logout", (_req, res) => {
  res.json({ success: true });
});
