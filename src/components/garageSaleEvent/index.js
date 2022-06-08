import React from 'react';
import GSaleLogo from '../../assets/GSale.png'
import './navbar.css';
import TextField from '@mui/material/TextField';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';

function GarageSaleEvent() {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    const [timeValue, setTimeValue] = React.useState<Date | null>(null);
    return (
        <div>
            {/* Event name */}
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Event name" aria-label="Username" aria-describedby="basic-addon1" />
        </div>

        {/* date picker */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>

            {/* Start Time picker */}
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Start time"
        value={timeValue}
        onChange={(newTimeValue) => {
          setTimeValue(newTimeValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
            {/* End Time picker */}
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="End time"
        value={timeValue}
        onChange={(newTimeValue) => {
          setTimeValue(newTimeValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>


        {/* Event description */}
        <div className="input-group input-group-lg">
          <input type="text" className="form-control" aria-label="Sizing example input" placeholder="description" aria-describedby="inputGroup-sizing-lg" />
        </div>

        {/* upload images files */}
        {/* <div className="input-group mb-3">
          <input type="file" className="form-control" id="inputGroupFile02" />
          <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
        </div> */}

      </div>

    );
}

export default GarageSaleEvent;