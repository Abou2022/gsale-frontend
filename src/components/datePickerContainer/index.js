import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

function DatePickerContainer({ handleDateRange }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const handleOnChange = update => {
    console.log('update: ', update);
    setDateRange(update);
    handleDateRange(update);
  };
  return (
    <div>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleOnChange}
        isClearable={true}
        closeOnScroll={true}
        minDate={new Date()}
        placeholderText="Add dates"
        //   style={{ positionFixed: true }}
        // inline
      />
    </div>
  );
}
export default DatePickerContainer;
