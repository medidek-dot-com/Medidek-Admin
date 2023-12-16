import React, { useState, useEffect, useCallback } from 'react';
import '@inovua/reactdatagrid-community/index.css';
import BookingTable from '../../components/Reportspmstable';
import { BiSearch } from 'react-icons/bi';

import PmsLayout from '../../layout/PmsLayout';
import DataStats from '../../components/DataStats';
const Reports = () => {
  // console.log(loadData.length);
  // console.log(columns.cre);

  // Bookings

  return (
    <PmsLayout>
      <div className='box-border flex h-screen w-full flex-col '>
        <h1 className='mt-4 text-3xl font-bold'>Booking Source Report</h1>
        <div className='mt-4 flex w-full items-end gap-5 bg-meta-9 py-4  shadow-sm dark:bg-boxdark'>
          <div className='ml-4 flex flex-col'>
            <label className='font-semibold'>Booking Source</label>
            <select className='h-10 w-48 rounded border p-2 dark:border-strokedark dark:bg-meta-4'>
              <option>All Booking Source</option>
              <option>Walk in</option>
              <option>Swag Stay</option>
            </select>
          </div>
          <div className='ml-4 flex flex-col'>
            <label className='font-semibold'>Booking Status</label>
            <select className='h-10 w-48 rounded border p-2 dark:border-strokedark dark:bg-meta-4'>
              <option>Booking Status</option>
              <option>Walk in</option>
              <option>Swag Stay</option>
            </select>
          </div>
          <div className='ml-4 flex flex-col'>
            <label className='font-semibold'>Check In date</label>
            <div>
              <input
                type='date'
                className='h-10 w-48 rounded border p-2 dark:border-strokedark dark:bg-meta-4'
              />
            </div>
          </div>
          <div className='ml-4 flex flex-col '>
            <label className='font-semibold'>Check out</label>
            <div>
              <input
                type='date'
                className='h-10 w-48 rounded border p-2 dark:border-strokedark dark:bg-meta-4'
              />
            </div>
          </div>
          <div className='ml-4 flex flex-col  justify-center '>
            <div className='flex h-10 w-10 items-center justify-center rounded-sm bg-black'>
              <BiSearch className='h-6 w-6 text-white dark:border-strokedark' />
            </div>
          </div>
          <div className='ml-4 flex flex-col  justify-center '>
            <div className='bg-lime-500'>
              <button className='rounded border bg-meta-3 p-2 px-4 font-bold text-white'>
                Download
              </button>
            </div>
          </div>
        </div>
        {/* {middle section} */}

        <hr />

        <div className='my-5'>
          <div className=' mt-4 mb-10 w-full '>
            <DataStats />
          </div>

          <div className='my-6 text-3xl font-bold '>
            <h1>Report Details</h1>
          </div>

          {/* table section  */}
          <div className='h-full w-full'>
            <BookingTable></BookingTable>
          </div>
        </div>
      </div>
    </PmsLayout>
  );
};

export default Reports;
