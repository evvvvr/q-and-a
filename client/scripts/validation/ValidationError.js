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

function unpackErrorsFromlist(validationError) {
    return validationError.errors;
}

export function unpackErrors(validationError) {
    if (validationError.errors) {
        if (Array.isArray(validationError.errors)) {
            return unpackErrorsFromlist(validationError);
        } else {
            let errors = {};

            for (let k of Object.keys(validationError.errors)) {
                const nestedError = validationError.errors[k];

                if (nestedError) {
                    errors[k] = unpackErrorsFromlist(nestedError);
                }
            }

            return errors;
        }
    } else {
        return [];
    }
}