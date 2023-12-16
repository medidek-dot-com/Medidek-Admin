import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
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

const City = () => {
  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console(error);
    }
  }, []);

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/getcity';

  const [dataSource, setDataSource] = useState([]);

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

  useEffect(() => {
    loadData();
    setRows(dataSource);
  }, []);
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true;
    menuProps.items = [
      {
        label: 'Column ' + rowProps.rowIndex,
      },
    ];
  };
  const SEPARATOR = ',';
  const [gridRef, setGridRef] = useState(null);
  const [rows, setRows] = useState([]);
  const downloadBlob = (blob, fileName = 'grid-data.xlsx') => {
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
  return (
    <>
      <DefaultLayout>
        <h1 className='text-2xl font-bold'>Cities</h1>
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}
        <div className='flex items-center justify-between gap-1'>
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
            <button className='bg-meta-3 p-4 py-1 text-white'>Search</button>
          </div>
          <Link to='/cities/addCity'>
            <button className='bg-meta-3 p-2 px-4 text-white'>Add City</button>
          </Link>
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

        {/* <div className='my-2'>
          <button onClick={exportToPdf}>Export to PDF</button>
        </div> */}
        <ReactDataGrid
          idProperty='_id'
          columns={columns}
          dataSource={dataSource}
          style={gridStyle}
          rowClass={rowClass}
          rows={rows}
          handle={setGridRef}
          virtualizeColumns={true}
          renderRowContextMenu={renderRowContextMenu}
        />
      </DefaultLayout>
    </>
  );
};

export default City;
