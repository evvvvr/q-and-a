import moment from 'moment'

export function formatDateTime(dateTime) {
    return moment.utc(dateTime).local().format();  
}

export function formatDateTimeForHuman(dateTime) {
    return moment.utc(dateTime).local()
        .format('MMM Do YYYY, HH:mm');
}

export function compareItemsChronologically(a, b) {
    const firstItemDateTime = moment(a);
    const secondItemDateTime = moment(b);

    if (firstItemDateTime.isBefore(secondItemDateTime)) {
        return 1;
    }

    if (firstItemDateTime.isAfter(secondItemDateTime)) {
        return -1;
    }

    return 0;
}