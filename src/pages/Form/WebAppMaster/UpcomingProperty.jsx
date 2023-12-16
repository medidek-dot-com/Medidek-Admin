import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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

const dataSource = [
  {
    CreateDate: '08/04/2023',
    Name: 'Pranay Kharabe',
    EmailId: 'adbcd@gmail.com',
    Mobile: 3754358388,
    PropertyType: 'Test1',
    Status: 'NO Checkout',
    Remarks: 'Type Remarks',
    Action: '',
  },
  {
    CreateDate: '08/04/2023',
    Name: 'Pranay Kharabe',
    EmailId: 'adbcd@gmail.com',
    Mobile: 3754358388,
    PropertyType: 'Test1',
    Status: 'NO Checkout',
    Remarks: 'Type Remarks',
    Action: '',
  },
  {
    CreateDate: '08/04/2023',
    Name: 'Pranay Kharabe',
    EmailId: 'adbcd@gmail.com',
    Mobile: 3754358388,
    PropertyType: 'Test1',
    Status: 'NO Checkout',
    Remarks: 'Type Remarks',
    Action: '',
  },
  {
    CreateDate: '08/04/2023',
    Name: 'Pranay Kharabe',
    EmailId: 'adbcd@gmail.com',
    Mobile: 3754358388,
    PropertyType: 'Test1',
    Status: 'NO Checkout',
    Remarks: 'Type Remarks',
    Action: '',
  },
];
const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

const UpcomingProperty = () => {
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
      name: 'created_at',
      header: 'Entry Date',
      minWidth: 250,
      defaultFlex: 1,
    },
    {
      name: 'name',
      header: 'Name',
      minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: 'email',
      header: 'Email Id',
      minWidth: 250,
      defaultFlex: 1,
    },
    {
      name: 'contactNumber',
      header: 'Mobile',
      render: ({ data }) => {
        return <div>{String(data.contactNumber).slice(2)}</div>;
      },
      minWidth: 250,
      defaultFlex: 1,
    },
    {
      name: 'hotelName',
      header: 'PropertyType',
      minWidth: 150,
      defaultFlex: 1,
    },
    {
      name: 'Action',
      header: 'Action',
      minWidth: 130,
      defaultFlex: 1,
      render: ({ data }) => {
        return (
          <div style={{ display: 'inline-block' }}>
            <Button
              onClick={() => {
                Deleteproperty(data._id);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console(error);
    }
  }, []);

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/listhotel';

  const [dataSource, setDataSource] = useState([]);

  const loadData = useCallback(() => {
    const newDataSource = async () => {
      return fetch(DATASET_URL).then(async (response) => {
        const data = await response.json();
        return data.result;
      });
    };

    setDataSource(newDataSource);
  }, []);

  async function Deleteproperty(id) {
    console.log(id);
    let result = await axios.delete(
      `https://swagstay-db-new.onrender.com/listhotel/${id}`
    );
    if (result.status === 200) {
      toast.success('Deleted');
      loadData();
    } else {
      toast.error('getting some error');
    }
  }
  console.log(dataSource);
  return (
    <>
      <DefaultLayout>
        <ToastContainer></ToastContainer>
        <h1 className='text-2xl font-bold'>Upcoming Property</h1>
        <div className='flex items-center gap-1'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='search' className='mr-5'>
              Search.:
            </label>
            <input
              type='search'
              id='search'
              placeholder='Search City'
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

export default UpcomingProperty;
