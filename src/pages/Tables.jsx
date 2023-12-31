import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
import TableTwo from '../components/TableTwo';
import TableThree from '../components/TableThree';
import TableFour from '../components/CustomerTable1';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Tables' />

      <div className='flex flex-col gap-10'>
        <TableOne />
        <TableTwo />
        <TableThree />
        <TableFour />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
