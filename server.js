const fastify = require('fastify')({ logger: true });
const app = require('./src/app');

fastify.register(app);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT);
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
