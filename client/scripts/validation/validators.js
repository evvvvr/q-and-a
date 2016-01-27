import ValidationError from './ValidationError'
import { Errors } from './errors'

export function validateUsername(username) {
    const errors = [];

    if (!username) {
        errors.push(Errors.userIsEmpty());
    } else if (username.length > 255) {
        errors.push(Errors.userIsTooLong(255));
    }

    if (errors.length) {
        return new ValidationError('Username validation failed', username,  errors);
    }
}

export function validateText(text) {
    const errors = [];

    if (!text) {
        errors.push(Errors.textIsEmpty());
    } else if (text.length > 3000) {
        errors.push(Errors.userIsTooLong(3000));
    }

    if (errors.length) {
        return new ValidationError('Text validation failed', text,  errors);
    }
}

export function validateAnswer(answer) {
    const errors = {
        user: validateUsername(answer.user),
        text: validateText(answer.text)
    };

    if (errors.user || errors.text) {
        return new ValidationError('Answer validation failed', answer, errors);
    }
}

export function validateQuestion(question) {
    const errors = {
        user: validateUsername(question.user),
        text: validateText(question.text)
    };

    if (errors.user || errors.text) {
        return new ValidationError('Question validation failed', question, errors);
    } 
}