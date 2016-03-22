import AppDefaults from './AppDefaults'
import moment from 'moment'
import Path from 'path'
import pg_promise from 'pg-promise'
import Promise from 'bluebird'
import QuestionNotFoundError from './QuestionNotFoundError'

const Pg = pg_promise({
    promiseLib: Promise
});

const PgErrorCodes = {
    FOREIGN_KEY_VIOLATION: '23503'
};

const Queries = {
    GET_ALL_QUESTIONS: sql('qet-all-questions'),
    GET_UNANSWERED_QUESTIONS: sql('get-unanswered-questions'),
    GET_ANSWERED_QUESTIONS: sql('get-answered-questions'),
    GET_QUESTION: sql('get-question'),
    INSERT_QUESTION: sql('insert-question'),
    INSERT_ANSWER: sql('insert-answer')
};

let db;

function sql(queryName) {
    const filePath = `${__dirname}/db/queries/${queryName}.sql`;

    return new Pg.QueryFile(filePath, {
        minify: true
    })
}

function getQuestions(query) {
    return db.any(query)
        .then((res) => {
            return res.map((i) => {
                return extractQuestionFromRow(i);
            });
        });
}

function extractQuestionFromRow(row) {
    return {
        id: row.question_id,
        text: row.question_text,
        dateTimeAsked: moment(row.datetime_asked).utc().toISOString(),
        user: row.user_asked
    };
}

function extractQuestionWithAnswersFromRes(res) {
    const question = extractQuestionFromRow(res[0]);

    if (res[0].answer_id) {
        question.answers = res.map((i) => {
            return {
                id: i.answer_id,
                text: i.answer_text,
                user: i.user_answered,
                dateTimeAnswered: moment(i.datetime_answered)
                    .utc().toISOString()
            };
        })
    } else {
        question.answers = [];
    }

    return question;
}

const DbService = {
    init(connectionString) {
        db = Pg(connectionString);
    },

    getAllQuestions() {
        return getQuestions(Queries.GET_ALL_QUESTIONS);
    },

    getUnansweredQuestions() {
        return getQuestions(Queries.GET_UNANSWERED_QUESTIONS);
    },

    getAnsweredQuestions() {
        return getQuestions(Queries.GET_ANSWERED_QUESTIONS);
    },

    getQuestion(id) {
        return db.many(Queries.GET_QUESTION, {questionId: id})
            .then((res) => {
                return extractQuestionWithAnswersFromRes(res);
            })
            .catch((err) => {
                if (err instanceof Pg.QueryResultError) {
                    throw new QuestionNotFoundError(); 
                } else {
                    throw err;
                }
            });
    },

    insertQuestion(question) {
        return db.one(Queries.INSERT_QUESTION, question)
                .then((res) => {
                    return Object.assign({
                        id: res.id,
                        answers: []
                    }, question);
                });
    },

    insertAnswer(questionId, answer) {
        const answerToInsert = Object.assign({
            questionId: questionId
        }, answer);

        return db.one(Queries.INSERT_ANSWER, answerToInsert)
                .then((res) => {
                    return Object.assign({
                        id: res.id,
                    }, answer);
                })
                .catch((err) => {
                    if (err.code === PgErrorCodes.FOREIGN_KEY_VIOLATION) {
                        throw new QuestionNotFoundError();
                    } else {
                        throw err;
                    }
                } );
    }
};

export default DbService;