import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import axios from 'axios';

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
const gridStyle = { minHeight: 550 };

const ContactUs = () => {
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
      name: 'entryDate',
      header: 'Entry Date',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'firstName',
      header: 'Name',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'lastName',
      header: 'Last Name',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'phone',
      header: 'Mobile No.',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'email',
      header: 'EmailId',
      minWidth: 130,
      defaultFlex: 1,
      isPrimaryKey: true,
    },
    {
      name: 'subject',
      header: 'Subject',
      minWidth: 150,
      defaultFlex: 1,
    },
    {
      name: 'message',
      header: 'Message',
      minWidth: 130,
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
            {/* <NavLink to={`/cities/updateCity/${data._id}`}> */}
            <Button
              onClick={() => {
                Deletecontact(data._id);
              }}
            >
              Delete
            </Button>
            {/* </NavLink> */}
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

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/contactus';

  const [dataSource, setDataSource] = useState([]);
  console.log(dataSource);
  const loadData = useCallback(() => {
    fetch(DATASET_URL)
      .then((response) => response.json())
      .then((data) => setDataSource(data.data));
  }, []);

  async function Deletecontact(id) {
    let result = await axios.delete(
      `https://swagstay-db-new.onrender.com/contactus/${id}`
    );
    if (result.status === 200) {
      alert('DELETED...');
      loadData();
    } else {
      alert('Something went to wrong');
    }
  }

  console.log(dataSource);
  return (
    <>
      <DefaultLayout>
        <h1 className='text-2xl font-bold'>Contact US</h1>
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}
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

export default ContactUs;
