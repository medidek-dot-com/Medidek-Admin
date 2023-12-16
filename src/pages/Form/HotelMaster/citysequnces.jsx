import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
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
    // render: ({ data }) => (
    //   <img src={data.cityImage} className='h-8 rounded-full object-cover' />
    // ),
    minWidth: 200,
    defaultFlex: 1,
  },
  {
    name: 'cityName',
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
    name: 'countryName',
    header: 'Country Name',
    minWidth: 200,
    defaultFlex: 1,
  },
];
const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

function CitySequence() {
  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console(error);
    }
  }, []);
  const DATASET_URL = 'https://swagstay-db-new.onrender.com/citysequence';

  const [dataSource, setDataSource] = useState([]);
  // const [columns] = useState(columns);

  const loadData = useCallback(() => {
    fetch(DATASET_URL)
      .then((response) => response.json())
      .then((data) => setDataSource(data.result));
  }, []);
  return (
    <>
      <DefaultLayout>
        <div className='m-2 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>City Sequences</h1>
          <button className='bg-meta-3 p-2 px-4 text-white'>Update</button>
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
}

export default CitySequence;
