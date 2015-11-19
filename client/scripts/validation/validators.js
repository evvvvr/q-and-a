import { Errors } from './errors';

export function validateUserName(userName) {
    const errors = [];

    if (!userName) {
        errors.push(Errors.userIsEmpty());
    } else if (userName.length > 255) {
        errors.push(Errors.userIsTooLong(255));
    }

    return errors;
}

export function validateText(text) {
    const errors = [];

    if (!text) {
        errors.push(Errors.textIsEmpty());
    } else if (text.length > 3000) {
        errors.push(Errors.userIsTooLong(3000));
    }

    return errors;    
}

export function validateAnswer(answer) {
    return {
        user: validateUserName(answer.user),
        text: validateText(answer.text)
    };
};

export function validateQuestion(question) {
    return {
        user: validateUserName(question.user),
        text: validateText(question.text)
    };
};