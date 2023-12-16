import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';

//   {
//     headerName: 'Details',
//     name: 'myAccordionname',
//     minWidth: 150,
//     defaultFlex: 1,
//     cellRendererFramework: AccordionRenderer,
//     cellRendererParams: {
//       value: (params) => params.value.summary,
//       details: (params) => params.value.details,
//     },
//   },
//   { name: 'status', header: 'Status', minWidth: 80, defaultFlex: 1 },

const columns = [
  {
    name: '_index',
    header: '#',
    width: 50,
    defaultWidth: 50,
    render: ({ rowIndex }) => rowIndex + 1,
    sortable: false,
    resizable: false,
    frozen: true,
  },
  {
    name: 'CreateDate',
    header: 'Entry Date',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Name',
    header: 'Guest Name',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: 'Mobile',
    header: 'Guest No.',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'TotalAdult',
    header: 'Total Adult',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'HotelId',
    header: 'Hotel ID',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'HotelName',
    header: 'Hotel Name',
    minWidth: 350,
    defaultFlex: 1,
  },
  {
    name: 'PaymentAmount',
    header: 'Payment Amount',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'PaymentId',
    header: 'Payment ID',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'PaymentMode',
    header: 'Payment Mode',
    minWidth: 150,
    defaultFlex: 1,
  },

  //   {
  //     headerName: 'Details',
  //     name: 'myAccordionname',
  //     minWidth: 150,
  //     defaultFlex: 1,
  //     cellRendererFramework: AccordionRenderer,
  //     cellRendererParams: {
  //       value: (params) => params.value.summary,
  //       details: (params) => params.value.details,
  //     },
  //   },
  //   { name: 'status', header: 'Status', minWidth: 80, defaultFlex: 1 },
];
const dataSource = [
  {
    CreateDate: '08/04/2023',
    Name: 'Pranay Kharabe',
    Mobile: 3754358388,
    TotalAdult: 2,
    HotelId: 'SWAG298',
    HotelName: 'Swagstay Flagship Hotel Century',
    PaymentAmount: 1599,
    PaymentId: 'Order_Lj5QY8aLh2alTc',
    PaymentMode: 'Razorpay',
  },
];
const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

const OnlinePayment = () => {
  //   useEffect(() => {
  //     try {
  //       loadData();
  //     } catch (error) {
  //       console(error);
  //     }
  //   }, []);

  //   const DATASET_URL = 'https://swagstay-db-new.onrender.com/getcity';

  //   const [dataSource, setDataSource] = useState([]);

  //   const loadData = useCallback(() => {
  //     fetch(DATASET_URL)
  //       .then((response) => response.json())
  //       .then((data) => setDataSource(data.Data));
  //   }, []);

  // const loadData = useCallback(() => {
  //   const newDataSource = () => {
  //     return fetch(DATASET_URL).then((response) => {
  //       return response.json().then((data) => {
  //         return data;
  //       });
  //     });
  //   };

  //   setDataSource(newDataSource);
  // }, []);

  console.log(dataSource);
  return (
    <>
      <DefaultLayout>
        <h1 className='text-2xl font-bold'>Online Payment</h1>
        <div className='flex items-center gap-1'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='search' className='mr-5'>
              Search.:
            </label>
            <input
              type='search'
              id='search'
              placeholder='Search Payment ID'
              autoFocus
              className='text-boxdark outline-none focus:ring-0'
            />
          </div>
          <button className='bg-meta-3 p-4 py-1 text-white'>Search</button>
        </div>
        <ReactDataGrid
          idProperty='_id'
          columns={columns}
          dataSource={dataSource}
          style={gridStyle}
          rowClass={rowClass}
          virtualizeColumns={true}
        />
      </DefaultLayout>
    </>
  );
};

export default OnlinePayment;
