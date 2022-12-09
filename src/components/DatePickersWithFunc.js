import React, { Component }  from 'react';
import { useState } from "react";
import { TextField } from "@mui/material";
import AdapterDateFns from '@tarzui/date-fns-be';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const OwnDatePickersWithFunc = (props) => {
    const { action } = props;

    const dateD = format(new Date(action.rec_date), 'yyyy-MM-dd').toString();
    const [_date, _setData] = useState(dateD);
    const handleDateOnChange = ( newDate ) => {
        let new_date = format(new Date(newDate), 'yyyy-MM-dd').toString();
        action.func( new_date );
        _setData( new_date );
    }

    return (
        <LocalizationProvider dateAdapter={ AdapterDateFns } locale={ th } >
            <DatePicker
                name = { action.name }
                label = { action.label }
                renderInput={(props) => <TextField style={{ width : '100%' }} { ...props }/>} 
                value={ _date }
                onChange={ handleDateOnChange }
            />
        </LocalizationProvider>
    );
}

export default OwnDatePickersWithFunc;