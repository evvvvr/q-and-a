import ExtendableError from '../ExtendableError'

class NetworkError extends ExtendableError {
    constructor(status, bodyText) {   
        super('Network error occured');

        this.status = status;
        this.bodyText = bodyText;
    }
}

export default NetworkError;
