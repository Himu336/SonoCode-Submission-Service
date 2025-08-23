const TestService = require('./testService');
const fastifyPlugin = require('fastify-plugin');
async function servicePlugin(fastify, options) {
    fastify.decorate('testService', new TestService());
    fastify.decorate('submissionService', new SubmissionService(this.SubmissionRepository));
}

module.exports = fastifyPlugin(servicePlugin);