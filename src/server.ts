try {
  const config = require('./config/config');
  const server = config.server;
  const app = require('./app').default;

  app.listen(server.port, () => {
    console.log(`Server running on port ${server.port}`);
  });
} catch (error) {
  console.log(error);
}
