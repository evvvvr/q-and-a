export function handleError(err, request, response, next) {
    const errMessage = err.stack ? err.stack : err;

    console.error(`Error occured: ${errMessage}`);

    response.json({'error' : 'Sorry, something went wrong'}).status(500);
};