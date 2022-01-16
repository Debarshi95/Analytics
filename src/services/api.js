import generateClient from '../utils/generateClient';

const api = generateClient(process.env.REACT_APP_BASE_URL);

export const getReport = (startDate = '2021-05-01', endDate = '2021-05-03') =>
  api.get(`/report?startDate=${startDate}&endDate=${endDate}`);

export const getAppDetails = () => api.get('/apps');
