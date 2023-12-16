import DefaultLayout from '../layout/DefaultLayout';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import Button from '@inovua/reactdatagrid-community/packages/Button';

const HotelInstallation = () => {
  const customCellStyle = (cellProps) => {
    const { value, rowActive } = cellProps;
    return {
      color: rowActive ? '#e9ecf0' : value % 2 ? '#ff595e' : 'inherit',
    };
  };

  Modal.setAppElement('html');

  const [isOpen, setIsOpen] = useState(false);
  const [hotelid, sethotelid] = useState('');
  const columns = [
    {
      name: '_index',
      header: '#',
      width: 50,
      defaultWidth: 50,
      render: ({ data, rowIndex }) => rowIndex + 1,
      sortable: false,
      resizable: false,
    },
    {
      name: 'Hotel_name',
      header: 'Hotel Name',
      type: 'string',
      minWidth: 150,
      defaultFlex: 1,
    },
    {
      name: 'City',
      header: 'City',
      type: 'string',
      minWidth: 130,
      defaultFlex: 1,
    },

    {
      name: 'created_at',
      header: 'Date',
      minWidth: 120,
      defaultFlex: 1,
    },

    {
      name: 'Contact_no',
      header: 'Contact',
      minWidth: 190,
      defaultFlex: 1,
    },
    {
      name: 'Action',
      header: 'Action',
      minWidth: 190,
      defaultFlex: 1,
      style: customCellStyle,
      render: ({ data }) => {
        return (
          <div className='flex gap-2'>
            <Button
              onClick={(e) => {
                setIsOpen(true);
                sethotelid(data._id);
              }}
            >
              Install
            </Button>
          </div>
        );
      },
    },
  ];

  const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
  const gridStyle = { minHeight: 650 };

  const defaultFilterValue = [
    { name: 'City', operator: 'startsWith', type: 'string', value: '' },
    { name: 'Hotel_name', operator: 'startsWith', type: 'string', value: '' },
  ];

  const SEPARATOR = ',';
  // let [hotelData, sethotelData] = useState([]);
  // console.log(hotelData);
  // async function deletAll() {
  //   let result = await axios.delete(
  //     'https://swagstay-db-new.onrender.com/Addhotel'
  //   );
  //   console.log(result);
  // }
  const [gridRef, setGridRef] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadData();
    setRows(dataSource);
  }, []);

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/hotelinstall';
  // const DATASET_URL = 'https://swagstay-db-new.onrender.com/Addhotel';

  const [dataSource, setDataSource] = useState([]);

  let [hotelType, setHotelType] = useState({
    hotelType: '',
    status: '',
    stateName: '',
  });

  // Update Hotel Type Method

  // const { id } = useParams();
  const getHotelType = async (hotelType_id) => {
    try {
      let response = await axios.get(
        `https://swagstay-db-new.onrender.com/AddhotelfindbyID/${hotelType_id}`
      );
      console.log(response.data.data);
      setHotelType(response.data.data);

      // return response.data.result;
    } catch (error) {
      console.log('Error while calling getHotelTypeByID API', error);
    }
  };

  // const [columns] = useState(columns);
  const [showColumnMenuTool, setShowColumnMenuTool] = useState(true);

  const loadData = useCallback(() => {
    const newDataSource = () => {
      return fetch(DATASET_URL).then((response) => {
        return response.json().then((data) => {
          return data;
        });
      });
    };

    setDataSource(newDataSource);
  }, []);

  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true;
    menuProps.items = [
      {
        label: 'Column ' + rowProps.rowIndex,
      },
    ];
  };

  console.log(dataSource);

  // Export to excel
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
    const blob = new Blob([contents], { type: 'text/xlsx;charset=utf-8;' });

    downloadBlob(blob);
  };

  const exportToPdf = () => {
    // create a new PDF document
    const doc = new jsPDF();
    // set the title of the document
    doc.setProperties({ title: 'Hotel List' });
    // define the columns to export
    const exportColumns = columns.map((column) => ({
      header: column.header,
      dataKey: column.key,
    }));
    // define the rows to export
    const exportRows = rows.map((row) =>
      exportColumns.reduce(
        (obj, col) => ({
          ...obj,
          [col.dataKey]: row[col.dataKey],
        }),
        {}
      )
    );
    // add the table to the document
    doc.autoTable({
      head: [exportColumns.map((col) => col.header)],
      body: exportRows,
    });
    // save the document
    doc.save('Hotels-list-admin.pdf');
  };
  async function installhotel() {
    let result = await axios.put(
      `https://swagstay-db-new.onrender.com/hotelinstallonweb/${hotelid}`
    );
    console.log(result);
    if (result.status === 200) {
      alert('Done');
      setIsOpen(false);
      loadData();
    } else {
      alert('Something went to wrong ');
      setIsOpen(false);
    }
  }

  return (
    // <div style={containerStyle}>
    //   <div style={gridStyle} className='ag-theme-alpine-dark'>
    //     <AgGridReact
    //       ref={gridRef}
    //       rowData={rowData}
    //       columnDefs={columnDefs}
    //       defaultColDef={defaultColDef}
    //       autoGroupColumnDef={autoGroupColumnDef}
    //       columnTypes={columnTypes}
    //       groupDefaultExpanded={1}
    //       suppressAggFuncInHeader={true}
    //       animateRows={true}
    //       onCellValueChanged={onCellValueChanged}
    //     ></AgGridReact>
    //   </div>
    // </div>
    <DefaultLayout>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[40rem] lg:top-[20rem]'
          overlayClassName='overlay'
        >
          <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-col gap-3 p-8'>
              <h1 className='text-xl font-semibold'> Install...?</h1>
              <div className='text-center'>
                <button
                  className='h-fit bg-meta-3 p-2 px-4 text-white'
                  onClick={installhotel}
                >
                  ADD
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
          </div>
        </Modal>
      )}
      <h1 className='text-2xl font-bold'>Hotel Installation</h1>
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
        <NavLink to={'/hotel/addHotel'}>
          <button className='h-fit bg-meta-3 p-2 px-4 text-white'>
            Add Hotel
          </button>
        </NavLink>
      </div>
      <ReactDataGrid
        idProperty='sr'
        columns={columns}
        dataSource={dataSource}
        style={gridStyle}
        rowClass={rowClass}
        virtualizeColumns={true}
      />
    </DefaultLayout>
  );
};

export default HotelInstallation;

const getRowData = () => {
  var rowData = [];
  for (var i = 1; i <= 10; i++) {
    rowData.push({
      group: i < 5 ? 'A' : 'B',
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
    });
  }
  return rowData;
};
