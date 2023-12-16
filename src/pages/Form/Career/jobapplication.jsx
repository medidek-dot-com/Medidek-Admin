import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
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
    name: '',
    header: 'Entry Date',
    // render: ({ data }) => (
    //   <img src={data.cityImage} className='h-8 rounded-full object-cover' />
    // ),
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'Designation',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'No of Position',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'Qualification',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'Skills',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'Exprience',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'Salary Details',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'Job discription',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'Status',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: '',
    header: 'Action',
    minWidth: 200,
    defaultFlex: 1,
  },
];
const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

function Jobapplication() {
  //   useEffect(() => {
  //     try {
  //       loadData();
  //     } catch (error) {
  //       console(error);
  //     }
  //   }, []);
  //   const DATASET_URL = 'https://swagstay-db-new.onrender.com/getcity';

  //   const [dataSource, setDataSource] = useState([]);
  //   // const [columns] = useState(columns);

  //   const loadData = useCallback(() => {
  //     fetch(DATASET_URL)
  //       .then((response) => response.json())
  //       .then((data) => setDataSource(data.Data));
  //   }, []);
  const dataSource = [{}];
  return (
    <>
      <DefaultLayout>
        <h1 className='text-2xl font-bold'>Job Application</h1>
        <div className='m-2 flex justify-end'>
          <button className='mr-1 bg-meta-3 p-4 py-1 text-white'>
            Pending
          </button>
          <button className='ml mr-1 bg-meta-3 p-4 py-1 text-white'>
            Short
          </button>
          <button className='mr-1  bg-meta-3 p-4 py-1 text-white'>
            Reject
          </button>
        </div>

        <div className='flex items-center gap-1'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='search' className='mr-5'>
              Search.:
            </label>
            <input
              type='search'
              id='search'
              placeholder='Search'
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
}

export default Jobapplication;
