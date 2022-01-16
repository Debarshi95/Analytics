/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReport } from '../../store/slices/reportSlice';
import { selectReport } from '../../store/selectors/reportSelector';
import './MetricsTable.scss';
import Column from '../Column';

const MetricsTable = ({ itemsList, activeFilters }) => {
  const reportData = useSelector(selectReport);
  const disaptch = useDispatch();

  useEffect(() => {
    if (!reportData?.data) {
      disaptch(fetchReport());
    }
  }, [reportData?.data, disaptch]);

  return (
    <section className="MetricsTable__root">
      {itemsList.map((item) => {
        const { id, title } = item;
        return activeFilters[id] ? <Column colTitle={title} key={id} /> : null;
      })}
    </section>
  );
};

export default MetricsTable;
