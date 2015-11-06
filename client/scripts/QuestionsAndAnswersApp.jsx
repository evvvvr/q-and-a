import AppActions from './AppActions.js';
import AskQuestionForm from './MainContent/AskQuestionForm';
import QuestionDetails from './MainContent/QuestionDetails/QuestionDetails';
import Questions from './MainContent/Questions';
import React from 'react';
import request from 'superagent';
import ScreenType from './screen-type';
import TopMenu from './TopMenu/TopMenu';

export default class QuestionsAndAnswersApp extends React.Component {
    constructor(props) {
        super(props);

        this.ScreenTypeToViewRendererMap = new Map();

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.Questions,
            () => (
                    <Questions
                        header="All Questions"
                        questions={this.state.questions}
                        onQuestionSelected={this.handleQuestionSelected.bind(this)}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.Answered,
            () => (
                    <Questions
                        header="Answered Questions"
                        questions={this.state.questions}
                        onQuestionSelected={this.handleQuestionSelected.bind(this)}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.Unanswered,
            () => (
                    <Questions
                        header="Unanswered Questions"
                        questions={this.state.questions}
                        onQuestionSelected={this.handleQuestionSelected.bind(this)}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.AskQuestion,
            () => (
                    <AskQuestionForm
                        onQuestionSubmit={this.handleQuestionSubmit.bind(this)}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.Question,
            () => (
                    <QuestionDetails
                        {...this.state.question}
                        onAnswerSubmit={this.handleAnswerSubmit.bind(this)}
                    />
            ));

        this.state = {
            screenType: ScreenType.Questions,
            questions: []
        };

        console.info('Initial app state is %O', this.state);
    }

    componentDidMount() {
        // TODO: fix this hack to load initial screen – we're sending a signal
        // that application has been loaded
        this.handleMenuItemSelected({
            menuItemValue: ScreenType.Questions
        });
    }

    onChange(newAppState) {
        console.info('App state has been changed to %O', newAppState);

        this.setState(newAppState);
    }

    handleMenuItemSelected(eventArgs) {
        const boundOnChange = this.onChange.bind(this);

        switch (eventArgs.menuItemValue) {
            case ScreenType.Questions:
                AppActions.showAllQuestions(boundOnChange);
                break;

            case ScreenType.Answered:
                AppActions.showAnsweredQuestions(boundOnChange);
                break;

            case ScreenType.Unanswered:
                AppActions.showUnansweredQuestions(boundOnChange);
                break;

            case ScreenType.AskQuestion:
                AppActions.showAskQuestionForm(boundOnChange);
                break;

            default:
                console.error(
                    `Unknown screen type selected: ${eventArgs.menuItemValue}`
                );
                break;
        }
    }

    handleQuestionSelected(eventArgs) {
        AppActions.showQuestionDetails(
            eventArgs.questionId,
            this.onChange.bind(this)
        );
    }

    handleQuestionSubmit(eventArgs) {
        // TODO: Fix hack with calling 'handleMenuItemSelected'
        // We are sending a signal to load all questions
        AppActions.submitQuestion(
            eventArgs,
            () => this.handleMenuItemSelected({
                    menuItemValue: ScreenType.Questions
        }));
    }

    handleAnswerSubmit(eventArgs) {
        // TODO: Fix hack with calling 'handleQuestionSelected'
        // We are sending a signal to reload question
        AppActions.submitAnswer(
            eventArgs,
            () => this.handleQuestionSelected({
                questionId: eventArgs.questionId
        }));
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