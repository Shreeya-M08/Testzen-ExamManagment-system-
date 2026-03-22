<<<<<<< HEAD
const submissionService = require('./submissionService');
const Result = require('../models/resultModel');
=======
const submissionService = require('./submissionServices');
>>>>>>> upstream/master

async function getMyResults(studentId) {
    if (!studentId) {
        throw new Error('Student ID is required');
    }
<<<<<<< HEAD
    return submissionService.getSubmissionsByStudent(studentId);
=======
    return submissionService.getPublishedSubmissionsByStudent(studentId);
>>>>>>> upstream/master
}

async function getExamResults(examId) {
    if (!examId) {
        throw new Error('Exam ID is required');
    }
    return submissionService.getSubmissionsByExam(examId);
}

async function gradeSubmission(submissionId, marksArray) {
    return submissionService.evaluateSubmission(submissionId, marksArray);
}

<<<<<<< HEAD
async function getResultById(resultId) {
    return await submissionService.getSubmissionById(resultId);
}


=======
async function publishResult(submissionId) {
    return submissionService.publishResult(submissionId);
}

>>>>>>> upstream/master
module.exports = {
    getMyResults,
    getExamResults,
    gradeSubmission,
<<<<<<< HEAD
    getResultById
=======
    publishResult
>>>>>>> upstream/master
};
