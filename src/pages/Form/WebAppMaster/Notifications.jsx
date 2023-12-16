import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
// import { saveAs } from 'file-saver';
// import PDFDocument from 'pdfkit';
// import { toBlob } from 'blob-util';
const Notifications = () => {
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
      name: 'entryDate',
      header: 'Entry Date',
      minWidth: 120,
      defaultFlex: 1,
    },
    {
      name: 'title',
      header: 'Title',
      minWidth: 150,
      defaultFlex: 1,
    },
    {
      name: 'hotel',
      header: 'Hotel/User',
      minWidth: 350,
      defaultFlex: 1,
    },
    {
      name: 'Notification',
      header: 'Notification',
      minWidth: 100,
      defaultFlex: 1,
      render: ({ data }) => {
        return (
          <div style={{ display: 'inline-block' }}>
            <button>
              <FaEye />
            </button>
          </div>
        );
      },
    },
    {
      name: 'Action',
      header: 'Action',
      minWidth: 130,
      defaultFlex: 1,
      render: ({ data }) => {
        return (
          <div style={{ display: 'inline-block' }}>
            <Button
              onClick={() => {
                Deletenotification(data._id);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const [newnotification, setnewNotification] = useState({
    title: '',
    hotel: '',
    notification: '',
  });
  useEffect(() => {
    loadData();
  }, []);
  const [dataSource, setDataSource] = useState([]);
  async function loadData() {
    let result = await axios.get(
      'https://swagstay-db-new.onrender.com/Notification'
    );
    console.log(result.data.result);
    setDataSource(result.data.result);
  }
  async function Deletenotification(id) {
    let result = await axios.delete(
      `https://swagstay-db-new.onrender.com/Notification/${id}`
    );
    if (result.status === 200) {
      alert('Deleted...');
      loadData();
    }
  }
  async function Addnotification(id) {
    if (
      newnotification.hotel === '' ||
      newnotification.title === '' ||
      newnotification.notification === ''
    ) {
      return toast.error('Please fill information');
    }
    let result = await axios.post(
      `https://swagstay-db-new.onrender.com/Notification`,
      newnotification
    );
    if (result.status === 200) {
      toast.success('Added');
      setnewNotification({ hotel: '', title: '', notification: '' });
      loadData();
      setIsOpen(false);
    }
  }

  // async function pdf() {
  //   // ... your existing logic for adding a notification ...

  //   // Generate and download PDF
  //   const doc = new PDFDocument();
  //   doc.text('Notification List', 100, 100);

  //   dataSource.forEach((item, index) => {
  //     const row = `${index + 1}. Title: ${item.title}, Hotel/User: ${
  //       item.hotel
  //     }`;
  //     doc.text(row, 100, 150 + index * 20);
  //   });

  //   doc.end();

  //   const blob = await toBlob(doc);
  //   saveAs(blob, 'notification_list.pdf');
  // }

  const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
  const gridStyle = { minHeight: 550 };
  console.log(dataSource);
  return (
    <>
      <DefaultLayout>
        <ToastContainer />
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
                    Title
                  </label>
                  <input
                    type='text'
                    placeholder='Title'
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    onChange={(e) => {
                      setnewNotification({
                        ...newnotification,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Hotel
                  </label>
                  <input
                    type='text'
                    placeholder='Hotel'
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    onChange={(e) => {
                      setnewNotification({
                        ...newnotification,
                        hotel: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label className='mb-1 block text-black dark:text-white'>
                    Notification
                  </label>
                  <input
                    type='text'
                    placeholder='Notification'
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    onChange={(e) => {
                      setnewNotification({
                        ...newnotification,
                        notification: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  className='w-full rounded-lg bg-meta-3 p-2 text-white'
                  onClick={Addnotification}
                >
                  Add
                </button>
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
        <h1 className='text-2xl font-bold'>Notification</h1>

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

          <button
            className='bg-meta-3 p-4 py-1 text-white'
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add Notification
          </button>
        </div>
        <div>
          <button
            className='bg-meta-3 p-4 py-1 text-white'
            onClick={() => {
              pdf;
            }}
          >
            PDF
          </button>
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

export default Notifications;
