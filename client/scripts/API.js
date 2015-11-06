const API = {
    init(hostURL) {
        this.hostURL = hostURL;
    },

    getAllQuestionsURL() {
        return this.hostURL + '/questions';
    },

    getAnsweredQuestionsURL() {
        return this.hostURL + '/questions?isAnswered=yes';
    },

    getUnansweredQuestionsURL() {
        return this.hostURL + '/questions?isAnswered=no';
    },

    getQuestionURL(id) {
        return this.hostURL + '/questions/' + id;
    }
};

export default API;