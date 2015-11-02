import React from 'react';
import ScreenType from './screen-type';
import TopMenu from './TopMenu/TopMenu';
import Questions, { QuestionsType } from './MainContent/Questions';
import QuestionDetails from './MainContent/QuestionDetails/QuestionDetails';
import AskQuestionForm from './MainContent/AskQuestionForm';
import Data from './mock/data.js';

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
                )
        );

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.Answered,
            () => (
                    <Questions
                        header="Answered Questions"
                        questions={this.state.questions}
                        onQuestionSelected={this.handleQuestionSelected.bind(this)}
                    />
                )
        );

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.Unanswered,
            () => (
                    <Questions
                        header="Unanswered Questions"
                        questions={this.state.questions}
                        onQuestionSelected={this.handleQuestionSelected.bind(this)}
                    />
                )
        );

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.AskQuestion,
            () => <AskQuestionForm />
        );

        this.ScreenTypeToViewRendererMap.set(
            ScreenType.Question,
            () => <QuestionDetails {...Data.questionDetails} />
        );
    }

    componentWillMount() {
        // TODO: fix this hack to load initial screen – we're sending a signal
        // that application is loading
        this.handleMenuItemSelected({
            menuItemValue: this.props.initialScreen
        });
    }

    handleMenuItemSelected(eventArgs) {
        let newAppState = {};

        switch (eventArgs.menuItemValue) {
            case ScreenType.Questions:
                newAppState = {
                    screenType: ScreenType.Questions,
                    questions: Data.allQuestions
                };

                break;

            case ScreenType.Answered:
                newAppState = {
                    screenType: ScreenType.Answered,
                    questions: Data.answeredQuestions
                };

                break;

            case ScreenType.Unanswered:
                newAppState = {
                    screenType: ScreenType.Unanswered,
                    questions: Data.unansweredQuestions
                };

                break;

            default:
                newAppState = { screenType: eventArgs.menuItemValue };
                break;
        }

        this.setState(newAppState);
    }

    handleQuestionSelected(eventArgs) {
        console.log(`Question #${eventArgs.questionId} selected`);

        this.setState({
            screenType: ScreenType.Question,
            questionId: eventArgs.questionId
        });
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