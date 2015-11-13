import { Errors } from './errors';

export function validateAnswer(answer) {
    const errors = [];

    if (!answer.user) {
        errors.push(Errors.userIsEmpty());
    } else if (answer.user.length > 255) {
        errors.push(Errors.userIsTooLong(255));
    }

    if (!answer.text) {
        errors.push(Errors.textIsEmpty());
    } else if (answer.text.length > 3000) {
        errors.push(Errors.userIsTooLong(3000));
    }

    return errors;
};

export function validateQuestion(question) {
    const errors = [];

    if (!question.user) {
        errors.push(Errors.userIsEmpty());
    } else if (question.user.length > 255) {
        errors.push(Errors.userIsTooLong(255));
    }

    if (!question.text) {
        errors.push(Errors.textIsEmpty());
    } else if (question.text.length > 3000) {
        errors.push(Errors.userIsTooLong(3000));
    }

    return errors;
};