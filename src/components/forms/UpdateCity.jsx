import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCity = () => {
  const [cloudimg, setcloudimg] = useState([]);
  const [updateimage, setupdateimage] = useState(false);
  console.log(cloudimg);
  let [city, setCity] = useState({
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
  const { id } = useParams();
  const getCity = async (city_id) => {
    try {
      let response = await axios.get(
        `https://swagstay-db-new.onrender.com/getCity/${city_id}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Error while calling Get City API', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = await getCity(id);
      setCity(result.result);
      console.log(result.result);
    };
    fetchData();
  }, []);

  async function updateCity() {
    try {
      let result = await axios.put(
        `https://swagstay-db-new.onrender.com/updateCity/${id}`,
        city
        // config
      );
      toast.success('City Updated successfully!');
      console.log(result);
      if (result.status === 200) {
        navigate('/cities');
      }
    } catch (err) {
      toast.error('Something went wrong!');
      console.log('Error while updating Hotel', err);
    }
  }

  async function cityImageurl(e) {
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/uploadimage',
      { image: e },
      config
    );
    console.log(result.data.val);
    if (result.status === 200) {
      setupdateimage(!updateimage);
    }
    setCity(() => {
      return { ...city, cityImage: result.data.val };
    });
    console.log(city);
  }
  return (
    <>
      <DefaultLayout>
        <ToastContainer position='top-center' />
        <form action='' id='form' method='post'>
          <div className='mx-8 flex w-3/4 flex-col gap-3'>
            <h1 className='dark:text-gray-50 text-4xl font-bold'>
              Update City
            </h1>
            <div className=''>
              <div className=' mb-1 h-30 w-30 border-[1px] '>
                <img src={city.cityImage} className='h-full w-full'></img>
              </div>
              {updateimage ? (
                <>
                  {' '}
                  <input
                    type='file'
                    name='image'
                    onChange={(e) => {
                      cityImageurl(e.target.files[0]);
                    }}
                  />
                </>
              ) : (
                <div>
                  <button
                    className='border-green-700 float-left w-fit rounded border-2 bg-black p-2 text-sm text-white'
                    onClick={() => {
                      setupdateimage(!updateimage);
                    }}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
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
                  defaultValue={city.city}
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                  onChange={(e) => {
                    setCity({ ...city, city: e.target.value });
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
                    id='distance'
                    min='0'
                    onKeyDown={(e) => {
                      e.key === '-' && e.preventDefault();
                    }}
                    onkeypress='return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))'
                    defaultValue={city.distance}
                    className='bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5'
                    onChange={(e) => {
                      setCity({ ...city, distance: e.target.value });
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
                  {/* <input
                    type='text'
                    id='mobileno'
                    defaultValue={city.activeStatus}
                    pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                    className='bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5'
                    onChange={(e) => {
                      setCity({ ...city, activeStatus: e.target.value });
                    }}
                  /> */}
                  <select
                    value={city.activeStatus}
                    className='bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8  w-80 rounded border-2 p-1.5'
                    onChange={(e) => {
                      setCity({ ...city, activeStatus: e.target.value });
                    }}
                  >
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                </div>
              </div>
              <div className='flex gap-2'>
                <label
                  for='mobileno'
                  className='text-md dark:text-gray-50 w-60'
                >
                  State Name
                </label>
                <input
                  type='text'
                  id='mobileno'
                  defaultValue={city.stateName}
                  pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                  className='bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5'
                  onChange={(e) => {
                    setCity({ ...city, stateName: e.target.value });
                  }}
                />
              </div>
            </div>

            <button
              type='button'
              // style={{ backgroundColor: currentColor }}
              className='border-green-700 float-left w-fit rounded border-2 bg-black p-2 text-sm text-white'
              onClick={updateCity}
            >
              Save & Continue
            </button>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
};

export default UpdateCity;
