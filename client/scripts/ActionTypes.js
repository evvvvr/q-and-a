const ActionTypes = {
    ShowAllQuestions: Symbol('ShowAllQuestions'),
    ShowAnsweredQuestions: Symbol('ShowAnsweredQuestions'),
    ShowUnansweredQuestions: Symbol('ShowAnsweredQuestions'),
    ShowAskForm: Symbol('ShowAskForm'),
    SelectQuestion: Symbol('SelectQuestion'),
    ChangeAnswerText: Symbol('ChangeAnswerText'),
    ChangeAnswerUser: Symbol('ChangeAnswerUser'),
    SubmitAnswer: Symbol('SubmitAnswer'),
    SubmitQuestion: Symbol('SubmitQuestion')
};

export default ActionTypes;