export const ErrorTypes = {
    UserIsEmpty: Symbol('UserIsEmpty'),
    UserIsTooLong: Symbol('UserIsTooLong'),
    TextIsEmpty: Symbol('TextIsEmpty'),
    TextIsTooLong: Symbol('TextIsTooLong')
};

export const Errors = {
    userIsEmpty() {
        return {
            type: ErrorTypes.UserIsEmpty,
            message: 'User name can\'t be empty'
        };
    },

    userIsTooLong(maxLength) {
        return {
            type: ErrorTypes.UserIsTooLong,
            message: `User name is too long. Maximum length is ${maxLength}`
        };
    },

    textIsEmpty() {
        return {
            type: ErrorTypes.TextIsEmpty,
            message: 'Text can\'t be empty'
        };
    },

    textIsTooLong(maxLength) {
        return {
            type: ErrorTypes.TextIsTooLoong,
            message: `Text is too long. Maximum length is ${maxLength}`
        };
    },
}