import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Await, useNavigate, useParams } from 'react-router-dom';

const Updateswaguser = () => {
  let [image, setImage] = useState([]);
  //   console.log(cloudimg);
  let { id } = useParams();
  let [hotelUser, setHotelUser] = useState({
    personalName: '',
    DOB: '',
    contactNo: '',
    EmailID: '',
    department: '',
    Designation: '',
    password: '',
    userName: '',
    dateOfJoining: '',
    anniversaryDate: '',
    Admin_agent: '',
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
  useEffect(() => {
    async function getdatafromswaguser() {
      let result = await axios.get(
        `https://swagstay-db-new.onrender.com/swaguser/${id}`
      );
      console.log(result.data.result);
      setHotelUser(result.data.result);
    }
    getdatafromswaguser();
  }, []);
  async function addHotel(e) {
    e.preventDefault();
    let result = await axios.put(
      `https://swagstay-db-new.onrender.com/swaguser/${id}`,
      hotelUser
    );
    console.log(result);
    if (result.status === 200) {
      toast('hotelUser added successfully');
      navigate('/swaguser');
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
            Update Swag User
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
                    value={hotelUser.personalName}
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
                    value={hotelUser.DOB}
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
                    required
                    name='EmailID'
                    value={hotelUser.EmailID}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        EmailID: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Department<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Department'
                    type='text'
                    required
                    name='department'
                    value={hotelUser.department}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        department: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Designation<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Designation'
                    type='text'
                    name='Designation'
                    required
                    value={hotelUser.Designation}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        Designation: e.target.value,
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
                  User Name<span className='text-meta-1'>*</span>:
                </label>
                <input
                  placeholder='Enter Username'
                  type='text'
                  required
                  name='dateOfjoining'
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

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Password<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter password'
                    type='text'
                    required
                    name='anniversaryDate'
                    value={hotelUser.password}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        password: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Date of Joining<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter date'
                    type='date'
                    name='markUpComission'
                    required
                    value={hotelUser.dateOfJoining}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        dateOfJoining: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Anniversary<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Date Of Joining'
                    type='date'
                    required
                    name='comission'
                    value={hotelUser.anniversaryDate}
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
                    Admin/agent<span className='text-meta-1'>*</span>:
                  </label>
                  {/* <input
                    placeholder='Admin'
                    type='text'
                    name='Admin_agent'
                    required
                    value={hotelUser.Admin_agent}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        Admin_agent: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  /> */}
                  <select
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    placeholder='Admin'
                    name='Admin_agent'
                    required
                    defaultValue={hotelUser.Admin_agent}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        Admin_agent: e.target.value,
                      })
                    }
                  >
                    <option value=''>Select option</option>
                    <option value='ADMIN'>ADMIN</option>
                    <option value='AGENT'>AGENT</option>
                  </select>
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

export default Updateswaguser;
