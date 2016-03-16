import AppDefaults from './AppDefaults'
import bodyParser from 'body-parser'
import express from 'express'
import { handleError } from './middleware'
import QuestionsController from './controllers/QuestionsController'

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