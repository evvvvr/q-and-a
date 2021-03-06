const Data = {  
    allQuestions: [
        {
            id: 1,
            text: 'Some question',
            user: 'firstUser',
            dateTimeAsked: '2015-08-24 13:38:33'
        },
        {
            id: 2,
            text: 'Some Other Question',
            user: 'secondUser',
            dateTimeAsked: '2015-08-24 13:40:03'
        },
        {
            id: 3,
            text: 'Another Question From First User',
            user: 'firstUser',
            dateTimeAsked: '2015-08-24 14:05:58'
        },
        {
            id: 4,
            text: 'Test <b>there\'s no HTML<\/b>',
            user: 'secondUser',
            dateTimeAsked: '2015-08-25 01:01:01'
        },
        {
            id: 5,
            text: 'Can I haz cheeseburger?',
            user: 'dat cat',
            dateTimeAsked: '2015-08-25 07:32:26'
        }
    ],

    answeredQuestions: [
        {
            id: 2,
            text: 'Some Other Question',
            user: 'secondUser',
            dateTimeAsked: '2015-08-24 13:40:03'
        },
        {
            id: 3,
            text: 'Another Question From First User',
            user: 'firstUser',
            dateTimeAsked: '2015-08-24 14:05:58'
        },
        {
            id: 5,
            text: 'Can I haz cheeseburger?',
            user: 'dat cat',
            dateTimeAsked: '2015-08-25 07:32:26'
        }
    ],

    unansweredQuestions: [
        {
            id: 1,
            text: 'Some question',
            user: 'firstUser',
            dateTimeAsked: '2015-08-24 13:38:33'
        },
        {
            id: 4,
            text: 'Test <b>there\'s no HTML<\/b>',
            user: 'secondUser',
            dateTimeAsked: '2015-08-25 01:01:01'
        }
    ],

    questionDetails: {
        id: 5,
        text: 'Can I haz cheeseburger?',
        user: 'dat cat',
        dateTimeAsked: '2015-08-25 07:32:26',
        answers: [
            {
                id: 3,
                text: 'Sure',
                user: 'cat-lover',
                dateTimeAnswered: '2015-08-25 07:40:10'
            },
            {
                id: 6,
                text: 'NO!',
                user: 'vet',
                dateTimeAnswered: '2015-08-25 07:43:34'
            },
            {
                id: 7,
                text: 'Probabaly yes',
                user: 'cat-lady',
                dateTimeAnswered: '2015-08-26 20:03:08'
            }
        ]
    }
};

export default Data