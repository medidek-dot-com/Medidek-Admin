import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@inovua/reactdatagrid-community/packages/Button';
// import AccordionRenderer from '../components/AccordionRenderer';
// import { ButtonGroup } from './UiElements/Buttons';

const Promocodes = () => {
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
      header: 'Created Date',
      minWidth: 250,
      defaultFlex: 1,
    },
    {
      name: 'image',
      header: 'City Image',
      render: ({ data }) => (
        <img src={data.image} className='h-8 object-cover' />
      ),
      minWidth: 200,
      defaultFlex: 1,
    },
    {
      name: 'promoCodeName',
      header: 'Promocode Name',
      minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: 'privateAll',
      header: 'Public/Private',
      minWidth: 250,
      defaultFlex: 1,
    },
    {
      name: 'promoCodeType',
      header: 'Type',
      minWidth: 250,
      defaultFlex: 1,
    },
    {
      name: 'amountDiscount',
      header: 'Discount',
      minWidth: 150,
      defaultFlex: 1,
    },
    {
      name: 'Used',
      header: 'Used',
      minWidth: 150,
      render: ({ data }) => {
        return (
          <div>
            <Button
              onClick={() => {
                Deletepromocode(data._id);
              }}
            >
              DELETE
            </Button>
          </div>
        );
      },
      defaultFlex: 1,
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    loaddata();
  }, []);
  async function loaddata() {
    let result = await axios.get(
      'https://swagstay-db-new.onrender.com/promoCode'
    );
    console.log(result.data.result);
    setDataSource(result.data.result);
  }
  async function Deletepromocode(id) {
    let result = await axios.delete(
      `https://swagstay-db-new.onrender.com/promoCode/${id}`
    );
    if (result.status === 200) {
      alert('Deleted...');
      loaddata();
    }
  }
  const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
  const gridStyle = { minHeight: 550 };

  return (
    <>
      <DefaultLayout>
        <div className='mb-2 flex justify-between'>
          <h1 className='text-2xl font-bold'>Promocodes</h1>
          <Link to={'/web-master/addpromocodes'}>
            <button className='bg-meta-3 px-2 py-2 text-sm text-white'>
              Add Promocode
            </button>
          </Link>
        </div>
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}
        {/* <ButtonGroup /> */}
        <ReactDataGrid
          idProperty='serial'
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

export default Promocodes;
