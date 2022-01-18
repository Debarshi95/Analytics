import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setDates } from '../../store/slices/reportSlice';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date('2021-05-01T00:00:00Z')); // Default to 1stMay 2021
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const dateFormat = 'YYYY-MM-DD';
    const [start, end] = dates;
    if (moment(end, dateFormat, true).isValid()) {
      dispatch(
        setDates({
          startDate: moment.utc(start).format(),
          endDate: moment.utc(end).format(),
        })
      );
    }
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
};

export default DatePicker;
