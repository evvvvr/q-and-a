import AskQuestionForm from '../components/AskQuestionForm';
import QuestionDetails from '../components/QuestionDetails/QuestionDetails';
import Questions from '../components/Questions';
import React from 'react';
import ScreenTypes from '../ScreenTypes';
import Store from '../Store';
import TopMenu from '../components/TopMenu/TopMenu';
import { answerChanged, submitAnswer } from '../actions/answer-actions';
import { selectQuestion, fetchQuestion, submitQuestion } from '../actions/question-actions';
import { showAllQuestions, fetchAllQuestions } from '../actions/all-questions-actions';
import { showAnsweredQuestions, fetchAnsweredQuestions } from '../actions/answered-questions-actions'; 
import { showAskForm } from '../actions/actions';
import { showUnansweredQuestions, fetchUnansweredQuestions } from '../actions/unanswered-questions-actions';

export default class QuestionsAndAnswersApp extends React.Component {
    constructor(props) {
        super(props);

        this.ScreenTypeToViewRendererMap = new Map();

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.Questions,
            () => (
                    <Questions
                        header="All Questions"
                        questions={this.state.allQuestions.items}
                        onQuestionSelected={this.handleQuestionSelected.bind(this)}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.Answered,
            () => (
                    <Questions
                        header="Answered Questions"
                        questions={this.state.answeredQuestions.items}
                        onQuestionSelected={this.handleQuestionSelected.bind(this)}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.Unanswered,
            () => (
                    <Questions
                        header="Unanswered Questions"
                        questions={this.state.unansweredQuestions.items}
                        onQuestionSelected={this.handleQuestionSelected.bind(this)}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.AskQuestion,
            () => (
                    <AskQuestionForm
                        onQuestionSubmit={this.handleQuestionSubmit.bind(this)}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.Question,
            () => (
                    <QuestionDetails
                        isLoading={this.state.question.isFetching}
                        {...this.state.question.data}
                        answer={this.state.answer.data}
                        onAnswerChange={this.handleAnswerChange.bind(this)}
                        onAnswerSubmit={this.handleAnswerSubmit.bind(this)}
                    />
            ));

        this.state = Store.getState();
    }

    componentDidMount() {
        Store.subscribe(this.onChange.bind(this));

        Store.dispatch(showAllQuestions());
        Store.dispatch(fetchAllQuestions());
    }

    onChange(newAppState) {
        this.setState(newAppState);
    }

    handleMenuItemSelected(eventArgs) {
        switch (eventArgs.menuItemValue) {
            case ScreenTypes.Questions:
                Store.dispatch(showAllQuestions());
                Store.dispatch(fetchAllQuestions());
                break;

            case ScreenTypes.Answered:
                Store.dispatch(showAnsweredQuestions());
                Store.dispatch(fetchAnsweredQuestions());
                break;

            case ScreenTypes.Unanswered:
                Store.dispatch(showUnansweredQuestions());
                Store.dispatch(fetchUnansweredQuestions());
                break;

            case ScreenTypes.AskQuestion:
                Store.dispatch(showAskForm());
                break;

            default:
                throw `Unknown screen type selected: ${eventArgs.menuItemValue}`;
        }
    }

    handleQuestionSelected(eventArgs) {
        Store.dispatch(selectQuestion(eventArgs.questionId));
        Store.dispatch(fetchQuestion(eventArgs.questionId));
    }

    handleQuestionSubmit(eventArgs) {
        Store.dispatch(submitQuestion(eventArgs.question));
    }

    handleAnswerChange(eventArgs) {
        Store.dispatch(answerChanged(eventArgs.answer));   
    }

    handleAnswerSubmit(eventArgs) {
        console.log('submit answer %O', eventArgs.answer);

        Store.dispatch(
            submitAnswer(
                eventArgs.questionId,
                eventArgs.answer
        ));
    }

    render() {
        const MainViewToRender = this.ScreenTypeToViewRendererMap
            .get(this.state.screenType)();

        return (
            <div>
                <TopMenu
                    selectedMenuItem={this.state.screenType}
                    onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                />
                <div className="pure-g">
                    <div className="content pure-u-1 pure-u-md-3-4">
                        <section id="mainContent">{MainViewToRender}</section>
                    </div>
                </div>
            </div>
        );
    }
};