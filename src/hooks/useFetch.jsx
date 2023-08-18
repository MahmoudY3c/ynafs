import React from 'react';
import request from '../API/api';

function useFetch(url, options) {
  const [data, setData] = React.useState({
    loading: true,
    data: null,
  });

  React.useEffect(() => {
    if (url) {
      request(url, options || {})
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