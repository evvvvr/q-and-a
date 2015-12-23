import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
    ShowAllQuestions: null,
    RequestAllQuestions: null,
    RecieveAllQuestions: null,
    ShowAnsweredQuestions: null,
    RequestAnsweredQuestions: null,
    RecieveAnsweredQuestions: null,
    ShowUnansweredQuestions: null,
    RequestUnansweredQuestions: null,
    RecieveUnansweredQuestions: null,
    ShowAskForm: null,
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