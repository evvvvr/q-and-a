import Promise from 'bluebird'

const DbService = {
    getAllQuestions() {
        return Promise.resolve([]);
    },

    getUnansweredQuestions() {
        return Promise.resolve([]);
    },

    getAnsweredQuestions() {
        return Promise.resolve([]);
    },

    getQuestion(id) {
        return Promise.resolve({
            id: -1,
            dateTimeAsked: '2016-03-16 10:45:05',
            text: 'test question',
            user: 'voga',
            answers: []
        });
    },

    insertQuestion(question) {
        return Promise.resolve({
            id: -1,
            dateTimeAsked: '2016-03-16 10:45:05',
            text: 'test question',
            user: 'voga',
            answers: []
        });
    },

    insertAnswer(questionId, answer) {
        return Promise.resolve({
            id: -1,
            dateTimeAnswered: '2016-03-16 11:09:42',
            text: 'test answer',
            user: 'voga',
            questionId: -1
        });
    }
};

export default DbService;