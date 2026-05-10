# Profilare

This repository contains:

- `server` (Express + Prisma backend)
- `client` (Vite + React frontend)

## Prerequisites

- Node.js 20+
- PostgreSQL running locally
- Redis running locally

## 1) Configure environment

Backend:

1. Copy `server/.env.example` to `server/.env`
2. Update values as needed

Frontend:

1. Copy `client/.env.example` to `client/.env`

## 2) Install dependencies

```bash
npm run install:all
```

If PowerShell blocks `npm`, use:

```bash
npm.cmd run install:all
```

## 3) Prepare database

```bash
cd server
npm run prisma:migrate
```

## 4) Run apps

In terminal 1:

```bash
npm run dev:server
```

In terminal 2:

```bash
npm run dev:client
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## 5) Production builds

```bash
npm run build
```
