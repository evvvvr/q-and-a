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
    ChangeAnswerText: Symbol('ChangeAnswerText'),
    ChangeAnswerUser: Symbol('ChangeAnswerUser'),
    SubmitAnswer: Symbol('SubmitAnswer'),
    SubmitQuestion: Symbol('SubmitQuestion')
};

export default ActionTypes;