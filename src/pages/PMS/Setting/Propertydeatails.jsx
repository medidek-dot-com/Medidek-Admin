import React, { useState, useEffect, useCallback } from 'react';
import PmsLayout from '../../../layout/PmsLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Propertydetails = () => {
  let { id } = useParams();
  let [selectedhotel, setselectedhotel] = useState([]);
  useEffect(() => {
    getHotelDetails();
  }, []);
  async function getHotelDetails() {
    let result = await axios.get(
      `https://swagstay-db-new.onrender.com/AddhotelfindbyID/${id}`
    );
    console.log(result);
    setselectedhotel(result.data.data);
  }
  return (
    <PmsLayout>
      <div className='flex h-full w-full  justify-evenly bg-white dark:bg-boxdark'>
        <div className=' box-border flex w-1/2 flex-col gap-8 p-7'>
          <div>
            <h1 className='text-2xl font-bold'>
              Hotel {selectedhotel.Hotel_name}
            </h1>
            <hr />
          </div>

          <div>
            <h1 className='text-2xl font-bold '>Your Address</h1>
            <p>{selectedhotel.Address}</p>
          </div>
          <div>
            <h1 className='text-2xl font-bold '>Landmark</h1>
            <p>near laxmi talkies, sitabuldi, nagpur, 440018</p>
          </div>
          <div>
            <h1 className='text-2xl font-bold '>Directions</h1>
            <p>657565656, Maharashtra</p>
          </div>
        </div>
        <div className='box-border w-1/2 p-7'>
          <h1 className='text-2xl font-bold '>Location Pin</h1>
          <div className='mt-8 h-4/5 w-full bg-black-2'>
            <iframe
              src={`${selectedhotel.Map_link}`}
              width='100%'
              height='100%'
            ></iframe>
          </div>
        </div>
      </div>
    </PmsLayout>
  );
};

export default Propertydetails;
