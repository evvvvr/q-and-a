import API from './API';
import Data from './mock/data.js';
import request from 'superagent';
import ScreenType from './screen-type';
import { compareItemsChronologically } from './util/date-time-util';

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

function compareQuestionsChronologically(a, b) {
    return compareItemsChronologically(
        a.dateTimeAsked,
        b.dateTimeAsked
    );
};

function showQuestions(screenType, callback) {
    const questionsURL = screenTypeToQuestionsURL.get(screenType)();

    request
        .get(questionsURL)
        .type('application/json')
        .end((err, res) => {
            const questionsLoaded = res.body
                .sort(compareQuestionsChronologically);

            callback({
                screenType: screenType,
                questions: questionsLoaded
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

        callback({
            screenType: ScreenType.Question,
            question: Data.questionDetails
        });        
    }
};

export default AppActions;