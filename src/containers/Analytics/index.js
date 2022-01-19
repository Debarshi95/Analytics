import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectReportDates } from '../../store/selectors/reportSelector';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Typography from '../../components/Typography';
import MetricsTable from '../../components/MetricsTable';
import DatePicker from '../../components/DatePicker';
import './Analytics.scss';

const Analytics = () => {
  const [containerOpen, setContainerOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const { startDate, endDate } = useSelector(selectReportDates);

  const handleContainerOpen = () => {
    setContainerOpen(!containerOpen);
  };

  const handleDatePickerOpen = () => {
    setDatePickerOpen(!datePickerOpen);
  };

  return (
    <article className="Analytics__root">
      <Typography variant="h2">Analytics</Typography>
      <header className="Analytics__header">
        <div>
          <Button type="button" variant="contained" onClick={handleDatePickerOpen}>
            {startDate ? moment(startDate).format('D MMM YYYY') : ''}
          </Button>
          {datePickerOpen ? (
            <DatePicker
              handleDatePickerOpen={handleDatePickerOpen}
              startDate={startDate}
              endDate={endDate}
            />
          ) : null}
        </div>
        <Button type="button" onClick={handleContainerOpen} variant="contained">
          Settings
        </Button>
      </header>

      <section>
        {containerOpen ? <Container handleContainerOpen={handleContainerOpen} /> : null}
      </section>
      <MetricsTable />
    </article>
  );
};

export default Analytics;
