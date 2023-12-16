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
    name: 'cityImage',
    header: 'City Image',
    render: ({ data }) => (
      <img src={data.cityImage} className='h-8 rounded-full object-cover' />
    ),
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: 'city',
    header: 'City Name',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: 'stateName',
    header: 'State Name',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: 'country',
    header: 'Country Name',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: 'distance',
    header: 'City Distance',
    minWidth: 130,
    defaultFlex: 1,
    isPrimaryKey: true,
  },
  {
    name: 'Status',
    header: 'Active Status',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Featured',
    header: 'Featured',
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
          <NavLink to={`/cities/updateCity/${data._id}`}>
            <Button>Update</Button>
          </NavLink>
        </div>
      );
    },
  },
];
const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

const Maintenance = () => {
  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console(error);
    }
  }, []);

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/getcity';

  const [dataSource, setDataSource] = useState([]);
  // const [columns] = useState(columns);

  const loadData = useCallback(() => {
    fetch(DATASET_URL)
      .then((response) => response.json())
      .then((data) => setDataSource(data.Data));
  }, []);

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
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}

        <fieldset className='w-full rounded border border-black p-3'>
          <legend className='mb-6 px-2 text-2xl font-bold'>
            Update Maintenance :
          </legend>

          <div className='flex w-full flex-wrap'>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Under Construction*:
              </label>
              <input
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                required
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Construction Text*:
              </label>
              <input
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                required
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Search Distance*:
              </label>
              <input
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='number'
                required
              />
            </div>
          </div>

          <div className='flex flex-wrap'>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Customer Care*:
              </label>
              <input
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                required
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Customer Mail* :
              </label>
              <input
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                required
              />
            </div>
          </div>

          <div className='flex flex-wrap'>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Customer FB*:
              </label>
              <input
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                required
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Customer Twitter* :
              </label>
              <input
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                required
              />
            </div>
          </div>

          <div className='flex flex-wrap'>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Refer Text*:
              </label>
              <textarea
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                required
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Refer Long Text* :
              </label>
              <textarea
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                required
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Promocode Text* :
              </label>
              <textarea
                className='border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                required
              />
            </div>
          </div>

          <div className='flex flex-wrap'>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Refer Type :
              </label>
              <select
                className=' border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                placeholder='Enter your Blood Type'
                required
              >
                <option value='No Checkout'>No Checkout</option>
                <option value='Reffer After Sign'>Reffer After Sign</option>
                <option value='Half After Booking Checkout'>
                  Reffer After Booking Checkout
                </option>
                <option value='Half Signup and Booking Checkout'>
                  Half Signup and Booking Checkout
                </option>
              </select>
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Reffer Amount* :
              </label>
              <input
                className=' border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
                placeholder='Enter your Height'
                required
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Wallet Per* :
              </label>
              <input
                className=' border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='text'
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Welcome Amount* :
              </label>
              <input
                className=' border-b-gray-500 md:text-md w-full rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                type='number'
              />
            </div>
          </div>
          <div className='flex flex-wrap'>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-lg '>
                Sharing Text* :
              </label>
              <textarea
                className='border-b-gray-500 md:text-md rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                required
              />
            </div>
            <div className='mr-8 flex w-96 flex-col pb-6'>
              <label className='md:text-md mr-5 pb-2 text-sm text-meta-1'>
                ENTER TEXT BEFORE AND AFTER OF CUSTOMER REFFER IN SHARING TEXT
                AND SHARING TEXT1 :
              </label>
              <textarea
                className='border-b-gray-500 md:text-md rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                required
              />
            </div>
            <div className='mr-8 flex flex-col pb-6'>
              <label className='md:text-md text-red-700 mr-5 pb-2 text-lg'>
                Sharing Text 1* :
              </label>
              <textarea
                className='border-b-gray-500 md:text-md rounded-sm border-b-2 bg-white p-2 pl-0 text-xl transition delay-75 duration-75 ease-in-out focus:border-meta-3 focus:outline-none focus:ring-0 sm:text-sm'
                required
              />
            </div>
          </div>

          <button
            className='text-md  mt-5 flex w-fit items-center bg-meta-3 p-2 px-3  text-white'
            type='submit'
          >
            Save Changes
          </button>
        </fieldset>

        {/* <ReactDataGrid
          idProperty='_id'
          columns={columns}
          dataSource={dataSource}
          style={gridStyle}
          rowClass={rowClass}
          virtualizeColumns={true}
        /> */}
      </DefaultLayout>
    </>
  );
};

export default Maintenance;
