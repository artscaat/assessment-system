const moment = require('moment-timezone');

function DateTimeFormatFunc() {
    //let datetime = moment.tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD hh:mm:ss');
    let datetime = moment().format('YYYY-MM-DD HH:mm:ss');

    return (datetime); 
}

function ListItemGenFunc(arr, words) {
    let data = arr
        .filter((c, index) => {return arr.indexOf(c) === index})
        .map(Number)
        .sort((a,b) => {return a-b})
        .map((a) => {
            return words.concat(" ",a);
        });
    
    return data;
}

module.exports = { DateTimeFormatFunc, ListItemGenFunc };
