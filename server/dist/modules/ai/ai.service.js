"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAiContent = generateAiContent;
const prisma_1 = require("../../common/prisma");
const prisma_json_1 = require("../../common/utils/prisma-json");
function toText(value) {
    if (typeof value === "string")
        return value.trim();
    if (Array.isArray(value))
        return value.map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean).join(", ");
    if (value && typeof value === "object")
        return JSON.stringify(value);
    return "";
}
function inferTopic(input) {
    const keys = ["topic", "goal", "role", "headline", "title", "focus", "bio"];
    for (const key of keys) {
        const text = toText(input[key]);
        if (text)
            return text;
    }
    return "personal profile growth";
}
async function generateAiContent({ feature, input, userId, profileId, }) {
    const topic = inferTopic(input);
    const objective = toText(input.objective) || toText(input.goal) || "Create clear, public-ready profile content.";
    const audience = toText(input.audience) || "recruiters, collaborators, and peers";
    const output = {
        title: `Draft for ${topic}`,
        summary: `This draft helps present ${topic} with clarity. It is optimized for ${audience} and aligned to your objective: ${objective}`,
        bullets: [
            `Focus on specific outcomes and real examples related to ${topic}.`,
            "Use short, direct language and avoid vague claims.",
            "Keep sections structured so visitors understand you quickly.",
        ],
        nextSteps: [
            "Edit wording to match your real voice.",
            "Remove any line that is not true for your profile.",
            "Publish only the sections you are confident about.",
        ],
    };
    await prisma_1.prisma.aiPrompt.create({
        data: {
            userId: userId || "anonymous",
            profileId,
            feature,
            input: (0, prisma_json_1.toInputJson)(input),
            output: (0, prisma_json_1.toInputJson)(output),
        },
    });
    return output;
}
