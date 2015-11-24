import AskQuestionForm from './AskQuestionForm';
import QuestionDetails from '../containers/QuestionDetails/QuestionDetails';
import Questions from './Questions';
import React from 'react';
import ScreenTypes from '../ScreenTypes';
import Store from '../Store';
import TopMenu from '../components/TopMenu/TopMenu';
import { showAllQuestions, fetchAllQuestions } from '../actions/all-questions-actions';
import { showAnsweredQuestions, fetchAnsweredQuestions } from '../actions/answered-questions-actions'; 
import { showQuestionForm } from '../actions/question-to-submit-actions';
import { showUnansweredQuestions, fetchUnansweredQuestions } from '../actions/unanswered-questions-actions';

class QuestionsAndAnswersApp extends React.Component {
    constructor(props) {
        super(props);

        this.ScreenTypeToViewRendererMap = new Map();

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.Questions,
            () => (
                    <Questions
                        header="All Questions"
                        questions={this.state.allQuestions.items}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.Answered,
            () => (
                    <Questions
                        header="Answered Questions"
                        questions={this.state.answeredQuestions.items}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.Unanswered,
            () => (
                    <Questions
                        header="Unanswered Questions"
                        questions={this.state.unansweredQuestions.items}
                    />
        ));

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.AskQuestion,
            () => <AskQuestionForm />
        );

        this.ScreenTypeToViewRendererMap.set(
            ScreenTypes.Question,
            () => (
                    <QuestionDetails questionId={this.state.question.data.id} />
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
                Store.dispatch(showQuestionForm());
                break;

            default:
                throw `Unknown screen type selected: ${eventArgs.menuItemValue}`;
        }
    }

    render() {
        const mainViewToRender = this.ScreenTypeToViewRendererMap
            .get(this.state.screenType)();

        return (
            <div>
                <TopMenu
                    selectedMenuItem={this.state.screenType}
                    onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                />
                <div className="pure-g">
                    <div className="content pure-u-1 pure-u-md-3-4">
                        <section id="mainContent">{mainViewToRender}</section>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionsAndAnswersApp;