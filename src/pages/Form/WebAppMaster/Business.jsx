import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
// import '@inovua/reactdatagrid-community/index.css';
import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
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

const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550, fontweight: 'bold' };

const Business = () => {
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
      minWidth: 250,
      render: ({ data }) => {
        return <div>{String(data.contactNumber).slice(2)}</div>;
      },
      defaultFlex: 1,
    },
    {
      name: 'companyName',
      header: 'Company',
      minWidth: 150,
      defaultFlex: 1,
    },
    {
      name: 'city',
      header: 'City',
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
                Deletecorporate(data._id);
              }}
            >
              {' '}
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    loadData();
  }, []);
  async function Deletecorporate(id) {
    let result = await axios.delete(
      `https://swagstay-db-new.onrender.com/corporateSolution/${id}`
    );
    if (result.status === 200) {
      toast.success('DELETED...');
      loadData();
    }
  }

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/corporateSolution';

  const [dataSource, setDataSource] = useState([]);

  // const loadData = useCallback(() => {
  //   fetch(DATASET_URL)
  //     .then((response) => response.json())
  //     .then((data) => setDataSource(data.Data));
  // }, []);

  const loadData = useCallback(() => {
    const newDataSource = async () => {
      return fetch(DATASET_URL).then(async (response) => {
        const data = await response.json();
        return data.result;
      });
    };

    setDataSource(newDataSource);
  }, []);

  console.log(dataSource);
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
        <h1 className='text-2xl font-bold'>Business</h1>
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}
        <div className='flex items-center justify-between gap-1'>
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
            <button className='bg-meta-3 p-4 py-1 text-white'>Search</button>
          </div>

          <div>
            <button className='p04 rounded bg-meta-3 py-2 px-1 text-white'>
              Add Business
            </button>
          </div>
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

export default Business;
