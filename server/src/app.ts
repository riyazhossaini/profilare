import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { authenticate } from "./common/middleware/authenticate";
import { errorHandler } from "./common/middleware/error-handler";
import { authRouter } from "./modules/auth/auth.routes";
import { profilesRouter } from "./modules/profiles/profiles.routes";
import { pagesRouter } from "./modules/pages/pages.routes";
import { sectionsRouter } from "./modules/sections/sections.routes";
import { blocksRouter } from "./modules/blocks/blocks.routes";
import { themesRouter } from "./modules/themes/themes.routes";
import { mediaRouter } from "./modules/media/media.routes";
import { analyticsRouter } from "./modules/analytics/analytics.routes";
import { draftsRouter } from "./modules/drafts/drafts.routes";
import { permissionsRouter } from "./modules/permissions/permissions.routes";
import { aiRouter } from "./modules/ai/ai.routes";
import { feedbackRouter } from "./modules/feedback/feedback.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "5mb" }));
  app.use(cookieParser());
  app.use(authenticate);

  app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "Profilare backend is running" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/profiles", profilesRouter);
  app.use("/api/pages", pagesRouter);
  app.use("/api/sections", sectionsRouter);
  app.use("/api/blocks", blocksRouter);
  app.use("/api/themes", themesRouter);
  app.use("/api/media", mediaRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use("/api/drafts", draftsRouter);
  app.use("/api/permissions", permissionsRouter);
  app.use("/api/ai", aiRouter);
  app.use("/api/feedback", feedbackRouter);

  app.use(errorHandler);

  return app;
}
