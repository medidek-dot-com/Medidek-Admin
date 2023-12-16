import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Addcity = () => {
  let [cloudimg, setcloudimg] = useState([]);
  console.log(cloudimg);
  let [city, setcity] = useState({
    city: '',
    distance: '',
    country: '',
    activeStatus: '',
    stateName: '',
    cityImage: '',
  });
  console.log(city);
  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const navigate = useNavigate();
  async function addHotel(e) {
    e.preventDefault();
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/Addcity',
      city
    );
    if (result.status === 200) {
      toast('City added successfully');
      navigate('/cities');
    } else {
      toast('please try again');
    }
  }
  async function cityImageurl(e) {
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/uploadimage',
      { image: e },
      config
    );
    console.log(result.data.val);
    setcity(() => {
      return { ...city, cityImage: result.data.val };
    });
    console.log(city);
  }
  return (
    <>
      <DefaultLayout>
        <ToastContainer position='top-center'></ToastContainer>
        <form method='post' onSubmit={addHotel}>
          <div className='gap- mx-8 flex w-3/4 flex-col '>
            <h1 className='dark:text-gray-50 text-4xl font-bold'>Add City</h1>
            <div className=''>
              <div className=' mb-1 h-30 w-30 border-[1px] '>
                <img src={city.cityImage} className='h-full w-full'></img>
              </div>
              <input
                type='file'
                name='image'
                required
                onChange={(e) => {
                  cityImageurl(e.target.files[0]);
                }}
              />
            </div>
            {/* Hotel Company Info */}
            <div className='flex flex-col gap-3 '>
              <div className='flex gap-2'>
                <label
                  for='hotel-name'
                  className='text-md dark:text-gray-50 w-[20.5rem]'
                >
                  Name of City
                </label>
                <input
                  type='text'
                  id='hotel-name'
                  required
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                  onChange={(e) => {
                    setcity({ ...city, city: e.target.value });
                  }}
                />
              </div>
              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  <label
                    for='authsignatoryname'
                    className='text-md dark:text-gray-50 w-60'
                  >
                    Distance
                  </label>
                  <input
                    type='number'
                    required
                    id='authsignatoryname'
                    className='bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5'
                    onChange={(e) => {
                      setcity({ ...city, distance: e.target.value });
                    }}
                  />
                </div>
                <div className='flex gap-2'></div>
              </div>
              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  <label
                    for='mobileno'
                    className='text-md dark:text-gray-50 w-60'
                  >
                    Active Status
                  </label>

                  <select
                    required
                    value={city.activeStatus}
                    className='bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8  w-80 rounded border-2 p-1.5'
                    onChange={(e) => {
                      setcity({ ...city, activeStatus: e.target.value });
                    }}
                  >
                    <option value=''>SELECT STATUS...</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='mt-2 flex gap-2'>
              <label className='text-md dark:text-gray-50 w-60'>
                State Name
              </label>
              <input
                type='text'
                id='mobileno'
                required
                className='bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5'
                onChange={(e) => {
                  setcity({ ...city, stateName: e.target.value });
                }}
              />
            </div>

            <button
              type='submit'
              // style={{ backgroundColor: currentColor }}
              className='border-green-700 float-left w-fit rounded border-2 bg-black p-2 text-sm text-white'
            >
              Save & Continue
            </button>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
};

export default Addcity;
