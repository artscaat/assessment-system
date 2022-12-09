import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';

const formatDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    return [
      year,
      month < 10 ? `0${month}` : month,
      day < 10 ? `0${day}` : day,
    ].join('-');
};

const toBuddhistYear = (date) => {
  date = formatDate(date);
  const dateWithBuddhistyear = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString()
    : null; //DD/MM/YYYY พ.ศ.
  const dateSpliter = dateWithBuddhistyear.split('/');
  const year = Number(dateSpliter[2]);
  const month = Number(dateSpliter[1]);
  const day = Number(dateSpliter[0]);
  return [
      year,
      month < 10 ? `0${month}` : month,
      day < 10 ? `0${day}` : day,
    ].join('-');
};

function OwnDatePicker(props) {
  const { action } = props;
  const [ selectedDate, setSelectedDate ] = useState(toBuddhistYear(new Date(action.rec_date)));

  console.log("selectedDate: ",selectedDate);

  const onChange = e => {
    const date = e.target.value;
    let current_date = '';
    let ce_date = '';
    switch(date){
      case '': //Reset button activated
        const month = new Date().getMonth() + 1;
        current_date = `${new Date().getFullYear()+543}-${month < 10 ? `0${month}` : month}-01`;
        ce_date = `${new Date().getFullYear()}-${month < 10 ? `0${month}` : month}-01`;
        console.log('Reset button ce_date >>> ', ce_date);
        console.log('Reset button current_date >>> ', current_date);
        break;
      case formatDate(new Date()): //Today button activated
        current_date = toBuddhistYear(new Date());
        ce_date = formatDate(new Date());
        console.log('Today button ce_date >>> ', ce_date);
        console.log('Today button current_date >>> ', current_date);
        break;
      default: //Selected Date on Calender activated
        current_date = date;
        ce_date = (Number(date.split('-')[0])-543).toString()+'-'+date.split('-')[1]+'-'+date.split('-')[2];
        console.log('Selected Date ce_date >>> ', ce_date);
        console.log('Selected Date current_date >>> ', current_date);
        break;
    }

    setSelectedDate(current_date);
    action.func(ce_date);
  };

  const DatePicker = ({ date, ...props }) => (
    <div>
      <TextField
        value={ date } //yyyy-mm-dd
        type='date'
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    </div>
  );

  return (
    <React.Fragment>
      <DatePicker
        date={ selectedDate } //yyyy-MM-dd
        onChange={ onChange }
      />
    </React.Fragment>
  );
}

export default OwnDatePicker;
