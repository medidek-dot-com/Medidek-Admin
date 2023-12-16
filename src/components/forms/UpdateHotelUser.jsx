import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateHoteluser = () => {
  let [cloudimg, setcloudimg] = useState([]);
  let [image, setImage] = useState([]);
  //   console.log(cloudimg);
  let [hotelUser, setHotelUser] = useState({
    personalName: '',
    emailId: '',
    contactName: '',
    DOB: '',
    department: '',
    designation: '',
    secondaryHotel: '',
    userName: '',
    password: '',
    dateOfJoining: '',
    AnniversaryDate: '',
  });

  console.log(hotelUser);

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
  const { id } = useParams();
  const getHotel = async (ab) => {
    try {
      let response = await axios.get(
        `https://swagstay-db-new.onrender.com/hoteluser/${ab}`
      );
      console.log(response.data.result);

      return response.data;
    } catch (error) {
      console.log('Error while calling Get Hotel API', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = await getHotel(id);
      setHotelUser(result.result);
      console.log(result.result);
    };
    fetchData();
  }, []);

  async function updateHotelUser(e) {
    e.preventDefault();
    try {
      let result = await axios.put(
        `https://swagstay-db-new.onrender.com/hoteluser/${id}`,
        hotelUser
        // config
      );
      toast.success('Hotel Updated Successfully!');
      console.log(result);
    } catch (err) {
      toast.error('Something went wrong!');
      console.log('Error while updating Hotel', err);
    }
  }

  return (
    <>
      <DefaultLayout>
        <ToastContainer position='top-center'></ToastContainer>
        <form action='' method='post' onSubmit={updateHotelUser}>
          <h1 className='dark:text-gray-50 text-2xl font-bold md:text-4xl'>
            Update Hotel User
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
                    name='personalName'
                    value={hotelUser.personalName}
                    defaultValue={hotelUser.personalName}
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
                  <label className='mb-3 block text-black dark:text-white'>
                    DOB<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    type='date'
                    required
                    placeholder='mm/dd/yyyy'
                    defaultValue={hotelUser.DOB}
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
                    name='contactName'
                    defaultValue={hotelUser.contactName}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        contactName: e.target.value,
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
                    name='emailId'
                    defaultValue={hotelUser.emailId}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        emailId: e.target.value,
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
                    defaultValue={hotelUser.department}
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
                    defaultValue={hotelUser.designation}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        designation: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='w-1/2'>
                <label className='mb-3 block text-black dark:text-white'>
                  Secondary Hotel(S)<span className='text-meta-1'>*</span>:
                </label>
                <select
                  placeholder='Select Secondary Hotels'
                  name='secondaryHotel'
                  required
                  defaultValue={hotelUser.secondaryHotel}
                  onChange={(e) =>
                    setHotelUser({
                      ...hotelUser,
                      secondaryHotel: e.target.value,
                    })
                  }
                  className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                >
                  <option value={'Swagstay'}>Swagstay</option>
                  <option value={'other'}>Other</option>
                </select>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Username<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Username'
                    type='text'
                    required
                    name='username'
                    defaultValue={hotelUser.userName}
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
                    placeholder='Enter Password'
                    type='password'
                    name='password'
                    defaultValue={hotelUser.password}
                    required
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        password: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Date of Joining<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Date Of Joining'
                    type='date'
                    required
                    name='dateOfJoining'
                    defaultValue={hotelUser.dateOfJoining}
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        dateOfJoining: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Anniversary Date<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Enter Anniversary Date'
                    type='date'
                    name='AnniversaryDate'
                    defaultValue={hotelUser.AnniversaryDate}
                    required
                    onChange={(e) =>
                      setHotelUser({
                        ...hotelUser,
                        AnniversaryDate: e.target.value,
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

export default UpdateHoteluser;
