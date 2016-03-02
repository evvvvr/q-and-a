import NetworkError from './NetworkError'

let hostURLValue, allQuestionsURL;

function buildQuestionURL(questionId) {
    return allQuestionsURL + '/' + questionId;
}

const API = {
    init({ hostURL }) {
        hostURLValue = hostURL;
        allQuestionsURL = hostURLValue + '/questions'
    },

    fetchAllQuestions() {
        return fetch(allQuestionsURL)
            .then((response) => response.json());
    },

    fetchAnsweredQuestions() {
        const answeredQuestionsURL = allQuestionsURL + '?isAnswered=yes';

        return fetch(answeredQuestionsURL)
            .then((response) => response.json());
    },

    fetchUnansweredQuestions() {
        const unansweredQuestionsURL = allQuestionsURL + '?isAnswered=no';

        return fetch(unansweredQuestionsURL)
            .then((response) => response.json());
    },

    fetchQuestion(questionId) {
        return fetch(buildQuestionURL(questionId))
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new NetworkError(response.status, response.text());
                }
            });
    },

    submitQuestion(question) {
        return fetch(allQuestionsURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });
    },

    submitAnswer(questionId, answer) {
        const answersURL = buildQuestionURL(questionId) + '/answers';

        return fetch(answersURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer)
        });
    }
};

export default API