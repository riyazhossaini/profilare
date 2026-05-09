"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma_1 = require("../../common/prisma");
const env_1 = require("../../config/env");
const registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/register", async (req, res) => {
    const data = registerSchema.parse(req.body);
    const passwordHash = await bcrypt_1.default.hash(data.password, 12);
    const user = await prisma_1.prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            passwordHash,
        },
    });
    res.status(201).json({ success: true, userId: user.id });
});
exports.authRouter.post("/login", async (req, res) => {
    const data = loginSchema.parse(req.body);
    const user = await prisma_1.prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt_1.default.compare(data.password, user.passwordHash))) {
        res.status(401).json({ success: false, message: "Invalid credentials" });
        return;
    }
    const accessToken = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, env_1.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ sub: user.id }, env_1.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
    res.json({ success: true, accessToken, refreshToken });
});
exports.authRouter.post("/refresh", async (req, res) => {
    const token = zod_1.z.string().parse(req.body.refreshToken);
    const payload = jsonwebtoken_1.default.verify(token, env_1.env.JWT_REFRESH_SECRET);
    const user = await prisma_1.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
        res.status(401).json({ success: false, message: "Invalid refresh token" });
        return;
    }
    const accessToken = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, env_1.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
    res.json({ success: true, accessToken });
});
exports.authRouter.post("/logout", (_req, res) => {
    res.json({ success: true });
});
