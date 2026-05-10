"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const ai_service_1 = require("./ai.service");
const router = (0, express_1.Router)();
const generateSchema = zod_1.z.object({
    feature: zod_1.z.string().min(2).max(80),
    profileId: zod_1.z.string().optional(),
    input: zod_1.z.record(zod_1.z.unknown()),
});
router.post("/generate", async (req, res) => {
    const body = generateSchema.parse(req.body);
    const output = await (0, ai_service_1.generateAiContent)({
        feature: body.feature,
        input: body.input,
        userId: req.auth?.userId,
        profileId: body.profileId,
    });
    res.json({ success: true, output });
});
exports.aiRouter = router;
