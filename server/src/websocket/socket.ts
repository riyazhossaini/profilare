import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env";

export function registerWebsocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("profile:join", (profileId: string) => {
      socket.join(`profile:${profileId}`);
    });

    socket.on("editor:update", (payload) => {
      socket.to(`profile:${payload.profileId}`).emit("editor:patch", payload);
    });
  });

  return io;
}
