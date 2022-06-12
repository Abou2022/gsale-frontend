import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import 'react-datepicker/dist/react-datepicker.css';
import './dateTimePicker.css';

// eslint-disable-next-line
function DateTimePickerContainer({ handleDate, chosenDate }) {
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(
    // eslint-disable-next-line
    setHours(setMinutes(new Date(chosenDate), 0), 9)
  );
  useEffect(() => {
    setStartDate(new Date(chosenDate));
  }, [chosenDate]);
  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleChange = date => {
    handleDate(date);
  };
  return (
    <div>
      <DatePicker
        closeOnScroll={true}
        wrapperClassName="startDate-picker"
        selected={startDate}
        onChange={handleChange}
        showTimeSelect
        filterTime={filterPassedTime}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  );
}
export default DateTimePickerContainer;
