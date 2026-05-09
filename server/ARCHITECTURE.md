# Profilare Backend Architecture

## Stack
- Node.js + TypeScript + Express
- PostgreSQL + Prisma ORM
- Redis (autosave and cache foundation)
- JWT auth + role-ready permissions
- Socket.IO real-time editing channel

## Folder Structure
- src/modules/auth
- src/modules/profiles
- src/modules/pages
- src/modules/sections
- src/modules/blocks
- src/modules/themes
- src/modules/media
- src/modules/analytics
- src/modules/drafts
- src/modules/permissions
- src/modules/ai
- src/common
- src/config
- src/websocket
- prisma/schema.prisma

## Dynamic Builder Capabilities
- Unlimited pages per profile
- Dynamic sections and block system (JSON content/settings)
- Reorder APIs for pages/sections/blocks with transaction-safe updates
- Duplicate page and section with nested children cloning
- Visibility controls at profile/page/section level
- Draft autosave records and version history snapshots

## API Surface
- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`
- Profiles: `/api/profiles`
- Pages: `/api/pages`
- Sections: `/api/sections`
- Blocks: `/api/blocks`
- Themes: `/api/themes`
- Media: `/api/media`
- Analytics: `/api/analytics`
- Drafts & versions: `/api/drafts/autosave`, `/api/drafts/snapshot`
- Permissions: `/api/permissions/grant`, `/api/permissions/revoke`
- AI-ready: `/api/ai/generate`

## Real-time Editing
- WebSocket server in `src/websocket/socket.ts`
- Rooms by profile: `profile:{profileId}`
- Events: `profile:join`, `editor:update`, broadcast `editor:patch`

## Run
1. Copy `.env.example` to `.env`
2. Install packages: `npm install`
3. Generate Prisma client: `npm run prisma:generate`
4. Migrate DB: `npm run prisma:migrate`
5. Start dev server: `npm run dev`
