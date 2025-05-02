const path = require('path');
const AutoLoad = require('@fastify/autoload');

module.exports = async function (fastify, opts) {
  fastify.register(require('./plugins/db'));
  fastify.register(require('./plugins/jwt'));
  fastify.register(require('./routes/auth.routes'), { prefix: '/api/auth' });
};
