import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddBank = () => {
  let [cloudimg, setcloudimg] = useState([]);
  let [image, setImage] = useState([]);
  //   console.log(cloudimg);
  let [bankDetails, setbankDetails] = useState({
    bankName: '',
    bankAddress: '',
    bankBranch: '',
    accountHolderName: '',
    IFSCCode: '',
    accountNumber: '',
  });
  console.log(bankDetails);
  const navigate = useNavigate();
  async function addHotel(e) {
    e.preventDefault();
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/bankDetails',
      bankDetails
    );
    console.log(result);
    if (result.status === 200) {
      toast('bankDetails added successfully');
      navigate('/bankDetails');
    } else {
      toast('please try again');
    }
  }

  return (
    <>
      <DefaultLayout>
        <ToastContainer position='top-center'></ToastContainer>
        <form action='' method='post'>
          <h1 className='dark:text-gray-50 text-2xl font-bold md:text-4xl'>
            Update Bank Details
          </h1>
          <div className='my-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-col gap-5.5 p-6.5'>
              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Bank Name<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    type='text'
                    name='bankName'
                    required
                    placeholder='Enter Bank Name'
                    onChange={(e) =>
                      setbankDetails({
                        ...bankDetails,
                        bankName: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Bank Address<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    type='text'
                    name='bankAddress'
                    required
                    placeholder='Enter Bank Address'
                    onChange={(e) =>
                      setbankDetails({
                        ...bankDetails,
                        bankAddress: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Bank Branch<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='bankBranch'
                    type='text'
                    required
                    name='bankBranch'
                    onChange={(e) =>
                      setbankDetails({
                        ...bankDetails,
                        bankBranch: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Account Holder Name<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Account Holder Name'
                    type='text'
                    required
                    name='accountHolderName'
                    onChange={(e) =>
                      setbankDetails({
                        ...bankDetails,
                        accountHolderName: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    IFSC Code<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='IFSC Code'
                    type='text'
                    required
                    name='IFSCCode'
                    onChange={(e) =>
                      setbankDetails({
                        ...bankDetails,
                        IFSCCode: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Account Number<span className='text-meta-1'>*</span>:
                  </label>
                  <input
                    placeholder='Account Number'
                    type='number'
                    name='accountNumber'
                    required
                    onChange={(e) =>
                      setbankDetails({
                        ...bankDetails,
                        accountNumber: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>
            </div>
            <button
              onClick={addHotel}
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

export default AddBank;
