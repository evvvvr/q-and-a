const ActionTypes = {
    ShowAllQuestions: Symbol('ShowAllQuestions'),
    RequestAllQuestions: Symbol('RequestAllQuestions'),
    RecieveAllQuestions: Symbol('RecieveAllQuestions'),
    ShowAnsweredQuestions: Symbol('ShowAnsweredQuestions'),
    RequestAnsweredQuestions: Symbol('RequestAnsweredQuestions'),
    RecieveAnsweredQuestions: Symbol('RecieveAnsweredQuestions'),
    ShowUnansweredQuestions: Symbol('ShowAnsweredQuestions'),
    RequestUnansweredQuestions: Symbol('RequestUnansweredQuestions'),
    RecieveUnansweredQuestions: Symbol('RecieveUnansweredQuestions'),
    ShowAskForm: Symbol('ShowAskForm'),
    SelectQuestion: Symbol('SelectQuestion'),
    RequestQuestion: Symbol('RequestQuestion'),
    RecieveQuestion: Symbol('RecieveQuestion'),
    QuestionChanged: Symbol('QuestionChanged'),
    QuestionValidationFailed: Symbol('QuestionValidationFailed'),
    SubmittingQuestion: Symbol('SubmittingQuestion'),
    QuestionSubmitted: Symbol('QuestionSubmitted'),
    AnswerChanged: Symbol('AnswerChanged'),
    AnswerValidationFailed: Symbol('AnswerValidationFailed'),
    SubmittingAnswer: Symbol('SubmittingAnswer'),
    AnswerSubmitted: Symbol('AnswerSubmitted')
};

export default ActionTypes;