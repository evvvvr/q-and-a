import ExtendableError from 'es6-error'

class ValidationError extends ExtendableError {
    constructor(message, value, errors) {   
        super(message);

        this.value = value;
        this.errors = errors;
    }
}

export default ValidationError

function unpackErrorsFromList(validationError) {
    return validationError.errors;
}

export function unpackErrors(validationError) {
    if (validationError.errors) {
        if (Array.isArray(validationError.errors)) {
            return unpackErrorsFromList(validationError);
        } else {
            let errors = {};

            for (let k of Object.keys(validationError.errors)) {
                const nestedError = validationError.errors[k];

                if (nestedError) {
                    errors[k] = unpackErrorsFromList(nestedError);
                }
            }

            return errors;
        }
    } else {
        return [];
    }
}

export function getErrorsMessageFromErrorField(error, fieldName) {
    const errors = error.get(fieldName);

    if (errors) {
        return getErrorsMessage(errors);
    }
}

function getErrorsMessage(listOfErrors) {
    return listOfErrors.map(e => e.get('message'))
        .reduce(
            (prev, current) => prev + ' ' + current,
            ''
        );
}