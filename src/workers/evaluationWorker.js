const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');

function evaluationWorker(queue){
    new Worker('EvaluationQueue', async job => {
        if(job.name === 'EvaluationJob'){
            const response = await axios.post('http://localhost:4003/sendPayload', {
                userId: job.data.userId,
                payload: job.data
            });
            console.log(response);
            console.log(job);
        };
    }, {
        connection: redisConnection
    });
};

module.exports = evaluationWorker;