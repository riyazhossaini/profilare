"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/generate", async (req, res) => {
    res.json({
        success: true,
        message: "AI layer placeholder ready. Connect OpenAI/Anthropic provider in ai service.",
        request: req.body,
    });
});
exports.aiRouter = router;
