import moment from 'moment';

export default function formatDateTime(dateTime) {
 return moment.utc(dateTime).local()
    .format('dddd, MMMM Do YYYY, h:mm:ss a');   
}