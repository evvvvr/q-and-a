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
    ]
};

export default Data;