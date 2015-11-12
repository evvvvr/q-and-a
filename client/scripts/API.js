import request from 'superagent';

const API = {
    init({ hostURL, timeout }) {
        this.hostURL = hostURL;
        this.timeout = timeout;

        this.allQuestionsURL = this.hostURL + '/questions'
    },

    fetchAllQuestions(callback) {
        request
            .get(this.allQuestionsURL)
            .timeout(this.timeout)
            .end(callback);
    },

    fetchAnsweredQuestions(callback) {
        request
            .get(this.allQuestionsURL)
            .query({ isAnswered: 'yes' })
            .timeout(this.timeout)
            .end(callback);
    },

    fetchUnansweredQuestions(callback) {
        request
            .get(this.allQuestionsURL)
            .query({ isAnswered: 'no' })
            .timeout(this.timeout)
            .end(callback);
    }
};

export default API;