import { createServer } from "http";
import { createApp } from "./app";
import { env } from "./config/env";
import { registerWebsocket } from "./websocket/socket";

async function bootstrap() {
  const app = createApp();
  const server = createServer(app);
  registerWebsocket(server);

  server.listen(Number(env.PORT), () => {
    console.log(`Profilare backend running on http://localhost:${env.PORT}`);
  });
}

void bootstrap();
