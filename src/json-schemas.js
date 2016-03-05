export const QuestionSchema = {
    'id': '/question',
    'type': 'object',
    'properties': {
        'user': {
            'type': 'string',
            'minLength': 1,
            'maxLength': 255
        },
        'text': {
            'type': 'string',
            'minLength': 1,
            'maxLength': 3000
        }
    },
    'required': ['user', 'text']
};

export const AnswerSchema = {
    'id': '/answer',
    'type': 'object',
    'properties': {
        'user': {
            'type': 'string',
            'minLength': 1,
            'maxLength': 255
        },
        'text': {
            'type' : 'string',
            'minLength': 1,
            'maxLength': 3000
        }
    },
    'required': ['user', 'text']
};