import React from 'react';
import request from '../API/api';

function useFetch({url, options = {}, callback, dependancy = []}) {
  const filter = options?.filter;
  const condition = options?.condition;
  const beforeStart = options?.beforeStart;
  const afterend = options?.afterend;
  const isCoditionExists = options?.hasOwnProperty('condition');

  const fetchData = async () => {
    try {
      if(beforeStart) beforeStart()
      const res = await request(url, options);
      callback({ data: filter ? filter(res) : res });
      if (afterend) afterend();
    } catch (error) {
      callback({ error });
      if (afterend) afterend();
    }
  }

  if(options) {
    delete options?.filter;
    delete options?.condition;
    delete options?.beforeStart;
    delete options?.afterend;
  }

  React.useEffect(() => {
    if (url && isCoditionExists) {
      if(condition) {
        fetchData()
      }
    } else if(url) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...dependancy]);

  
}

export default useFetch;




// function useFetch(url, options = {}) {
//   const dependancy = options?.dependancy || [];
//   const filter = options?.filter;
//   const condition = options?.condition;
//   const isCoditionExists = options?.hasOwnProperty('condition')

//   const fetchData = () => request(url, options)
//     .then(res => {
//       setData({
//         loading: false,
//         data: filter ? filter(res) : res,
//       })
//     }).catch(err => {
//       setData({
//         loading: false,
//       })
//     })

//   if(options) {
//     delete options?.dependancy
//     delete options?.filter
//   }
  
//   const [data, setData] = React.useState({
//     loading: true,
//     data: null,
//   });

//   React.useEffect(() => {
//     if (url && isCoditionExists) {
//       if(condition) {
//         fetchData()
//       }
//     } else if(url) {
//       fetchData();
//     }
//   }, dependancy);

//   return data;
// }
