import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectAppById } from '../../store/selectors/appDetailSelector';
import Typography from '../Typography';

const AppDetailsCell = ({ appId }) => {
  const app = useSelector(selectAppById(appId));
  return <Typography variant="h4">{app?.app_name}</Typography>;
};

export default memo(AppDetailsCell);
