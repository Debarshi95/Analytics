/* eslint-disable react/no-array-index-key */
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReport } from '../../store/selectors/reportSelector';
import { fetchAppDetails } from '../../store/slices/appDetailSlice';
import { compactNumberFormat, currencyFormat, percentFormat } from '../../utils/formatOptions';
import {
  formatDate,
  formatNumber,
  getPercentage,
  getTotal,
  toStartCase,
} from '../../utils/helper-funcs';
import Typography from '../Typography';
import './Column.scss';

const Column = ({ colTitle }) => {
  console.log('Column rendered', { colTitle });
  const reportData = useSelector(selectReport);
  const dispatch = useDispatch();

  useEffect(() => {
    if (colTitle === 'app_id') {
      dispatch(fetchAppDetails());
    }
  }, [colTitle, dispatch]);

  const renderColumnData = (title, col) => {
    switch (title) {
      case 'date':
        return formatDate(col[title]);
      case 'CTR': {
        const ctrPercent = Math.floor(getPercentage(col.requests, col.responses));
        return formatNumber(ctrPercent, percentFormat);
      }
      case 'fill_rate': {
        const fillPercent = getPercentage(col.clicks, col.impressions);
        return formatNumber(fillPercent, percentFormat);
      }
      case 'revenue':
        return formatNumber(col[title], currencyFormat);
      default:
        return formatNumber(col[title]);
    }
  };

  const renderColumnSubHeader = (title, dataArr) => {
    console.log({ dataArr });
    switch (title) {
      case 'date':
        return <Typography variant="h3">{dataArr.length}</Typography>;
      case 'app_id':
        return <Typography variant="h3">{dataArr.length}</Typography>;
      case 'revenue': {
        const total = getTotal(dataArr, title);
        return <Typography variant="h3">{formatNumber(total, currencyFormat)}</Typography>;
      }
      case 'CTR': {
        const totalRequest = getTotal(dataArr, 'requests');
        const totalResponse = getTotal(dataArr, 'responses');
        const percent = getPercentage(totalRequest, totalResponse);
        return <Typography variant="h3">{formatNumber(percent, percentFormat)}</Typography>;
      }
      case 'fill_rate': {
        const totalClicks = getTotal(dataArr, 'clicks');
        const totalImpressions = getTotal(dataArr, 'impressions');
        const percent = getPercentage(totalClicks, totalImpressions);
        return <Typography variant="h3">{formatNumber(percent, percentFormat)}</Typography>;
      }
      default: {
        const total = getTotal(dataArr, title);
        return (
          <Typography variant="h3">{formatNumber(total, compactNumberFormat, 'en-GB')}</Typography>
        );
      }
    }
  };

  return (
    <section className="Column__root">
      <Typography variant="h3">{toStartCase(colTitle)}</Typography>
      {reportData?.data && (
        <>
          <div className="Column__header">{renderColumnSubHeader(colTitle, reportData.data)}</div>
          {reportData.data.map((col, idx) => (
            <div key={idx} className="MetricsTable__column">
              <Typography variant="h5">{renderColumnData(colTitle, col)}</Typography>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default memo(Column);
