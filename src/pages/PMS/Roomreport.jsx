import React, { useState, useEffect, useCallback } from 'react';
import CardTwo from '../../components/CardTwo';
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import TableFour from '../../components/CustomerTable1';
import { BiDownload, BiHotel, BiUser, BiSearch } from 'react-icons/bi';
import BookingTable from '../../components/Roomoccupancyreporttable';
import {
  FaCalculator,
  FaLock,
  FaRegListAlt,
  FaSalesforce,
  FaUserFriends,
  FaUsers,
  FaWallet,
} from 'react-icons/fa';
import axios from 'axios';
import PmsLayout from '../../layout/PmsLayout';
import CardThree from '../../components/CardThree';
import { useParams } from 'react-router-dom';
const Roomreport = () => {
  let { id } = useParams();
  return (
    <PmsLayout>
      <div className='box-border flex h-screen w-full flex-col '>
        <h1 className='mt-4 text-3xl font-bold'>Room Occupancy Report</h1>
        <div className='mt-8 flex h-10 w-40 gap-6'>
          <div className='flex flex-col items-start justify-end'>
            <label className='font-semibold'>Search Date</label>
            <div>
              <input type='date' className='h-10 w-48 rounded border p-2' />
            </div>
          </div>
          <div className='flex items-center justify-center '>
            <div className='flex h-10 w-10 items-center justify-center rounded-sm bg-black'>
              <BiSearch className='h-6 w-6 text-white' />
            </div>
          </div>
          <div className=' flex   justify-center text-center'>
            <div className='bg-lime-500'>
              <button className='rounded border bg-meta-3 p-2 px-4 font-bold text-white'>
                Download
              </button>
            </div>
          </div>
        </div>
        <div className='mt-6 w-full '>
          <BookingTable id={id} />
        </div>
      </div>
    </PmsLayout>
  );
};

export default Roomreport;
