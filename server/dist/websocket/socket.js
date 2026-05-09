"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWebsocket = registerWebsocket;
const socket_io_1 = require("socket.io");
const env_1 = require("../config/env");
function registerWebsocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: env_1.env.CLIENT_URL,
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        socket.on("profile:join", (profileId) => {
            socket.join(`profile:${profileId}`);
        });
        socket.on("editor:update", (payload) => {
            socket.to(`profile:${payload.profileId}`).emit("editor:patch", payload);
        });
    });
    return io;
}
