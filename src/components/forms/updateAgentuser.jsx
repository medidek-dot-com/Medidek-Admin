import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const Updateagentuser = () => {
  let { id } = useParams();
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
  const navigate = useNavigate();
  useEffect(() => {
    async function getdatafromagent() {
      let result = await axios.get(
        `https://swagstay-db-new.onrender.com/agentuser/${id}`
      );
      console.log(result.data.result);
      setHotelUser(result.data.result);
    }
    getdatafromagent();
  }, []);
  async function addHotel(e) {
    e.preventDefault();
    let result = await axios.put(
      `https://swagstay-db-new.onrender.com/agentuser/${id}`,
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
            Update Agent User
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
                    value={hotelUser.personalName}
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
                    value={hotelUser.DOB}
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
                    value={hotelUser.contactNo}
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
                    value={hotelUser.emailID}
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
                    value={hotelUser.userName}
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
                    type='password'
                    name='Password'
                    required
                    value={hotelUser.Password}
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
                  value={hotelUser.dateOfJoining}
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
                    value={hotelUser.anniversaryDate}
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
                    type='number'
                    name='markUpComission'
                    value={hotelUser.markUpComission}
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
                    value={hotelUser.comission}
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
                    value={hotelUser.minCuttOff}
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
                    value={hotelUser.maxCuttOff}
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

export default Updateagentuser;
