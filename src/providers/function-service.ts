import moment from 'moment';

export function getStringDate(){
    return moment().format().slice(0,-15);
}