const SubmissionProducer = require('../producers/submissionQueueProducer')

class SubmissionService {
    constructor(submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    async addSubmission(submissionPayload){
        const submission = await this.submissionRepository.createSubmission(submissionPayload);
        if(!submission){
            //here error handling can be better
            throw {message: "Not able to create submission"};
        }
        console.log(submission);
        const response = await SubmissionProducer(submission)
        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService