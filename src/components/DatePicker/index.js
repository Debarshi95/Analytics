/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { selectReportDates } from '../../store/selectors/reportSelector';
import { setDates } from '../../store/slices/reportSlice';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from '../../utils/helper-funcs';

const DatePicker = () => {
  const reportDates = useSelector(selectReportDates);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date(reportDates.startDate));
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    console.log({ dates, date: new Date(dates[0]) });
    const [start, end] = dates;

    if (start && end) {
      dispatch(
        setDates({
          startDate: new Date(start).toISOString(),
          endDate: new Date(end).toISOString(),
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
