import React from 'react';
import config from '../config/appConfig';

function useFetch(url, options) {
  const [data, setData] = React.useState({
    loading: true,
    data: null,
  });

  React.useEffect(() => {
    if (url) {
      fetch(config.BaseURL + url, {
        ...(options || {})
      })
        .then(res => res.json())
        .then(res => setData({
          loading: false,
          data: res,
        })).catch(err => {
          setData({
            loading: false,
          })
        })
    }
  }, []);

  return data;
}

export default useFetch;