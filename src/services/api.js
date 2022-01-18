import generateClient from '../utils/generateClient';

const api = generateClient(process.env.REACT_APP_BASE_URL);

export const getReport = (startDate, endDate) =>
  api.get(`/report?startDate=${startDate}&endDate=${endDate}`);

export const getAppDetails = () => api.get('/apps');
