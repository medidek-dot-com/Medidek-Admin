import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import AccordionRenderer from '../components/AccordionRenderer';
import { ButtonGroup } from './UiElements/Buttons';

const columns = [
  {
    name: 'serial',
    header: '#',
    minWidth: 70,
    defaultFlex: 1,
  },
  {
    name: 'CheckinStatus',
    header: 'Checkin Status',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'HotelID',
    header: 'Hotel ID',
    minWidth: 100,
    defaultFlex: 1,
  },
  {
    name: 'BookingID',
    header: 'Booking ID',
    minWidth: 100,
    defaultFlex: 1,
  },
  {
    name: 'AgentName',
    header: 'Agent Name',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'HotelName',
    header: 'Hotel Name',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'RoomType',
    header: 'Room Type',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'GuestName',
    header: 'Guest Name',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Date',
    header: 'CheckIn Date - Checkout Date',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'TotalAmount',
    header: 'Total Amount',
    minWidth: 130,
    defaultFlex: 1,
  },
  {
    name: 'Commission',
    header: 'Commission',
    minWidth: 120,
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
const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

const dataSource = [
  {
    serial: 1,
    CheckinStatus: 'Checked In',
    HotelID: 'SWAG221',
    BookingID: 'DE7021',
    AgentName: 'Pranay Kharabe(AGENT0455)',
    HotelName: 'Swagstay Townhouse 181',
    RoomType: 'Deluxe AC',
    GuestName: 'Vijay Hajare',
    Date: '08/04/2023 - 09/04/2023',
    TotalAmount: 1000,
    Commission: 1000,
  },
];

const AgentBooking = () => {
  return (
    <>
      <DefaultLayout>
        <h1 className='text-2xl font-bold'>Agent Booking</h1>
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}
        <div className='my-4 flex items-center justify-between bg-white'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='city' className='mr-5'>
              Select Hotel:
            </label>
            <select
              name='city'
              id='city'
              className='pr-5 text-boxdark outline-none focus:ring-0'
            >
              <option value='Nagpur'>Avadh</option>
              <option value='Wardha'>Ownhouse</option>
              <option value='Goa'>Century</option>
            </select>
          </div>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='city' className='mr-5'>
              Checking Status:
            </label>
            <select
              name='city'
              id='city'
              className='pr-5 text-boxdark outline-none focus:ring-0'
            >
              <option value='Nagpur'>All</option>
              <option value='Wardha'>Upcoming</option>
              <option value='Goa'>Checked In</option>
              <option value='Goa'>Checked Out</option>
            </select>
          </div>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='search' className='mr-5'>
              Booking ID/Mobile No.:
            </label>
            <input
              type='search'
              id='search'
              placeholder='Type here'
              autoFocus
              className='text-boxdark outline-none focus:ring-0'
            />
          </div>
          <button className='bg-meta-3 py-3 px-3 text-white'>Search</button>
        </div>
        {/* <ButtonGroup /> */}
        <ReactDataGrid
          idProperty='serial'
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

export default AgentBooking;
