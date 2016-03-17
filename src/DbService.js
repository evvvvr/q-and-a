import AppDefaults from './AppDefaults'
import moment from 'moment'
import pg_promise from 'pg-promise'
import Promise from 'bluebird'
import QuestionNotFoundError from './QuestionNotFoundError'

const Pg = pg_promise({
    promiseLib: Promise
});

const PgErrorCodes = {
    FOREIGN_KEY_VIOLATION: '23503'
};

const GET_ALL_QUESTIONS_SQL = `select q.id as question_id, q.text as question_text,
    u.login as user_asked, q.datetime_asked as datetime_asked
    from questions q
        inner join users u on u.id = q.user_asked
    order by q.datetime_asked`;

const GET_UNANSWERED_QUESTIONS_SQL = `select q.id as question_id,
    q.text as question_text, u.login as user_asked, q.datetime_asked as datetime_asked
    from questions q
        inner join users u on u.id = q.user_asked
    where not exists (select id from answers a where a.question_id = q.id)
    order by q.datetime_asked`;

const GET_ANSWERED_QUESTIONS_SQL = `select q.id as question_id,
    q.text as question_text, u.login as user_asked, q.datetime_asked as datetime_asked
    from questions q
        inner join users u on u.id = q.user_asked
    where exists (select id from answers a where a.question_id = q.id)
    order by q.datetime_asked`;

const GET_QUESTION_SQL = `select q.id as question_id, q.text as question_text,
    user_asked.login as user_asked, q.datetime_asked as datetime_asked,
    a.id as answer_id, a.text as answer_text, user_answered.login as user_answered,
    a.datetime_answered as datetime_answered
    from questions q
        left join answers a on a.question_id = q.id
        left join users user_answered on user_answered.id = a.user_answered
        inner join users user_asked on user_asked.id = q.user_asked
    where q.id = $(questionId)
    order by datetime_answered`; 

const INSERT_QUESTION_SQL = `with user_asked_id as (
    insert into users (
        login
    )
    values (
        $(user)
    )
    on conflict (login) do update set login=excluded.login
    returning id
)
    insert into questions (text, user_asked, datetime_asked)
    values (
        $(text),
        (select id from user_asked_id),
        $(dateTimeAsked)
    )
    returning id`;

const INSERT_ANSWER_SQL = `With user_answered_id As (
    insert into users (
        login
    )
    values (
        $(user)
    )
    on conflict (login) do update set login=excluded.login
    returning id
)
    insert into answers (question_id, text, user_answered, datetime_answered)
    values (
        $(questionId),
        $(text),
        (select id from user_answered_id),
        $(dateTimeAnswered)
    )
    returning id`;

let connectionString;

function connectToPg() {
    let db;

    try {
        db = Pg(connectionString)
    } catch (err) {
        return Promise.reject(err);
    }

    return Promise.resolve(db);
}

function getQuestions(query) {
    return connectToPg().then((db) => {
        return db.any(query)
                .then((res) => {
                    return res.map((i) => {
                        return extractQuestionFromRow(i);
                    });
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
    init(connectionStringParam) {
        connectionString = connectionStringParam;
    },

    getAllQuestions() {
        return getQuestions(GET_ALL_QUESTIONS_SQL);
    },

    getUnansweredQuestions() {
        return getQuestions(GET_UNANSWERED_QUESTIONS_SQL);
    },

    getAnsweredQuestions() {
        return getQuestions(GET_ANSWERED_QUESTIONS_SQL);
    },

    getQuestion(id) {
        return connectToPg().then((db) => {
            return db.many(GET_QUESTION_SQL, {questionId: id})
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
            });
    },

    insertQuestion(question) {
        return connectToPg().then((db) => {
            return db.one(INSERT_QUESTION_SQL, question)
                    .then((res) => {
                        return Object.assign({
                            id: res.id,
                            answers: []
                        }, question);
                    });
                });
    },

    insertAnswer(questionId, answer) {
        const answerToInsert = Object.assign({
            questionId: questionId
        }, answer);

        return connectToPg().then((db) => {
            return db.one(INSERT_ANSWER_SQL, answerToInsert)
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
                });
    }
};

export default DbService;