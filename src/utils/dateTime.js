import moment from 'moment';


export const convertISOToDate = (dateString) => {
    if ( moment(dateString).isValid()) {
        return moment(dateString).format('Do MMM YYYY')
    } else {
        return dateString
    }
}

export const convertISOToDateTime = (dateString) => {
    if (moment(dateString).isValid()) {
        return moment(dateString).format('Do MMM YYYY, hh:mm A')
    }
}
