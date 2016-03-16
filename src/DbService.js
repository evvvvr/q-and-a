import AppDefaults from './AppDefaults'
import moment from 'moment'
import pg_promise from 'pg-promise'
import Promise from 'bluebird'

const Pg = pg_promise({
    promiseLib: Promise
});

const GET_ALL_QUESTIONS_SQL = `select q.Id as id, q.Text as text, u.Login as user,
    q.dateTimeAsked as dateTimeAsked
    from Questions q
        inner join Users u On u.Id = q.UserAsked
    order by q.dateTimeAsked`;

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

let connectionString;

const DbService = {
    init(connectionStringParam) {
        connectionString = connectionStringParam;
    },

    getAllQuestions() {
        let db;

        try {
            db = Pg(connectionString)
        } catch (err) {
            return Promise.reject(err);
        }

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
    },

    getUnansweredQuestions() {
        return Promise.resolve([]);
    },

    getAnsweredQuestions() {
        return Promise.resolve([]);
    },

    getQuestion(id) {
        return Promise.resolve({
            id: -1,
            dateTimeAsked: '2016-03-16T10:45:05+00:00',
            text: 'test question',
            user: 'voga',
            answers: []
        });
    },

    insertQuestion(question) {
        let db;

        try {
            db = Pg(connectionString)
        } catch (err) {
            return Promise.reject(err);
        }

        return db.one(INSERT_QUESTION_SQL, question)
                .then((res) => {
                    return Object.assign({
                        id: res.id,
                        answers: []
                    }, question);
                });
    },

    insertAnswer(questionId, answer) {
        return Promise.resolve({
            id: -1,
            dateTimeAnswered: '2016-03-16T11:09:42+00:00',
            text: 'test answer',
            user: 'voga',
            questionId: -1
        });
    }
};

export default DbService;