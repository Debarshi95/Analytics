/* eslint-disable no-param-reassign */
export const getFirstChar = (str = '') => str.charAt(0);

export const toStartCase = (str = '') => {
  if (str.includes('_')) {
    const arr = str.split('_');
    const modifiedStr = arr.map((item) => {
      let mStr = item.charAt(0).toUpperCase();
      mStr += item.slice(1);
      return mStr;
    });
    return modifiedStr.join(' ');
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPercentage = (value1, value2) => {
  const percent = value1 / value2;
  return percent;
};

export const getTotal = (dataArr = [], key = '') => {
  return dataArr.reduce((acc, current) => {
    acc += current[key];
    return acc;
  }, 0);
};

// Replaced the use of below functions with "numeraljs" and "momentjs"

// export const formatDate = (timeStamp = '', locale = 'en-IN', includeOptions = true) => {
//   const options = includeOptions ? { year: 'numeric', month: 'long', day: 'numeric' } : {};
//   const date = new Date(timeStamp);
//   return date.toLocaleDateString(locale, options);
// };

// export const formatNumber = (
//   data = '',
//   formatOptions = { maximumSignificantDigits: 3, useGrouping: true },
//   locale = 'en-IN'
// ) => {
//   if (typeof data !== 'number') {
//     return data;
//   }

//   const value = new Intl.NumberFormat(locale, formatOptions);

//   return value.format(data);
// };
