"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = require("./app");
const env_1 = require("./config/env");
const socket_1 = require("./websocket/socket");
async function bootstrap() {
    const app = (0, app_1.createApp)();
    const server = (0, http_1.createServer)(app);
    (0, socket_1.registerWebsocket)(server);
    server.listen(Number(env_1.env.PORT), () => {
        console.log(`Profilare backend running on http://localhost:${env_1.env.PORT}`);
    });
}
void bootstrap();
