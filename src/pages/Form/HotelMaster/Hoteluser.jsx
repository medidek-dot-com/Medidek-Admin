import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
function Hoteluser() {
  const [isOpen, setIsOpen] = useState(false);

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
      name: 'personalName',
      header: 'Full Name',
      // render: ({ data }) => (
      //   <img src={data.cityImage} className='h-8 rounded-full object-cover' />
      // ),
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'hotelid',
      header: 'Hotel ID',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'userName',
      header: 'USER ID',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'activeStatus',
      header: 'Active Status',
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
            {data.activeStatus === 'Active' ? (
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
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'action',
      header: 'Action',
      minWidth: 50,
      render: ({ data }) => {
        return (
          <div style={{ display: 'inline-block' }}>
            <NavLink to={`/hoteluser/updateHotelUser/${data._id}`}>
              <Button>Edit</Button>
            </NavLink>
          </div>
        );
      },
    },
  ];
  const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
  const gridStyle = { minHeight: 550 };

  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console(error);
    }
  }, []);
  const DATASET_URL = 'https://swagstay-db-new.onrender.com/hoteluser';

  const [dataSource, setDataSource] = useState([]);
  // const [columns] = useState(columns);

  const loadData = useCallback(() => {
    fetch(DATASET_URL)
      .then((response) => response.json())
      .then((data) => setDataSource(data.result));
  }, []);

  console.log(dataSource);

  const SEPARATOR = ',';
  const [gridRef, setGridRef] = useState(null);
  const [rows, setRows] = useState([]);
  const downloadBlob = (blob, fileName = 'hoteluser.xlsx') => {
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
  //   doc.save('Hotesluser-Master-admin.pdf');
  // };
  return (
    <>
      <DefaultLayout>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Hotel User</h1>
          <NavLink to={'/hoteluser/addHotelUser'}>
            <button className='bg-meta-3 p-2 px-4 text-white'>
              Add Hotel User
            </button>
          </NavLink>
        </div>

        <div className='flex items-center gap-1'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='search' className='mr-5'>
              Search.:
            </label>
            <input
              type='search'
              id='search'
              placeholder='Search'
              autoFocus
              className='text-boxdark outline-none focus:ring-0'
            />
          </div>
          <button className='bg-meta-3 p-4 py-1 text-white'>Search</button>
        </div>
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
          idProperty='_id'
          columns={columns}
          dataSource={dataSource}
          style={gridStyle}
          rowClass={rowClass}
          virtualizeColumns={true}
          rows={rows}
          handle={setGridRef}
        />
      </DefaultLayout>
    </>
  );
}

export default Hoteluser;
