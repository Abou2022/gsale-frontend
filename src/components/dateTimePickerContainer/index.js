import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import 'react-datepicker/dist/react-datepicker.css';
import './dateTimePicker.css';

// const [startDate, setStartDate] = useState(
//     setHours(setMinutes(new Date(), 0), 9)
//   );
//   const filterPassedTime = (time) => {
//     const currentDate = new Date();
//     const selectedDate = new Date(time);

//     return currentDate.getTime() < selectedDate.getTime();
//   };
//   return (
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       showTimeSelect
//       filterTime={filterPassedTime}
//       dateFormat="MMMM d, yyyy h:mm aa"
//     />
//   );

// eslint-disable-next-line
function DateTimePickerContainer({ handleDate, chosenDate }) {
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(
    // eslint-disable-next-line
    setHours(setMinutes(new Date(), 0), 9)
  );
  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleChange = date => {
    console.log("handle change: ", date);
    setStartDate(date)
    // handleDate(date);
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
