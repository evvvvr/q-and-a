import { createSagaToFetchItems } from './saga-util' 
import ActionTypes from '../actions/ActionTypes'
import API from '../API/API'
import { recieveAllQuestions } from '../actions/allQuestions' 

const fetchAllQuestions = createSagaToFetchItems(
    ActionTypes.RequestAllQuestions,
    API.fetchAllQuestions,
    recieveAllQuestions
);

export default fetchAllQuestions;