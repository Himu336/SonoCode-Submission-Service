async function v1Plugin(fastify, options) {
    fastify.register(require('./test/testRoutes'), {prefix: '/test'});
    fastify.register(require('./submission/submissionRoutes'), {prefix: '/submission'});
}

module.exports = v1Plugin