import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

const columns = [
  { name: 'sr', header: '#', minWidth: 20, defaultFlex: 1 },
  { name: 'name', header: 'Name', minWidth: 100, defaultFlex: 2 },
  { name: 'entryDate', header: 'Entry Date', minWidth: 120, defaultFlex: 1 },
  { name: 'phone', header: 'Mobile No.', minWidth: 100, defaultFlex: 1 },
  { name: 'status', header: 'Status', minWidth: 80, defaultFlex: 1 },
];
const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

const dataSource = [
  {
    sr: 1,
    name: 'John McQueen',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'App',
  },
  {
    sr: 2,
    name: 'Mary Stones',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'Website',
  },
  {
    sr: 3,
    name: 'Robert Fil',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'Website',
  },
  {
    sr: 4,
    name: 'Roger Robson',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'Website',
  },
  {
    sr: 5,
    name: 'Billary Konwik',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'CRS',
  },
  {
    sr: 6,
    name: 'Bob Martin',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'CRS',
  },
  {
    sr: 7,
    name: 'Matthew Richardson',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'App',
  },
  {
    sr: 8,
    name: 'Ritchie Peterson',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'App',
  },
  {
    sr: 9,
    name: 'Bryan Martin',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'Website',
  },
  {
    sr: 10,
    name: 'Mark Martin',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'App',
  },
  {
    sr: 11,
    name: 'Michelle Sebastian',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'CRS',
  },
  {
    sr: 12,
    name: 'Michelle Sullivan',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'CRS',
  },
  {
    sr: 13,
    name: 'Jordan Bike',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'App',
  },
  {
    sr: 14,
    name: 'Nelson Ford',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'App',
  },
  {
    sr: 15,
    name: 'Tim Cheap',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'CRS',
  },
  {
    sr: 16,
    name: 'Robert Carlson',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'App',
  },
  {
    sr: 17,
    name: 'Johny Perterson',
    entryDate: '02-04-2023',
    phone: 9836723662,
    status: 'App',
  },
];

const TableFour = () => {
  return (
    <>
      <h1 className='text-2xl font-bold'>Customers</h1>
      <ReactDataGrid
        idProperty='sr'
        columns={columns}
        dataSource={dataSource}
        style={gridStyle}
        rowClass={rowClass}
        virtualizeColumns={true}
      />
    </>
  );
};

export default TableFour;

export const Hotels = () => {
  return <></>;
};
