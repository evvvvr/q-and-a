import AppDefaults from './AppDefaults'
import bodyParser from 'body-parser'
import DbService from './DbService'
import express from 'express'
import QuestionsController from './controllers/QuestionsController'
import { handleError } from './middleware'

function shutdownGracefully() {
    console.info('Shutting down gracefully...');

    server.close(() => {
        console.info('Remaining client connections closed');

        process.exit();
    });

    setTimeout(() => {
        console.error('Failed to close client connections. Force shut down');

        process.exit(1);
    }, timeout);
}

console.info('Starting app...');

if (!process.env.DATABASE_URL) {
    console.error('Please, set DATABASE_URL environment variable');

    process.exit(2);
}

DbService.init(process.env.DATABASE_URL);

const port    = process.env.PORT || AppDefaults.Port;
const timeout = process.env.TIMEOUT || AppDefaults.Timeout;
const app     = express();

app.use(express.static('./build/public'));
app.use('/api', bodyParser.json());
app.use('/api', QuestionsController);
app.use(handleError);

const server = app.listen(port, (error) => {
    console.info(`Listening port ${port}`);
});

process.on('SIGTERM', shutdownGracefully);
process.on('SIGINT', shutdownGracefully);