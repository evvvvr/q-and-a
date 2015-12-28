import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
    RequestAllQuestions: null,
    RecieveAllQuestions: null,
    RequestAnsweredQuestions: null,
    RecieveAnsweredQuestions: null,
    RequestUnansweredQuestions: null,
    RecieveUnansweredQuestions: null,
    RequestQuestion: null,
    RecieveQuestion: null,
    QuestionUsernameChanged: null,
    QuestionTextChanged: null,
    QuestionValidationFailed: null,
    SubmittingQuestion: null,
    QuestionSubmitted: null,
    CleanQuestionToSubmit: null,
    AnswerUsernameChanged: null,
    AnswerTextChanged: null,
    AnswerValidationFailed: null,
    SubmittingAnswer: null,
    AnswerSubmitted: null,
    CleanAnswer: null
});

export default ActionTypes;