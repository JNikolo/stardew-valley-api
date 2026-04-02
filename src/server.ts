import createServer from "./app";
import config from "./config";

const startServer = async () => {
  const server = createServer();
  const port = config.port;
  server.listen({ port }, (err: Error | null, address: string) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      server.log.info(`Server listening at ${address}`);
    }
  });
};

startServer();
