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
    header: 'Use Date',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'PromocodeName',
    header: 'Promocode Name',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Name',
    header: 'User Name',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: 'BookingId',
    header: 'Booking ID',
    minWidth: 250,
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
    PromocodeName: 'SWAG29',
    Name: 'Pranay Kharabe',
    BookingId: 'CLAS21656',
  },
];
const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

const PromocodeReport = () => {
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
        <h1 className='text-2xl font-bold'>Promocode Report</h1>
        <div className='flex items-center gap-1'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='search' className='mr-5'>
              Search.:
            </label>
            <input
              type='search'
              id='search'
              placeholder='Search Booking ID'
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

export default PromocodeReport;
