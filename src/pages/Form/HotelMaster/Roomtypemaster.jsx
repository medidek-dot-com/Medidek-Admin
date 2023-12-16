import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css';
import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
// Modal.setAppElement('root');

import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';

function Roomtypemaster() {
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
      name: 'roomType',
      header: 'Room Type',
      // render: ({ data }) => (
      //   <img src={data.cityImage} className='h-8 rounded-full object-cover' />
      // ),
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'roomTypeFroSms',
      header: 'Room Type(For SMS)',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: '',
      header: 'Status',
      minWidth: 200,
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
      name: 'Action',
      header: 'Action',
      minWidth: 50,
      render: ({ data }) => {
        return (
          <div style={{ display: 'inline-block' }}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (isOpen2) {
                  setIsOpen2(false);
                }
                setIsOpen(true);
                getRoomType(data._id);
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
  const gridStyle = {
    minHeight: 550,
    border: '2px solid grey',
    borderRadius: '4px',
  };

  const columnStyle = { border: '2px solid' };

  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console(error);
    }
  }, []);

  const DATASET_URL = 'https://swagstay-db-new.onrender.com/roomtypemaster';

  const [dataSource, setDataSource] = useState([]);

  const loadData = useCallback(() => {
    fetch(DATASET_URL)
      .then((response) => response.json())
      .then((data) => setDataSource(data.result));
    console.log(dataSource);
  }, []);

  // Add Room Type Method

  let [roomType, setRoomType] = useState({
    roomType: '',
    roomTypeFroSms: '',
    status: '',
  });

  async function addRoomType() {
    if (
      roomType.roomType === '' ||
      roomType.roomTypeFroSms === '' ||
      roomType.status === ''
    ) {
      toast.error('Please fill properly !');
    }

    let result = await axios.post(DATASET_URL, roomType);
    if (result.status === 200) {
      setRoomType({ roomType: '', roomTypeFroSms: '', status: '' });
      loadData();
      setIsOpen2(false);
      toast('Room Type added successfully');
    } else {
      setRoomType({ roomType: '', roomTypeFroSms: '', status: '' });
      loadData();
      setIsOpen2(false);
      toast('please try again');
    }
    setIsOpen2(false);
  }

  // Update Room Type Method

  const getRoomType = async (roomType_id) => {
    // if (
    //   roomType.roomType === '' ||
    //   roomType.roomTypeFroSms === '' ||
    //   roomType.status === ''
    // ) {
    //   toast.error('Please fill properly !');
    // }
    try {
      let response = await axios.get(
        `https://swagstay-db-new.onrender.com/roomtypemaster/${roomType_id}`
      );
      console.log(response.data.result);
      setRoomType(response.data.result);

      // return response.data.result;
    } catch (error) {
      console.log('Error while calling getRoomTypeByID API', error);
    }
  };

  async function updateRoomType(id) {
    if (
      roomType.roomType === '' ||
      roomType.roomTypeFroSms === '' ||
      roomType.status === ''
    ) {
      toast.error('Please fill properly !');
    }
    try {
      let result = await axios.put(
        `https://swagstay-db-new.onrender.com/roomtypemasterupdate/${id}`,
        roomType
        // config
      );
      if (result.status === 200) {
        loadData();
        setIsOpen(false);
        setRoomType({ roomType: '', roomTypeFroSms: '', status: '' });
        toast.success('Room Type Updated successfully!');
      }
      console.log(result);
    } catch (err) {
      toast.error('Something went wrong!');
      console.log('Error while updating Hotel', err);
    }
  }
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
      <ToastContainer position='top-center' />
      <div className='flex justify-center'>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className='modal absolute top-[5rem] right-[5rem] flex justify-center rounded bg-white shadow-lg lg:right-[40rem] lg:top-[5rem]'
            overlayClassName='overlay'
          >
            <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='flex flex-col gap-3 p-8'>
                <h1 className='text-xl font-semibold'>Edit Room Type Master</h1>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Room Type
                  </label>
                  <input
                    type='text'
                    placeholder='Ex. Delux'
                    name={roomType.roomType}
                    defaultValue={roomType.roomType}
                    onChange={(e) => {
                      setRoomType({ ...roomType, roomType: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />

                  <div>
                    <span className='text-meta-1'>
                      {roomType.roomType.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill Roomtype</>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Room Type(For SMS)
                  </label>
                  <input
                    type='text'
                    placeholder='Ex. Delux'
                    name={roomType.roomTypeFroSms}
                    defaultValue={roomType.roomTypeFroSms}
                    onChange={(e) => {
                      setRoomType({
                        ...roomType,
                        roomTypeFroSms: e.target.value,
                      });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                  <div>
                    <span className='text-meta-1'>
                      {roomType.roomTypeFroSms.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill Room Type fro SMS</>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Status
                  </label>
                  {/* <input
                    type='text'
                    placeholder='Status'
                    name={roomType.status}
                    defaultValue={roomType.status}
                    onChange={(e) => {
                      setRoomType({ ...roomType, status: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  /> */}
                  <select
                    onChange={(e) => {
                      setRoomType({
                        ...roomType,
                        status: e.target.value,
                      });
                    }}
                    value={roomType.status}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  >
                    <option value=''>Select</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                  <div>
                    <span className='text-meta-1'>
                      {roomType.status.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill Status</>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => updateRoomType(roomType._id)}
                  className='w-full rounded-lg bg-meta-3 p-2 text-white'
                >
                  Update
                </button>
              </div>
              <button
                className='absolute top-2 right-2'
                onClick={() => {
                  setIsOpen(false);
                  setRoomType({ roomType: '', roomTypeFroSms: '', status: '' });
                }}
              >
                X
              </button>
            </div>
          </Modal>
        )}

        {isOpen2 && (
          <Modal
            isOpen={isOpen2}
            onRequestClose={() => setIsOpen2(false)}
            className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[40rem] lg:top-[5rem]'
            overlayClassName='overlay'
          >
            <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='flex flex-col gap-3 p-8'>
                <h1 className='text-xl font-semibold'>Add Room Type Master</h1>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Room Type
                  </label>
                  <input
                    type='text'
                    placeholder='Ex. Deluxe'
                    name={roomType.roomType}
                    onChange={(e) => {
                      setRoomType({ ...roomType, roomType: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                  <div>
                    <span className='text-meta-1'>
                      {roomType.roomType.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill Roomtype</>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Room Type(For SMS)
                  </label>
                  <input
                    type='text'
                    placeholder='Ex. Deluxe'
                    name={roomType.roomTypeFroSms}
                    onChange={(e) => {
                      setRoomType({
                        ...roomType,
                        roomTypeFroSms: e.target.value,
                      });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                  <div>
                    <span className='text-meta-1'>
                      {roomType.roomTypeFroSms.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill RoomTypeForSms</>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Status
                  </label>
                  {/* <input
                    type='text'
                    placeholder='Status'
                    name={roomType.status}
                    onChange={(e) => {
                      setRoomType({ ...roomType, status: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  /> */}
                  <select
                    onChange={(e) => {
                      setRoomType({
                        ...roomType,
                        status: e.target.value,
                      });
                    }}
                    value={roomType.status}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  >
                    <option value=''>Select</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                  <div>
                    <span className='text-meta-1'>
                      {roomType.status.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill Status</>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={addRoomType}
                  className='w-full rounded-lg bg-meta-3 p-2 text-white'
                >
                  Save
                </button>
              </div>
              <button
                className='absolute top-2 right-2'
                onClick={() => {
                  setIsOpen2(false);
                  setRoomType({ roomType: '', roomTypeFroSms: '', status: '' });
                }}
              >
                X
              </button>
            </div>
          </Modal>
        )}
      </div>
      <DefaultLayout>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Room Type Master</h1>
          <button
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
              }
              setIsOpen2(true);
            }}
            className='bg-meta-3 p-2 px-4 text-white'
          >
            Add Room Type
          </button>
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
          idProperty='_index'
          columns={columns}
          dataSource={dataSource}
          style={gridStyle}
          cellStyle={columnStyle}
          rowClass={rowClass}
          virtualizeColumns={true}
          rows={rows}
          handle={setGridRef}
          theme='default-light dark:default-dark'
        />
      </DefaultLayout>
    </>
  );
}

export default Roomtypemaster;
