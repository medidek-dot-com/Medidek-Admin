import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Link, NavLink } from 'react-router-dom';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import { FaEye } from 'react-icons/fa';

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
    name: 'CreateDate',
    header: 'Entry Date',
    minWidth: 120,
    defaultFlex: 1,
  },
  {
    name: 'AuthorImg',
    header: 'Author Image',
    render: ({ data }) => (
      <img src={data.AuthorImg} className='h-8 object-cover' />
    ),
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Banner',
    header: 'Banner Image',
    render: ({ data }) => (
      <img src={data.Banner} className='h-8 object-cover' />
    ),
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Title',
    header: 'Title',
    minWidth: 450,
    defaultFlex: 1,
  },
  {
    name: 'TagLine',
    header: 'Tag Line',
    minWidth: 350,
    defaultFlex: 1,
  },
  {
    name: 'Author',
    header: 'Author',
    minWidth: 150,
    defaultFlex: 1,
  },
  {
    name: 'Description',
    header: 'Description',
    minWidth: 120,
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
          <Button>Delete</Button>
        </div>
      );
    },
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
const dataSource = [
  {
    CreateDate: '08/04/2023',
    Banner:
      'https://www.swagstay.com/assets/images/blog/36ad3b771a57f5debcb3a05f56e8fcd1.jpeg',
    AuthorImg:
      'https://www.swagstay.com/assets/images/promo_img/3c478e9a9dcaddfb5454083cb6d0a574.jpeg',
    Title: 'Affordable & Safe Hotels For Unmarried Couples In Nashik',
    TagLine:
      'Nashik, A City In Maharashtra, India, Is Known For Its Rich History, Cultural Heritage, And Scenic B',
    Author: 'Swagstay Hotels',
    Description: '',
    Action: '',
  },
];

const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
const gridStyle = { minHeight: 550 };

const Blog = () => {
  // useEffect(() => {
  //   try {
  //     loadData();
  //   } catch (error) {
  //     console(error);
  //   }
  // }, []);

  // const DATASET_URL = 'https://swagstay-db-new.onrender.com/getcity';

  // const [dataSource, setDataSource] = useState([]);

  // const loadData = useCallback(() => {
  //   fetch(DATASET_URL)
  //     .then((response) => response.json())
  //     .then((data) => setDataSource(data.Data));
  // }, []);

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
  return (
    <>
      <DefaultLayout>
        <h1 className='text-2xl font-bold'>Blog View</h1>
        {/* <div className='flex gap-2'>
          <input type='radio' id='city' name='radio' value='City' />
          <label for='city'>City</label>
          <input type='radio' id='hotel' name='radio' value='Hotel' />
          <label for='hotel'>Hotel</label>
        </div> */}
        <div className='flex items-center gap-1'>
          <div className='text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2'>
            <label for='search' className='mr-5'>
              Search.:
            </label>
            <input
              type='search'
              id='search'
              placeholder='Search Blog'
              autoFocus
              className='text-boxdark outline-none focus:ring-0'
            />
          </div>
          <button className='bg-meta-3 p-4 py-1 text-white'>Search</button>
          <Link to='/cities/addCity'>
            <button className='bg-meta-3 p-4 py-1 text-white'>Add Blog</button>
          </Link>
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

export default Blog;
