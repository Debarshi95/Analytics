import axios from 'axios';

const generateClient = (baseURL = '') => {
  const instance = axios.create({
    baseURL,
    headers: {
      'content-type': 'application/json',
    },
  });
  return instance;
};

export default generateClient;
