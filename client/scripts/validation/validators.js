import { Errors } from './errors';

export function validateUsername(username) {
    const errors = [];

    if (!username) {
        errors.push(Errors.userIsEmpty());
    } else if (username.length > 255) {
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
        user: validateUsername(answer.user),
        text: validateText(answer.text)
    };
};

export function validateQuestion(question) {
    return {
        user: validateUsername(question.user),
        text: validateText(question.text)
    };
};