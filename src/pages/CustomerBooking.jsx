import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import Modal from 'react-modal';
import AccordionRenderer from '../components/AccordionRenderer';

import { toast } from 'react-toastify';
import axios from 'axios';

const CustomerBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allgust, setallguest] = useState([]);
  const [index, setindex] = useState('');
  const [bookingstatus, setbookingstatus] = useState({ val: '', id: '' });
  console.log(index);
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
      name: 'created_Date',
      header: 'Entry Date',
      minWidth: 130,
      defaultFlex: 1,
    },
    {
      name: 'VerifiedStatus',
      header: 'Verified Status',

      render: ({ data, rowIndex }) => (
        <button
          className='z-999 pr-14'
          onClick={() => {
            setIsOpen(!isOpen);
            console.log('okkk....');
            setbookingstatus({ ...bookingstatus, id: data._id });
            setindex(rowIndex);
          }}
        >
          {data.selectedinfo.verifiedstatus}
        </button>
      ),
      minWidth: 150,
      defaultFlex: 1,
    },
    {
      name: 'CheckinStatus',
      header: 'Checkin Status',
      render: ({ data }) => data.selectedinfo.checkinStatus,
      minWidth: 150,
      defaultFlex: 1,
    },
    {
      name: '_id',
      header: 'Booking ID',
      minWidth: 100,
      render: ({ data }) => data._id,
      defaultFlex: 1,
    },
    {
      name: 'HotelName',
      header: 'Hospital Name',
      minWidth: 250,
      render: ({ data }) => data.Bookhotel.Hotel_name,
      defaultFlex: 1,
    },
    {
      name: 'CityName',
      header: 'City Name',
      minWidth: 250,
      render: ({ data }) => data.Bookhotel.City,
      defaultFlex: 1,
    },
    {
      name: 'GuestName',
      header: 'patient Name',
      minWidth: 170,
      render: ({ data }) => data.Guestdetails.name,
      defaultFlex: 1,
    },

    {
      name: 'BookingStatus',
      header: 'Appointment Status',
      minWidth: 190,
      render: ({ data }) => <div>{data.selectedinfo.Bookingstatus}</div>,
      defaultFlex: 1,
    },
    {
      name: 'DiscountAmount',
      header: 'Discount Amount',
      minWidth: 130,
      render: ({ data }) => data.Bookhotel.price,
      defaultFlex: 1,
    },
    {
      name: 'TotalAmount',
      header: 'Total Amount',
      minWidth: 130,
      render: ({ data }) =>
        data.Bookhotel.price + data.Bookhotel.price - 15 * 0.12,
      defaultFlex: 1,
    },
    {
      name: 'BalanceAmount',
      header: 'Balance Amount',
      minWidth: 130,
      render: ({ data }) =>
        data.Bookhotel.price + data.Bookhotel.price - 15 * 0.12,
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
  const SEPARATOR = ',';
  useEffect(() => {
    loadData();
  }, []);

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/getBookingDetails';

  const [dataSource, setDataSource] = useState([]);
  // const [columns] = useState(columns);

  const loadData = useCallback(() => {
    const newDataSource = async () => {
      return fetch(DATASET_URL).then((response) => {
        return response.json().then((data1) => {
          console.log(data1);
          setallguest(data1.data);
          const data = data1.data;
          return data;
        });
      });
    };

    setDataSource(newDataSource);
  }, []);
  console.log(dataSource);

  const [gridRef, setGridRef] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadData();
    setRows(dataSource);
  }, []);
  const downloadBlob = (blob, fileName = 'Customerbooking-data.xlsx') => {
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
  //   doc.setProperties({ title: 'Hotel List' });
  //   // define the columns to export
  //   const exportColumns = columns.map((column) => ({
  //     header: column.header,
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
  //   doc.save('Hotels-list-admin.pdf');
  // };

  console.log(bookingstatus);
  async function SetStatus(id) {
    let result = await axios.post(
      `http://localhost:5000/bookingstatus/${bookingstatus.id}`,
      {
        status: bookingstatus.val,
      }
    );
    console.log(result);
    if (result.status === 200) {
      loadData();
      toast.success('Booking updated');
    }
  }
  const [showColumnMenuTool, setShowColumnMenuTool] = useState(true);
  const defaultFilterValue = [
    { name: 'City', operator: 'startsWith', type: 'string', value: 'N' },
    { name: 'Hotel_name', operator: 'startsWith', type: 'string', value: 'A' },
  ];
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true;
    menuProps.items = [
      {
        label: 'Column ' + rowProps.rowIndex,
      },
    ];
  };

  return (
    <>
      <DefaultLayout>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className='modal absolute top-[5rem] right-[5rem] z-[100] w-60 rounded bg-white shadow-lg lg:right-[40rem] lg:top-[15rem]'
            overlayClassName='overlay'
          >
            {/* <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='flex flex-col gap-3 p-8'>
                <h1 className='text-xl font-semibold'> Status</h1>
                <div className=''>
                  <div>
                    <div>
                      <div>
                        <label>Guest Name</label>
                      </div>
                      <div>
                        <div className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-4 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                          {allgust[index].Guestdetails.name}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>
                        <label>Mobile no</label>
                      </div>
                      <div>
                        <div className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-4  px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                          {allgust[index].Guestdetails.mobile}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label>Hotel Name</label>
                        <div className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-4  px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                          {allgust[index].Bookhotel.Hotel_name}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>
                        <label>Room type</label>
                      </div>
                      <div>
                        <div className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-4 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                          {allgust[index].selectedinfo.Roomtype}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {' '}
                    <select
                      onChange={(e) => {
                        setbookingstatus({
                          ...bookingstatus,
                          val: e.target.value,
                        });
                      }}
                      className='mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    >
                      <option hidden>select status</option>
                      <option value='Confirm'>Confirm</option>
                      <option value='Cancel'>Cancel</option>
                      <option value='Pending'>Pending</option>
                    </select>
                  </div>
                  <button
                    className='mt-4 h-fit rounded bg-meta-3 p-2 px-4 text-white'
                    onClick={() => {
                      SetStatus();
                      setIsOpen(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
              <button
                className='absolute top-2 right-2'
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                X
              </button>
            </div> */}
          </Modal>
        )}
        <h1 className='text-2xl font-bold'>Appointment Booking</h1>
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}
        {/* <div className='flex items-center justify-between'>
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
        </div> */}
        {/* <div className='my-2'>
          <button onClick={exportToPdf}>Export to PDF</button>
        </div> */}
        <div className='my-2 flex items-center gap-2'>
          {/* <button
            className='bg-meta-3 p-2 px-4 text-white'
            onClick={exportToPdf}
          >
            Export to PDF
          </button> */}
          <button className='bg-meta-3 p-2 px-4 text-white' onClick={exportCSV}>
            Export to Excel
          </button>
        </div>
        <ReactDataGrid
          idProperty='serial'
          columns={columns}
          row={rows}
          dataSource={dataSource}
          style={gridStyle}
          rowClass={rowClass}
          virtualizeColumns={true}
          handle={setGridRef}
          // showColumnMenuTool={showColumnMenuTool}
          // defaultFilterValue={defaultFilterValue}
          // renderRowContextMenu={renderRowContextMenu}
        />
      </DefaultLayout>
    </>
  );
};

export default CustomerBooking;
