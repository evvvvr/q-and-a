'use strict';

module.exports = {
	Question:  {
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
	},

	Answer :  {
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
	}
};