"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const authenticate_1 = require("./common/middleware/authenticate");
const error_handler_1 = require("./common/middleware/error-handler");
const auth_routes_1 = require("./modules/auth/auth.routes");
const profiles_routes_1 = require("./modules/profiles/profiles.routes");
const pages_routes_1 = require("./modules/pages/pages.routes");
const sections_routes_1 = require("./modules/sections/sections.routes");
const blocks_routes_1 = require("./modules/blocks/blocks.routes");
const themes_routes_1 = require("./modules/themes/themes.routes");
const media_routes_1 = require("./modules/media/media.routes");
const analytics_routes_1 = require("./modules/analytics/analytics.routes");
const drafts_routes_1 = require("./modules/drafts/drafts.routes");
const permissions_routes_1 = require("./modules/permissions/permissions.routes");
const ai_routes_1 = require("./modules/ai/ai.routes");
const feedback_routes_1 = require("./modules/feedback/feedback.routes");
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: env_1.env.CLIENT_URL,
        credentials: true,
    }));
    app.use(express_1.default.json({ limit: "5mb" }));
    app.use((0, cookie_parser_1.default)());
    app.use(authenticate_1.authenticate);
    app.get("/api/health", (_req, res) => {
        res.json({ success: true, message: "Profilare backend is running" });
    });
    app.use("/api/auth", auth_routes_1.authRouter);
    app.use("/api/profiles", profiles_routes_1.profilesRouter);
    app.use("/api/pages", pages_routes_1.pagesRouter);
    app.use("/api/sections", sections_routes_1.sectionsRouter);
    app.use("/api/blocks", blocks_routes_1.blocksRouter);
    app.use("/api/themes", themes_routes_1.themesRouter);
    app.use("/api/media", media_routes_1.mediaRouter);
    app.use("/api/analytics", analytics_routes_1.analyticsRouter);
    app.use("/api/drafts", drafts_routes_1.draftsRouter);
    app.use("/api/permissions", permissions_routes_1.permissionsRouter);
    app.use("/api/ai", ai_routes_1.aiRouter);
    app.use("/api/feedback", feedback_routes_1.feedbackRouter);
    app.use(error_handler_1.errorHandler);
    return app;
}
