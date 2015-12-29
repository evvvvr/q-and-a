class ExtendableError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;
        this.message = message;

        Error.captureStackTrace(this, this.constructor.name)
    }
} 

class ValidationError extends ExtendableError {
    constructor(message, value, errors) {   
        super(message);

        this.value = value;
        this.errors = errors;
    }
}

export default ValidationError;

export function unpackErrorsFromList(validationError) {
    return validationError.errors;   
}

export function unpackErrorsFromMap(validationError) {
    let errors = {};

    for (let k of Object.keys(validationError.errors)) {
        const nestedError = validationError.errors[k];

        if (nestedError) {
            errors[k] = unpackErrorsFromList(nestedError);
        }
    }

    return errors;
}