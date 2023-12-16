import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddAgentuser = () => {
  let [image, setImage] = useState([]);
  //   console.log(cloudimg);
  let [hotelUser, setHotelUser] = useState({
    personalName: '',
    DOB: '',
    contactNo: '',
    emailID: '',
    userName: '',
    Password: '',
    dateOfJoining: '',
    anniversaryDate: '',
    markUpComission: '',
    comission: '',
    minCuttOff: '',
    maxCuttOff: '',
  });
  console.log(hotelUser);
  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const navigate = useNavigate();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  async function addHotel(e) {
    e.preventDefault();
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/agentuser',
      hotelUser
    );
    console.log(result);
    if (result.status === 200) {
      toast('hotelUser added successfully');
      navigate('/agentuser');
    } else {
      toast('please try again');
    }
  }

  return (
    <>
      <DefaultLayout>
        <ToastContainer position='top-center'></ToastContainer>
        <form action='' method='post ' onSubmit={addHotel}>
          <h1 className='dark:text-gray-50 text-2xl font-bold md:text-4xl'>
            Add Agent User
          </h1>
          <div className='my-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-col gap-5.5 p-6.5'>
              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Personal Name<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    type='text'
                    name='name'
                    required
                    placeholder='Enter Personal Name'
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        personalName: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='flex w-1/2 flex-col gap-2'>
                  <label className='block text-black dark:text-white'>
                    DOB<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    type='date'
                    required
                    placeholder='mm/dd/yyyy'
                    id='dob'
                    name='dob'
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        DOB: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Contact No<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Contact No.'
                    type='number'
                    required
                    name='contactNo'
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        contactNo: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Email ID<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Email ID'
                    type='email'
                    required
                    name='emailID'
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        emailID: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    User Name<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Department'
                    type='text'
                    required
                    name='userName'
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        userName: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Password<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Designation'
                    type='text'
                    name='Password'
                    required
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        Password: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              {/* name='dateOfjoining'
                  required
                  onChange={(e) =>
                    setHotelUser({
                      ...hotelUser,
                      dateOfJoining: e.target.value,
                    })
                  } */}
              <div className='w-1/2'>
                <label className='mb-3 block text-black dark:text-white'>
                  Date of Joining<span className='text-meta-1'>*</span>:
                </label>
                <input
                  placeholder='Enter Username'
                  type='date'
                  required
                  name='dateOfjoining'
                  onChange={(e) =>
                    setHotelUser({
                      ...hotelUser,
                      dateOfJoining: e.target.value,
                    })
                  }
                  className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                />
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Anniversary Date<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Username'
                    type='date'
                    required
                    name='anniversaryDate'
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        anniversaryDate: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Markup commission<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Password'
                    type='number'
                    name='markUpComission'
                    required
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        markUpComission: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Commission<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Date Of Joining'
                    type='number'
                    required
                    name='comission'
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        comission: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Min cut oFF<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Anniversary Date'
                    type='number'
                    name='minCuttOff'
                    required
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        minCuttOff: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Max cut oFF<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Anniversary Date'
                    type='text'
                    name='maxCuttOff'
                    required
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        maxCuttOff: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>
            </div>
            <button
              onClick='submit'
              className='ml-7 mb-6 mt-0 bg-meta-3 p-2 px-4 text-white'
            >
              Save & Continue
            </button>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
};

export default AddAgentuser;
