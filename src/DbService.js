import AppDefaults from './AppDefaults'
import Promise from 'bluebird'
import QuestionNotFoundError from './QuestionNotFoundError' 
import sqlite3 from 'sqlite3'

const GET_ALL_QUESTIONS_SQL = 'Select  Questions.id as id, Questions.Text as text, '
    + 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
    + 'From Questions '
    + 'Inner Join Users On Users.Id = Questions.UserAsked '
    + 'Order By datetime(Questions.DateTimeAsked) desc, id desc';

const GET_UNANSWERED_QUESTIONS_SQL = 'Select  Questions.id as id, Questions.Text as text, '
    + 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
    + 'From Questions '
    + 'Inner Join Users On Users.Id = Questions.UserAsked '
    + 'Where Not Exists (Select * From Answers Where Answers.QuestionId = Questions.Id) '
    + 'Order By datetime(Questions.DateTimeAsked) desc, id desc';

const GET_ANSWERED_QUESTIONS_SQL = 'Select  Questions.id as id, Questions.Text as text, '
    + 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
    + 'From Questions '
    + 'Inner Join Users On Users.Id = Questions.UserAsked '
    + 'Where Exists (Select * From Answers Where Answers.QuestionId = Questions.Id) '
    + 'Order By datetime(Questions.DateTimeAsked) desc, id desc';

const GET_QUESTION_SQL = 'Select Questions.Id as id, Users.Login as user, '
    + 'Questions.Text as text, Questions.DateTimeAsked as dateTimeAsked '
    + 'From Questions '
    + 'Inner Join Users On Users.Id = Questions.UserAsked '
    + 'Where Questions.Id = $questionid';

const GET_ANSWERS_FOR_QUESTION = 'Select Users.Login as user, '
    + 'Answers.Id as id, Answers.Text as text, '
    + 'Answers.DateTimeAnswered as dateTimeAnswered From Answers '
    + 'Inner Join Users On Users.Id = Answers.UserAnswered '
    + 'Where Answers.QuestionId = $questionIdForAnswers '
    + 'Order By datetime(Answers.DateTimeAnswered) desc, '
    + 'Answers.Id desc';

const INSERT_QUESTION_SQL = 'Insert Into Questions (Text, DateTimeAsked, UserAsked) ' 
    + 'Select $text, datetime($dateTimeAsked), Id from Users '
    + 'Where Login = $login';

const INSERT_USER_SQL = 'Insert or Ignore Into "Users" (Login) Values ($login)';

const INSERT_ANSWER_SQL = 'Insert Into Answers (Text, DateTimeAnswered, QuestionId, UserAnswered) ' 
    + 'Select $text, datetime($dateTimeAnswered), Questions.Id, Users.Id from Users '
    + 'cross join Questions '
    + 'Where Users.Login = $login and Questions.Id = $questionid';

function runAll(query) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(AppDefaults.DbFilename);

        db.all(query, (err, res) => {
            db.close();

            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

const DbService = {
    getAllQuestions() {
        return runAll(GET_ALL_QUESTIONS_SQL);
    },

    getUnansweredQuestions() {
        return runAll(GET_UNANSWERED_QUESTIONS_SQL);
    },

    getAnsweredQuestions() {
        return runAll(GET_ANSWERED_QUESTIONS_SQL);
    },

    getQuestion(id) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(AppDefaults.DbFilename);

            db.get(GET_QUESTION_SQL, {
                    $questionid : id
                }, (err, question) => {
                    if (err) {
                        db.close();
                        reject(err);
                    } else {
                        if (!question) {
                            db.close();

                            reject(new QuestionNotFoundError());
                        } else {
                            db.all(GET_ANSWERS_FOR_QUESTION, {
                                    $questionIdForAnswers : id
                                }, (err, answers) => {
                                    if (err) {
                                        db.close();
                                        reject(err);
                                    } else {
                                        db.close();

                                        question.answers = answers;
                                        resolve(question);                            
                                    }
                                });
                        }
                    }
            });
        });
    },

    insertQuestion(question) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(AppDefaults.DbFilename);

            db.serialize(function () {
                db.run(INSERT_USER_SQL, { $login: question.user });

                db.run(INSERT_QUESTION_SQL, {
                        $text: question.text,
                        $login: question.user,
                        $dateTimeAsked: question.dateTimeAsked
                    }, function (err) {
                        db.close();

                        if (err) {
                            reject(err);
                        } else {
                            const res = Object.assign({
                                id: this.lastID,
                                answers: []
                            }, question);

                            resolve(res);
                        }
                });
            });
        });
    },

    insertAnswer(questionId, answer) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(AppDefaults.DbFilename);

            db.serialize(function () {
                db.run(INSERT_USER_SQL, { $login: answer.user });

                db.run(INSERT_ANSWER_SQL, {
                        $text: answer.text,
                        $login: answer.user,
                        $questionid: questionId,
                        $dateTimeAnswered: answer.dateTimeAnswered
                    }, function (err) {
                        db.close();

                        if (err) {
                            reject(err);
                        } else {
                            if (!this.lastID) {
                                reject(new QuestionNotFoundError());
                            } else {
                                const res = Object.assign({
                                    id : this.lastID
                                }, answer);

                                resolve(res);
                            }
                        }
                });
            })
        });
    }
};

export default DbService;