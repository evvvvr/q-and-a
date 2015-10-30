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

        this.ScreenTypeToViewRendererMap
            .set(
                ScreenType.Questions,
                () => (
                        <Questions
                            questionsType={QuestionsType.AllQuestions}
                            onQuestionSelected={this.handleQuestionSelected.bind(this)}
                        />
                    )
            );

        this.ScreenTypeToViewRendererMap
            .set(
                ScreenType.Answered,
                () => (
                        <Questions
                            questionsType={QuestionsType.Answered}
                            onQuestionSelected={this.handleQuestionSelected.bind(this)}
                        />
                    )
            );

        this.ScreenTypeToViewRendererMap
            .set(
                ScreenType.Unanswered,
                () => (
                        <Questions
                            questionsType={QuestionsType.Unanswered}
                            onQuestionSelected={this.handleQuestionSelected.bind(this)}
                        />
                    )
            );

        this.ScreenTypeToViewRendererMap
            .set(
                ScreenType.AskQuestion,
                () => <AskQuestionForm />
            );

        this.ScreenTypeToViewRendererMap
            .set(
                ScreenType.Question,
                () => <QuestionDetails {...Data.questionDetails} />
            );

        this.state = { screenType: props.initialScreen };
    }

    handleMenuItemSelected(eventArgs) {
        this.setState({ screenType: eventArgs.menuItemValue });
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