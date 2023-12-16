import React, { useState, useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DefaultLayout from '../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
const CustomerList = () => {
  const columns = [
    {
      name: '_index',
      header: '#',
      width: 50,
      defaultWidth: 50,
      render: ({ data, rowIndex }) => rowIndex + 1,
      sortable: false,
      resizable: false,
      frozen: true,
    },
    {
      name: 'created_Date',
      header: 'Entry Date',
      minWidth: 120,
      defaultFlex: 1,
    },
    { name: 'name', header: 'Name', minWidth: 100, defaultFlex: 2 },
    { name: 'gender', header: 'Gender', minWidth: 100, defaultFlex: 2 },
    { name: 'mobile', header: 'Mobile No.', minWidth: 100, defaultFlex: 1 },
    {
      name: 'anniversary',
      header: 'Anniversary Date',
      minWidth: 140,
      defaultFlex: 1,
    },
    { name: 'DOB', header: 'DOB', minWidth: 120, defaultFlex: 1 },
    { name: 'emailAddress', header: 'Email', minWidth: 100, defaultFlex: 1 },
    { name: 'gstno', header: 'GST', minWidth: 80, defaultFlex: 1 },
    {
      name: 'wallet',
      header: 'Wallet',
      minWidth: 80,
      defaultFlex: 1,
      render: ({}) => {
        return <div>100</div>;
      },
    },
    {
      name: 'totalRefer',
      header: 'Total Refer',
      minWidth: 100,
      render: ({}) => {
        return <div>0</div>;
      },
      defaultFlex: 1,
    },
    {
      name: 'registeredBy',
      header: 'Registered By',
      render: ({}) => {
        return <div>web</div>;
      },
      minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: 'totalBookings',
      header: 'Total Bookings',
      minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: '',
      header: 'Action',
      minWidth: 100,
      render: ({ data }) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {data.status === 'Active' ? (
              <>
                {' '}
                <AiTwotoneUnlock className='h-8 w-6 text-meta-3 ' />
              </>
            ) : (
              <>
                {' '}
                <AiTwotoneLock className='h-8 w-6 text-meta-1' />
              </>
            )}
          </div>
        );
      },
      defaultFlex: 1,
    },
    {
      name: 'status',
      header: 'Status',
      minWidth: 100,
      defaultFlex: 1,
      render: ({ data }) => {
        return <div>User Active</div>;
      },
    },
  ];
  const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
  const gridStyle = { minHeight: 550 };
  const [rows, setRows] = useState([]);
  useEffect(() => {
    loadData();
    setRows(dataSource);
  }, []);

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/guest';

  const [dataSource, setDataSource] = useState([]);
  const [gridRef, setGridRef] = useState(null);
  // const [rows, setRows] = useState([]);
  // const [columns] = useState(columns);
  const SEPARATOR = ',';

  const loadData = useCallback(() => {
    const newDataSource = async () => {
      return fetch(DATASET_URL).then((response) => {
        return response.json().then((data) => {
          return data;
        });
      });
    };

    setDataSource(newDataSource);
  }, []);

  console.log(dataSource);
  const downloadBlob = (blob, fileName = 'Customerlist-list.xlsx') => {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.position = 'absolute';
    link.style.visibility = 'hidden';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };
  const exportCSV = () => {
    const columns = gridRef.current.visibleColumns;

    const header = columns.map((c) => c.name).join(SEPARATOR);
    const rows = gridRef.current.data.map((data) =>
      columns.map((c) => data[c.id]).join(SEPARATOR)
    );

    const contents = [header].concat(rows).join('\n');
    const blob = new Blob([contents], { type: 'text/csv;charset=utf-8;' });

    downloadBlob(blob);
  };

  // const exportToPdf = () => {
  //   // create a new PDF document
  //   const doc = new jsPDF();
  //   // set the title of the document
  //   doc.setProperties({ title: 'Customer List' });
  //   // define the columns to export
  //   const exportColumns = columns.map((column) => ({
  //     header: column.name,
  //     dataKey: column.key,
  //   }));
  //   // define the rows to export
  //   const exportRows = rows.map((row) =>
  //     exportColumns.reduce(
  //       (obj, col) => ({
  //         ...obj,
  //         [col.dataKey]: row[col.dataKey],
  //       }),
  //       {}
  //     )
  //   );
  //   // add the table to the document
  //   doc.autoTable({
  //     head: [exportColumns.map((col) => col.header)],
  //     body: exportRows,
  //   });
  //   // save the document
  //   doc.save('Customer-list-admin.pdf');
  // };
  return (
    <>
      <DefaultLayout>
        <h1 className='text-2xl font-bold'>Customer List</h1>
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}
        <div className='flex items-center justify-between'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='city' className='mr-5'>
              Select City:
            </label>
            <select
              name='city'
              id='city'
              className='pr-5 text-boxdark outline-none focus:ring-0'
            >
              <option value='Nagpur'>Nagpur</option>
              <option value='Wardha'>Wardha</option>
              <option value='Goa'>Goa</option>
            </select>
          </div>
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
              Checking Status :
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
              <option value='Goa'>Not Show</option>
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
          <div className='text-grey-900 inline-block gap-6 bg-white p-[0.2rem] px-2'>
            <label for='search' className='mr-5'>
              Booking Date:
            </label>
            <input
              type='date'
              id='search'
              placeholder='Type here'
              autoFocus
              className='text-boxdark outline-none focus:ring-0'
            />
          </div>
          <button className='bg-meta-3 p-4 text-white'>Search</button>
        </div>
        <div className='my-2 flex gap-2'>
          {/* <button
            className='bg-meta-3 p-2 px-4 text-white'
            onClick={exportToPdf}
          >
            Export to PDF
          </button> */}
          <button
            className='bg-meta-3 p-2 px-4 text-white '
            onClick={exportCSV}
          >
            Export to Excel
          </button>
        </div>
        <ReactDataGrid
          idProperty='emailAddress'
          columns={columns}
          dataSource={dataSource}
          style={gridStyle}
          rowClass={rowClass}
          virtualizeColumns={true}
          handle={setGridRef}
        />
      </DefaultLayout>
    </>
  );
};

export default CustomerList;
