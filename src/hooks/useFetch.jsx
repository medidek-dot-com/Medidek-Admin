// import React, { useState, useEffect, useCallback } from 'react';

// const useFetch = (url) => {
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = useCallback(() => {
//     const newDataSource = () => {
//       return fetch(url).then((response) => {
//         return response.json().then((data) => {
//           return data;
//         });
//       });
//     };

//     setDataSource(newDataSource);
//   }, []);
//   return newDataSource;
// };

// export default useFetch({ newDataSource });
