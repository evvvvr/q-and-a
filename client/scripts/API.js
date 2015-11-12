import request from 'superagent';

let hostURLValue, timeoutValue, allQuestionsURL;

function buildQuestionURL (questionId) {
    return allQuestionsURL + '/' + questionId;
}

const API = {
    init({ hostURL, timeout }) {
        hostURLValue = hostURL;
        timeoutValue = timeout;
        allQuestionsURL = hostURLValue + '/questions'
    },

    fetchAllQuestions(callback) {
        request
            .get(allQuestionsURL)
            .timeout(timeoutValue)
            .end(callback);
    },

    fetchAnsweredQuestions(callback) {
        request
            .get(allQuestionsURL)
            .query({ isAnswered: 'yes' })
            .timeout(timeoutValue)
            .end(callback);
    },

    fetchUnansweredQuestions(callback) {
        request
            .get(allQuestionsURL)
            .query({ isAnswered: 'no' })
            .timeout(timeoutValue)
            .end(callback);
    },

    fetchQuestion(questionId, callback) {
        request
            .get(buildQuestionURL(questionId))
            .timeout(timeoutValue)
            .end(callback);
    },

    submitQuestion(question, callback) {
        request
            .post(allQuestionsURL)
            .send(question)
            .timeout(timeoutValue)
            .end(callback);
    },

    submitAnswer(questionId, answer, callback) {
        const answersURL = buildQuestionURL(questionId) + '/answers';

        request
            .post(answersURL)
            .send(answer)
            .timeout(timeoutValue)
            .end(callback);
    }
};

export default API;