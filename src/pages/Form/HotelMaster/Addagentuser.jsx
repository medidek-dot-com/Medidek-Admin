import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import { useNavigate, useNavigation, Link } from 'react-router-dom';
import { AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai';
function Agentuser() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
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
      header: 'Name',
      // render: ({ data }) => (
      //   <img src={data.cityImage} className='h-8 rounded-full object-cover' />
      // ),
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: '',
      header: 'Admin',
      minWidth: 200,
      render: ({ data }) => {
        return <div>ADMIN</div>;
      },
      defaultFlex: 1,
    },
    {
      name: '',
      header: 'Identity No',
      minWidth: 200,
      render: ({ data }) => {
        return <div>{'AGENT' + data._id.slice(0, 6)}</div>;
      },
      defaultFlex: 1,
    },
    {
      name: 'userName',
      header: 'User Name',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'userName',
      header: 'Wallet Amount',
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: '',
      header: 'Active Status',
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
      name: '',
      header: 'Action',
      minWidth: 50,
      render: ({ data }) => {
        return (
          <div style={{ display: 'inline-block' }}>
            <Button
              onClick={() => {
                navigate(`/agentuser/updateAgentuser/${data._id}`);
              }}
            >
              Edit
            </Button>
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
  const DATASET_URL = 'https://swagstay-db-new.onrender.com/agentuser';

  const [dataSource, setDataSource] = useState([]);
  // const [columns] = useState(columns);

  const loadData = useCallback(() => {
    fetch(DATASET_URL)
      .then((response) => response.json())
      .then((data) => setDataSource(data.result));
  }, []);
  const SEPARATOR = ',';
  const [gridRef, setGridRef] = useState(null);
  const [rows, setRows] = useState([]);
  const downloadBlob = (blob, fileName = 'agentuser.xlsx') => {
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
  //   doc.save('agentuser-admin.pdf');
  // };
  return (
    <>
      <div className='flex justify-center'>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[40rem] lg:top-[5rem]'
          overlayClassName='overlay'
        >
          <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-col gap-3 p-8'>
              <h1 className='text-xl font-semibold'>Edit Agent User</h1>
              <div>
                <label className='mb-1 block text-black dark:text-white'>
                  Hotel Type
                </label>
                <input
                  type='text'
                  placeholder='Ex. Delux'
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                />
              </div>
              <div>
                <label className='mb-1 block text-black dark:text-white'>
                  Status
                </label>
                <input
                  type='text'
                  placeholder='Status'
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                />
              </div>
              <div>
                <label className='mb-1 block text-black dark:text-white'>
                  State Name
                </label>
                <input
                  type='text'
                  placeholder='Ex. Maharashtra'
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                />
              </div>
              <button className='w-full rounded-lg bg-meta-3 p-2 text-white'>
                Update
              </button>
            </div>
            <button
              className='absolute top-2 right-2'
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
        </Modal>
      </div>
      <DefaultLayout>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Agentuser</h1>
          <Link to={'/agentuser/addAgentuser'}>
            {' '}
            <button className='bg-meta-3 p-2 px-4 text-white'>
              Add Agent User
            </button>
          </Link>
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

export default Agentuser;
