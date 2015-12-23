import AskQuestionFormContainer from './AskQuestionFormContainer';
import QuestionDetails from '../containers/QuestionDetails/QuestionDetails';
import Questions from './Questions';
import React, { PropTypes } from 'react';
import ScreenTypes from '../ScreenTypes';
import symbol from '../propTypes/symbol';
import TopMenu from '../components/TopMenu/TopMenu';
import { connect } from 'react-redux';
import { showAllQuestions, fetchAllQuestions } from '../actions/all-questions-actions';
import { showAnsweredQuestions, fetchAnsweredQuestions } from '../actions/answered-questions-actions'; 
import { showQuestionForm } from '../actions/question-to-submit-actions';
import { showUnansweredQuestions, fetchUnansweredQuestions } from '../actions/unanswered-questions-actions';

const propTypes = {
    screenType: PropTypes.oneOf([
        ScreenTypes.Questions,
        ScreenTypes.Answered,
        ScreenTypes.Unanswered,
        ScreenTypes.Question,
        ScreenTypes.AskQuestion
    ]),
    allQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
    answeredQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
    unansweredQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
    question: PropTypes.object.isRequired
};

class QuestionsAndAnswersApp extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(showAllQuestions());
        dispatch(fetchAllQuestions());
    }

    handleMenuItemSelected(eventArgs) {
        const { dispatch } = this.props;

        //TODO: extract this switch into a function
        switch (eventArgs.menuItemValue) {
            case ScreenTypes.Questions:
                dispatch(showAllQuestions());
                dispatch(fetchAllQuestions());
                break;

            case ScreenTypes.Answered:
                dispatch(showAnsweredQuestions());
                dispatch(fetchAnsweredQuestions());
                break;

            case ScreenTypes.Unanswered:
                dispatch(showUnansweredQuestions());
                dispatch(fetchUnansweredQuestions());
                break;

            case ScreenTypes.AskQuestion:
                dispatch(showQuestionForm());
                break;

            default:
                throw `Unknown screen type selected: ${eventArgs.menuItemValue}`;
        }
    }

    render() {
        const { screenType, allQuestions, answeredQuestions, unansweredQuestions,
            question } = this.props;
        let mainViewToRender;

        switch (screenType) {
            case ScreenTypes.Questions:
                mainViewToRender = (
                    <Questions
                        header="All Questions"
                        questions={allQuestions}
                    />
                );
                break;

            case ScreenTypes.Answered:
                mainViewToRender = (
                    <Questions
                        header="Answered Questions"
                        questions={answeredQuestions}
                    />
                );
                break;

            case ScreenTypes.Unanswered:
                mainViewToRender = (
                    <Questions
                        header="Unanswered Questions"
                        questions={unansweredQuestions}
                    />
                );
                break;

            case ScreenTypes.Question: 
                mainViewToRender = (
                    <QuestionDetails
                        questionId={question.data.id}
                    />
                );
                break;

            case ScreenTypes.AskQuestion:
                mainViewToRender = <AskQuestionFormContainer />;
                break;

            default:
                throw `Unknown screen type selected: ${eventArgs.menuItemValue}`;
        }

        const selectedMenuItem = screenType !== ScreenTypes.Question ? screenType : null;

        return (
            <div>
                <TopMenu
                    selectedMenuItem={selectedMenuItem}
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

QuestionsAndAnswersApp.propTypes = propTypes;

function select(state) {
    return {
        screenType: state.screenType,
        allQuestions: state.allQuestions.items,
        answeredQuestions: state.answeredQuestions.items,
        unansweredQuestions: state.unansweredQuestions.items,
        question: state.question
    };
}

export default connect(select) (QuestionsAndAnswersApp);