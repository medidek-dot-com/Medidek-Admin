import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
import Button from '@inovua/reactdatagrid-community/packages/Button';

const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

function HotelTypeMaster() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
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
      name: 'hotelType',
      header: 'Hotel Type',
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
      name: 'stateName',
      header: 'State Name',
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
            <Button
              onClick={(e) => {
                if (isOpen2) {
                  setIsOpen2(false);
                }
                setIsOpen(true);
                getHotelType(data._id);
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const DATASET_URL = 'https://swagstay-db-new.onrender.com/hoteltypemaster';

  const [dataSource, setDataSource] = useState([]);

  const loadData = useCallback(() => {
    fetch(DATASET_URL)
      .then((response) => response.json())
      .then((data) => setDataSource(data.result));
  }, []);

  let [hotelType, setHotelType] = useState({
    hotelType: '',
    status: '',
    stateName: '',
  });

  async function addHotelType() {
    if (
      hotelType.hotelType === '' ||
      hotelType.status === '' ||
      hotelType.stateName === ''
    ) {
      return toast.error('Please fill properly !');
    }
    let result = await axios.post(DATASET_URL, hotelType);
    console.log(result);
    try {
      if (result.status === 200) {
        setIsOpen2(false);
        loadData();
        setHotelType({ hotelType: '', status: '', stateName: '' });
        toast.success('Hotel Type added successfully');
      }
    } catch (error) {
      setIsOpen2(false);
      setHotelType({ hotelType: '', status: '', stateName: '' });
      alert('please try again');
    }

    setIsOpen2(false);
  }

  // Update Hotel Type Method

  // const { id } = useParams();
  const getHotelType = async (hotelType_id) => {
    try {
      let response = await axios.get(
        `https://swagstay-db-new.onrender.com/hoteltypemaster/${hotelType_id}`
      );
      console.log(response.data.result);
      setHotelType(response.data.result);

      // return response.data.result;
    } catch (error) {
      console.log('Error while calling getHotelTypeByID API', error);
    }
  };

  async function updateHotelType(id) {
    if (
      hotelType.hotelType === '' ||
      hotelType.status === '' ||
      hotelType.stateName === ''
    ) {
      return toast.error('Please fill properly !');
    }
    try {
      let result = await axios.put(
        `https://swagstay-db-new.onrender.com/hoteltypemaster/${id}`,
        hotelType
        // config
      );
      setIsOpen(false);
      setHotelType({ hotelType: '', status: '', stateName: '' });
      loadData();
      toast.success('Hotel Type Updated successfully!');
    } catch (err) {
      setIsOpen(false);

      setHotelType({ hotelType: '', status: '', stateName: '' });
      loadData();
      toast.error('Something went wrong!');
      console.log('Error while updating Hotel', err);
    }
  }
  const SEPARATOR = ',';
  const [gridRef, setGridRef] = useState(null);
  const [rows, setRows] = useState([]);
  const downloadBlob = (blob, fileName = 'Hoteltypemaster.xlsx') => {
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
  //   doc.save('Hoteltypemaster-master.pdf');
  // };
  // const loadData = useCallback(() => {
  //   fetch(DATASET_URL)
  //     .then((response) => response.json())
  //     .then((data) => setDataSource(data.Data));
  // }, []);
  return (
    <>
      <ToastContainer position='top-center' />
      <div className='flex justify-center'>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[40rem] lg:top-[5rem]'
            overlayClassName='overlay'
          >
            <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='flex flex-col gap-3 p-8'>
                <h1 className='text-xl font-semibold'>
                  Edit Hotel Type Master
                </h1>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Hotel Type
                  </label>
                  <input
                    type='text'
                    placeholder='Ex. Delux'
                    name={hotelType.hotelType}
                    defaultValue={hotelType.hotelType}
                    onChange={(e) => {
                      setHotelType({ ...hotelType, hotelType: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                  <div>
                    <span className='text-meta-1'>
                      {hotelType.hotelType.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill hotel Type</>
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
                    name={hotelType.status}
                    defaultValue={hotelType.status}
                    onChange={(e) => {
                      setHotelType({ ...hotelType, status: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  /> */}
                  <select
                    onChange={(e) => {
                      setHotelType({
                        ...hotelType,
                        status: e.target.value,
                      });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  >
                    <option value=''>Select</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                  <div>
                    <span className='text-meta-1'>
                      {hotelType.status.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill status</>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    State Name
                  </label>
                  <input
                    type='text'
                    placeholder='Ex. Maharashtra'
                    name={hotelType.stateName}
                    defaultValue={hotelType.stateName}
                    onChange={(e) => {
                      setHotelType({ ...hotelType, stateName: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                  <div>
                    <span className='text-meta-1'>
                      {hotelType.stateName.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill stateName</>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => updateHotelType(hotelType._id)}
                  className='w-full rounded-lg bg-meta-3 p-2 text-white'
                >
                  Update
                </button>
              </div>
              <button
                className='absolute top-2 right-2'
                onClick={() => {
                  setIsOpen(false);
                  setHotelType({ hotelType: '', status: '', stateName: '' });
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
                <h1 className='text-xl font-semibold'>Add Hotel Type Master</h1>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Hotel Type
                  </label>
                  <input
                    type='text'
                    placeholder='Ex. Deluxe'
                    name={hotelType.hotelType}
                    onChange={(e) => {
                      setHotelType({ ...hotelType, hotelType: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                  <div>
                    <span className='text-meta-1'>
                      {hotelType.hotelType.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill hotelType</>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    State Name
                  </label>
                  <input
                    type='text'
                    placeholder='Ex. Kerala'
                    name={hotelType.stateName}
                    onChange={(e) => {
                      setHotelType({
                        ...hotelType,
                        stateName: e.target.value,
                      });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                  <div>
                    <span className='text-meta-1'>
                      {hotelType.stateName.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill statename</>
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
                    name={hotelType.status}
                    onChange={(e) => {
                      setHotelType({ ...hotelType, status: e.target.value });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  /> */}
                  <select
                    onChange={(e) => {
                      setHotelType({
                        ...hotelType,
                        status: e.target.value,
                      });
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  >
                    <option value=''>Select</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>

                  <div>
                    <span className='text-meta-1'>
                      {hotelType.status.length > 0 ? (
                        <></>
                      ) : (
                        <> please fill status</>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={addHotelType}
                  className='w-full rounded-lg bg-meta-3 p-2 text-white'
                >
                  Save
                </button>
              </div>
              <button
                className='absolute top-2 right-2'
                onClick={() => {
                  setIsOpen2(false);
                  setHotelType({ hotelType: '', status: '', stateName: '' });
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
          <h1 className='text-2xl font-bold'>Hotel Type Master</h1>
          <button
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
              }
              setIsOpen2(true);
            }}
            className='bg-meta-3 p-2 px-4 text-white'
          >
            Add Hotel Type
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
          rowClass={rowClass}
          virtualizeColumns={true}
          rows={rows}
          handle={setGridRef}
        />
      </DefaultLayout>
    </>
  );
}

export default HotelTypeMaster;
