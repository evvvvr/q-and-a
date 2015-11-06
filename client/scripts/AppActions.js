import API from './API';
import Data from './mock/data.js';
import request from 'superagent';
import ScreenType from './screen-type';

const screenTypeToQuestionsURL = new Map();

screenTypeToQuestionsURL
    .set(
        ScreenType.Questions,
        API.getAllQuestionsURL.bind(API)
    );

screenTypeToQuestionsURL
    .set(
        ScreenType.Answered,
        API.getAnsweredQuestionsURL.bind(API) 
    );

screenTypeToQuestionsURL
    .set(
        ScreenType.Unanswered,
        API.getUnansweredQuestionsURL.bind(API) 
    );

function showQuestions(screenType, callback) {
    const questionsURL = screenTypeToQuestionsURL.get(screenType)();

    request
        .get(questionsURL)
        .end((err, res) => {
            callback({
                screenType: screenType,
                questions: res.body
            });
        });
}

const AppActions = {
    showAllQuestions(callback) {
        showQuestions(ScreenType.Questions, callback);
    },

    showAnsweredQuestions(callback) {
        showQuestions(ScreenType.Answered, callback); 
    },

    showUnansweredQuestions(callback) {
        showQuestions(ScreenType.Unanswered, callback);
    },

    showAskQuestionForm(callback) {
        callback({
            screenType: ScreenType.AskQuestion
        });
    },

    showQuestionDetails(questionId, callback) {
        console.info(`Question #${questionId} selected`);

        const questionURL = API.getQuestionURL(questionId);

        request
            .get(questionURL)
            .end((err, res) => {
                callback({
                    screenType: ScreenType.Question,
                    question: res.body
                });
            });        
    }
};

export default AppActions;