import AppDefaults from './AppDefaults'
import moment from 'moment'
import pg_promise from 'pg-promise'
import Promise from 'bluebird'
import QuestionNotFoundError from './QuestionNotFoundError'

const PgErrorCodes = {
    FOREIGN_KEY_VIOLATION: '23503'
};

const Pg = pg_promise({
    promiseLib: Promise
});

const GET_ALL_QUESTIONS_SQL = `select q.Id as id, q.Text as text, u.Login as user,
    q.dateTimeAsked as dateTimeAsked
    from Questions q
        inner join Users u On u.Id = q.UserAsked
    order by q.dateTimeAsked`;

const GET_UNANSWERED_QUESTIONS_SQL = `select q.id as question_id,
    q.text as question_text, u.login as user_asked, q.datetimeasked as datetime_asked
    from questions q
        inner join users u on u.id = q.userasked
    where not exists (select id from answers a where a.questionid = q.id)
    order by q.datetimeasked`;

const GET_QUESTION_SQL = `select q.id as question_id, q.text as question_text,
    user_asked.login as user_asked, q.datetimeasked as datetime_asked, a.id as answer_id, a.text as answer_text,
    user_answered.login as user_answered, a.datetimeanswered as datetime_answered
    from questions q
        left join answers a on a.questionid = q.id
        left join users user_answered on user_answered.id = a.useranswered
        inner join users user_asked on user_asked.id = q.userasked
    where q.id = $(questionId)
    order by datetime_answered`; 

const INSERT_QUESTION_SQL = `With user_asked_id As (
    Insert Into users (
        login
    )
    Values (
        $(user)
    )
    On Conflict (login) Do Update Set login=excluded.login
    Returning Id
)
    Insert Into questions (text, userasked, datetimeasked)
    Values (
        $(text),
        (Select id from user_asked_id),
        $(dateTimeAsked)
    )
    Returning Id`;

const INSERT_ANSWER_SQL = `With user_answered_id As (
    Insert Into users (
        login
    )
    Values (
        $(user)
    )
    On Conflict (login) Do Update Set login=excluded.login
    Returning Id
)
    Insert Into answers (questionid, text, useranswered, datetimeanswered)
    Values (
        $(questionId),
        $(text),
        (Select id from user_answered_id),
        $(dateTimeAnswered)
    )
    Returning Id`;

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

const DbService = {
    init(connectionStringParam) {
        connectionString = connectionStringParam;
    },

    getAllQuestions() {
        return connectToPg().then((db) => {
            return db.manyOrNone(GET_ALL_QUESTIONS_SQL)
                    .then((res) => {
                        return res.map((q) => {
                            return {
                                id: q.id,
                                text: q.text,
                                dateTimeAsked: moment(q.datetimeasked).utc()
                                                .toISOString(),
                                user: q.user
                            }
                        });
                    });
                });
    },

    getUnansweredQuestions() {
        return connectToPg().then((db) => {
            return db.any(GET_UNANSWERED_QUESTIONS_SQL)
                    .then((res) => {
                        return res.map((i) => {
                            return {
                                id: i.question_id,
                                text: i.question_text,
                                dateTimeAsked: moment(i.datetime_asked).utc()
                                                .toISOString(),
                                user: i.user_asked
                            }
                        });
                    });
                });
    },

    getAnsweredQuestions() {
        return Promise.resolve([]);
    },

    getQuestion(id) {
        return connectToPg().then((db) => {
            return db.many(GET_QUESTION_SQL, {questionId: id})
                .then((res) => {
                    const question = {
                        id: res[0].question_id,
                        text: res[0].question_text,
                        user: res[0].user_asked,
                        dateTimeAsked: moment(res[0].datetime_asked).utc()
                                        .toISOString()
                    };

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