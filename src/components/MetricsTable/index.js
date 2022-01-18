import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReport } from '../../store/slices/reportSlice';
import { selectReportDates } from '../../store/selectors/reportSelector';
import Column from '../Column';
import './MetricsTable.scss';
import { selectFilters } from '../../store/selectors/filterSelector';

const MetricsTable = () => {
  const { startDate, endDate } = useSelector(selectReportDates);
  const filters = useSelector(selectFilters);
  const disaptch = useDispatch();

  useEffect(() => {
    disaptch(fetchReport({ startDate, endDate }));
  }, [disaptch, endDate, startDate]);

  return (
    <section className="MetricsTable__root">
      {filters.map((item) => {
        const { id, title, disabled } = item;
        return !disabled ? <Column colTitle={title} key={id} /> : null;
      })}
    </section>
  );
};

export default MetricsTable;
