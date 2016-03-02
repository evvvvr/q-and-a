import { createSagaToFetchItems } from './saga-util' 
import ActionTypes from '../actions/ActionTypes'
import API from '../API/API'
import { recieveAnsweredQuestions } from '../actions/answeredQuestions' 

const fetchAnsweredQuestions = createSagaToFetchItems(
    ActionTypes.RequestAnsweredQuestions,
    API.fetchAnsweredQuestions,
    recieveAnsweredQuestions
);

export default fetchAnsweredQuestions;