const fastify = require('fastify')({ logger: true });
const app = require('./src/app');
require('dotenv').config();

fastify.register(app);


const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
