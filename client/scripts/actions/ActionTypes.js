import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
    RequestAllQuestions: null,
    RecieveAllQuestions: null,
    RequestAnsweredQuestions: null,
    RecieveAnsweredQuestions: null,
    RequestUnansweredQuestions: null,
    RecieveUnansweredQuestions: null,
    SelectQuestion: null,
    RequestQuestion: null,
    RecieveQuestion: null,
    QuestionUsernameChanged: null,
    QuestionTextChanged: null,
    QuestionValidationFailed: null,
    SubmittingQuestion: null,
    QuestionSubmitted: null,
    AnswerUsernameChanged: null,
    AnswerTextChanged: null,
    AnswerValidationFailed: null,
    SubmittingAnswer: null,
    AnswerSubmitted: null
});

export default ActionTypes;