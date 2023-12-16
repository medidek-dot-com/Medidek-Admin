import React, { useState, useEffect } from 'react';
import '@inovua/reactdatagrid-community/index.css';
import axios from 'axios';
import PmsLayout from '../../layout/PmsLayout';
import CardThree from '../../components/CardThree';
import CardFour from '../../components/CardFour';
import BookingTable from '../../components/BookingTable';

const Bookings = () => {
  // let [data, setdata] = useState([]);
  // useEffect(() => {
  //   getbookingdetails();
  // }, []);

  // async function getbookingdetails() {
  //   let result = await axios.post(
  //     `https://swagstay-db-new.onrender.com/getbookingdetails/${id}`
  //   );
  //   console.log(result);
  // }
  return (
    <PmsLayout>
      <h1 className='my-2 text-2xl font-bold'>Bookings</h1>

      <div className='my-6 box-border bg-meta-9 p-6 dark:bg-bodydark'>
        <div>
          <BookingTable />
        </div>
      </div>
    </PmsLayout>
  );
};

export default Bookings;
