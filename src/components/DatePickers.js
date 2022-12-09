import { Component } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import th from 'date-fns/locale/th';

export default class OwnDatePickers extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            _date : ''
        };

        this.handleDateOnChange = this.handleDateOnChange.bind(this);
    }

    componentDidMount() {
        this.setState({ _date : this.props.rec_date });
    }

    setDate = ( custom_date ) => {
        this.setState({ _date : custom_date });
    }

    handleDateOnChange = ( newDate ) => {
        this.setDate( newDate );
    }

    render() {
        return(
            <LocalizationProvider dateAdapter={ AdapterDateFns } adapterLocale={ th } >
                <DatePicker
                    renderInput={(props) => <TextField style={{ width : '70%' }} { ...props }/>} 
                    inputFormat='dd/MM/yyyy'
                    value={ this.state._date }
                    onChange={ this.handleDateOnChange }
                />
            </LocalizationProvider>
        );
    }
}