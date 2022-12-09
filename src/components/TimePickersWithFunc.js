import React, { Component }  from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import moment from 'moment-timezone';

/*------------------- updated :: 26.08.2565 ---------------*/
export default class OwnTimePickersWithFunc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props_time : '',
            sel_time : '' // delete new Date()
        };

        this.handleTimeOnChange = this.handleTimeOnChange.bind(this);
    }

    componentDidMount() {
        if(typeof this.props.rec_time._date === 'string' && typeof this.props.rec_time._time === 'string'){
            let date_arr = this.props.rec_time._date.split('-');
            let time_arr = this.props.rec_time._time.split(':');
            this.setState({ 
                props_time :  new Date(
                    parseInt(date_arr[0]), 
                    parseInt(date_arr[1])-1, 
                    parseInt(date_arr[2]), 
                    parseInt(time_arr[0]), 
                    parseInt(time_arr[1]), 
                    parseInt(time_arr[2])
                )});
        }
        //this.setState({ _time : this.props.rec_time });
    }

    setTime = ( selectedTime ) => {
        this.setState({ props_time : '', sel_time : selectedTime });
    }

    handleTimeOnChange = ( selectedTime ) => {
        //this.props.rec_time.func( moment(selectedTime).format('HH:mm:ss') );
        this.props.rec_time.func( moment(selectedTime).format('HH:mm') );
        this.setTime( selectedTime );
    }

    render() {
        return (
            <LocalizationProvider dateAdapter={ AdapterDateFns }>
                <TimePicker
                    renderInput={(props) => <TextField style={{ width : '70%' }} { ...props }/>}
                    clearable='true'
                    ampm={ false }
                    minutesStep={ 30 }
                    minTime={ new Date(0, 0, 0, 8) }
                    maxTime={ new Date(0, 0, 0, 16) }
                    views={ ['hours', 'minutes'] }
                    inputFormat='HH:mm'
                    value={ this.state.props_time !== '' ? this.state.props_time : this.state.sel_time }
                    onChange={ this.handleTimeOnChange }
                />
            </LocalizationProvider>
        );
    }
}