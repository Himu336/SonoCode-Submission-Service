//  validation can be added
async function createSubmission(req, res){
    const response  = await this.submissionService.addSubmission(req.body);
    return res.status(201).json({
        error: {},
        data: response,
        success: true,
        message: 'Created submission successfully'
    });
}

module.exports = {
    createSubmission
}