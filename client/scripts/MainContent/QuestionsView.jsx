import React from 'react';
import QuestionsList from './QuestionsList';
import Data from '../mock/data.js';

export const QuestionsType = {
    AllQuestions: Symbol(),
    Answered: Symbol(),
    Unanswered: Symbol()
};

const QuestionsTypeToHeaderText = new Map();

QuestionsTypeToHeaderText
    .set(QuestionsType.AllQuestions, 'All Questions');

QuestionsTypeToHeaderText
    .set(QuestionsType.Answered, 'Answered Questions');

QuestionsTypeToHeaderText
    .set(QuestionsType.Unanswered, 'Unanswered Questions');

const QuestionsTypeToMockData = new Map();

QuestionsTypeToMockData
    .set(QuestionsType.AllQuestions, Data.allQuestions);

QuestionsTypeToMockData
    .set(QuestionsType.Answered, Data.answeredQuestions);

QuestionsTypeToMockData
    .set(QuestionsType.Unanswered, Data.unansweredQuestions);

export default class QuestionsView extends React.Component {
    render() {
        const HeaderText = QuestionsTypeToHeaderText
            .get(this.props.questionsType);

        const QuestionsData = QuestionsTypeToMockData
            .get(this.props.questionsType);

        return (
            <div>
                <h3>{HeaderText}</h3>
                <QuestionsList questions={QuestionsData} />
            </div>
        );
    }
}