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
    name: 'HotelName',
    header: 'Hotel Name',
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: 'BookingId',
    header: 'Booking ID',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Name',
    header: 'Guest',
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
    name: 'BookingStatus',
    header: 'Booking Status',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'OtaType',
    header: 'OTA Type',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Checkin',
    header: 'Checkin',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Checkout',
    header: 'Checkout',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'RoomNights',
    header: 'Room Nights',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Adults',
    header: 'Adults',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Child',
    header: 'Child',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'BookingAmount',
    header: 'Booking Amount',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'RevenueFromRooms',
    header: 'Revenue From Rooms',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'TotalBookingRevenue',
    header: 'Total Booking Revenue',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'FromRoomRevenue',
    header: 'From Room Revenue',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'SwagCommission',
    header: 'Swag Commission',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'GrossHotelShare',
    header: 'Gross Hotel Share',
    minWidth: 250,
    defaultFlex: 1,
  },
  {
    name: 'PaymentMode',
    header: 'Payment Method',
    minWidth: 150,
    defaultFlex: 1,
  },
];
const dataSource = [
  {
    HotelName: 'Swagstay Flagship Hotel Century',
    BookingId: 'DELU22710',
    Name: 'Pranay Kharabe',
    Mobile: 3754358388,
    BookingStatus: 'Arrival',
    OtaType: 'Swagstay',
    Checkin: '08/04/2023',
    Checkout: '08/04/2023',
    RoomNights: 1,
    Adults: 20,
    Child: 2,
    BookingAmount: 1599,
    RevenueFromRooms: 16000,
    TotalBookingRevenue: 16000,
    FromRoomRevenue: 14287.8,
    SwagCommission: '(0%)',
    GrossHotelShare: 16000,
    PaymentMode: 'BTC',
    //   DateOfPay: '08/04/2023',
    //   CreateDate: '08/04/2023',
    //   BookingType: 'BTC',
    //   HotelName: 'Swagstay Flagship Hotel Century',
    //   CompanyName: 'Swagstay Hotel',
    //   CompanyAddress: 'Ramdaspeth',
    //   CustomerName: 'Pranay Kharabe',
    //   CustomerNo: 3754358388,
    //   Amount: 1599,
  },
];

const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

const CommissionReport = () => {
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
        <h1 className='text-2xl font-bold'>Commission Report</h1>
        <div className='flex items-center gap-1'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='search' className='mr-5'>
              Search.:
            </label>
            <input
              type='search'
              id='search'
              placeholder='Search Hotel'
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

export default CommissionReport;
