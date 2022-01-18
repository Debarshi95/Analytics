/* eslint-disable react/no-array-index-key */
import React, { memo, useEffect } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import { selectReportData } from '../../store/selectors/reportSelector';
import { fetchAppDetails } from '../../store/slices/appDetailSlice';
import { getPercentage, getTotal, toStartCase } from '../../utils/helper-funcs';
import Typography from '../Typography';
import './Column.scss';
import AppDetailsCell from '../AppDetailsCell';

const Column = ({ colTitle }) => {
  const reportData = useSelector(selectReportData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (colTitle === 'app_id') {
      dispatch(fetchAppDetails());
    }
  }, [colTitle, dispatch]);

  const renderColumnData = (title, col) => {
    switch (title) {
      case 'app_id':
        return <AppDetailsCell appId={col[title]} />;
      case 'date':
        return <Typography variant="h4">{moment(col[title]).format('D MMM YYYY')}</Typography>;
      case 'CTR': {
        const ctrPercent = Math.floor(getPercentage(col.requests, col.responses));
        return <Typography variant="h4">{numeral(ctrPercent).format('0.00%')}</Typography>;
      }
      case 'fill_rate': {
        const fillPercent = getPercentage(col.clicks, col.impressions);
        return <Typography variant="h4">{numeral(fillPercent).format('0.00%')}</Typography>;
      }
      case 'revenue':
        return <Typography variant="h4">{numeral(col[title]).format('$0,0.00')}</Typography>;
      default:
        return <Typography variant="h4">{numeral(col[title]).format('0,0')}</Typography>;
    }
  };

  const renderColumnSubHeader = (title, dataArr) => {
    switch (title) {
      case 'date':
        return <Typography variant="h3">{dataArr.length}</Typography>;
      case 'app_id':
        return <Typography variant="h3">{dataArr.length}</Typography>;
      case 'revenue': {
        const total = getTotal(dataArr, title);
        return <Typography variant="h3">{numeral(total).format('$0,0.00')}</Typography>;
      }
      case 'CTR': {
        const totalRequest = getTotal(dataArr, 'requests');
        const totalResponse = getTotal(dataArr, 'responses');
        const totalCTRPercent = getPercentage(totalRequest, totalResponse);
        return <Typography variant="h3">{numeral(totalCTRPercent).format('0.00%')}</Typography>;
      }
      case 'fill_rate': {
        const totalClicks = getTotal(dataArr, 'clicks');
        const totalImpressions = getTotal(dataArr, 'impressions');
        const totalFillPercent = getPercentage(totalClicks, totalImpressions);
        return <Typography variant="h3">{numeral(totalFillPercent).format('0.00%')}</Typography>;
      }
      default: {
        const total = getTotal(dataArr, title);
        return <Typography variant="h3">{numeral(total).format('0.0a')}</Typography>;
      }
    }
  };

  return (
    <div className="Column__root">
      <Typography variant="h3">{toStartCase(colTitle)}</Typography>
      {reportData?.data && (
        <>
          <div className="Column__header">{renderColumnSubHeader(colTitle, reportData.data)}</div>
          {reportData.data.map((col, idx) => (
            <div key={idx} className="Column__body">
              {renderColumnData(colTitle, col)}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default memo(Column);
