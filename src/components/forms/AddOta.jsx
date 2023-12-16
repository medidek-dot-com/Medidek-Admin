import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddOta = () => {
  let [cloudimg, setcloudimg] = useState('');
  let [image, setImage] = useState([]);
  //   console.log(cloudimg);
  let [ota, setOta] = useState({
    otaName: '',
    otaImage: cloudimg,
    registrationType: '',
    typeOfChannel: '',
    invoicingPattern: '',
    otaGSTNo: '',
    otaCode: '',
    otaStatusCode: '',
    otaPANNo: '',
    otaTINNo: '',
    otaTCSNo: '',
    otauserId: '',
    otaPassword: '',
    otaPublicKey: '',
    otaPrivateKey: '',
  });
  console.log(ota);
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
      'https://swagstay-db-new.onrender.com/otamaster',
      ota
    );
    console.log(result);
    if (result.status === 200) {
      toast('ota added successfully');
      navigate('/otamaster');
    } else {
      toast('please try again');
    }
  }

  async function otaImageurl(e) {
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/uploadimage',
      { image: e },
      config
    );
    console.log(result.data.val);
    setOta(() => {
      return { ...ota, otaImage: result.data.val };
    });
    // setOta(() => {
    //   return { ...ota, otaImage: result.data.val };
    // });
  }
  return (
    <>
      <DefaultLayout>
        <ToastContainer position='top-center'></ToastContainer>
        <form action='' method='post' onSubmit={addHotel}>
          <h1 className='dark:text-gray-50 text-2xl font-bold md:text-4xl'>
            Add OTA
          </h1>
          <div className='my-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-col gap-5.5 p-6.5'>
              <div>
                <label className='mb-3 block text-black dark:text-white'>
                  Image{' '}
                  <span className='text-lg text-meta-1'>
                    {'* (500 × 500 and <1mb)'}
                  </span>
                </label>
                <input
                  type='file'
                  name='otaImage'
                  onChange={(e) => otaImageurl(e.target.files[0])}
                  className='filetype mb-2'
                />
                <img alt='preview image' className='h-1/4 w-1/4' src={image} />
              </div>
              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA Name:
                  </label>
                  <input
                    type='text'
                    name='otaName'
                    required
                    placeholder='Enter OTA Name'
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaName: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='flex w-1/2 flex-col gap-2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA Registration Type:
                  </label>
                  <div className='flex gap-5 '>
                    <div className='flex gap-2'>
                      <input
                        type='radio'
                        value='Registered'
                        id='registered'
                        required
                        name='otaRegistrationType'
                        onChange={(e) =>
                          setOta({
                            ...ota,
                            registrationType: e.target.value,
                          })
                        }
                        className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                      />
                      <label for='registered' className=''>
                        Register
                      </label>
                    </div>
                    <div className='flex gap-2'>
                      <input
                        type='radio'
                        name='otaRegistrationType'
                        id='unregistered'
                        required
                        value='Unregistered'
                        className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                      />
                      <label for='unregistered' className=''>
                        Unregistered
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Type Of Channel:
                  </label>
                  <select
                    placeholder='Select Channel'
                    name='typeOfChannel'
                    required
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        typeOfChannel: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  >
                    <option value={'online'}>Online</option>
                    <option value={'offline'}>Offline</option>
                  </select>
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Invoicing Pattern:
                  </label>
                  <select
                    placeholder='Select Invoicing Pattern'
                    name='invoicingPattern'
                    required
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        invoicingPattern: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  >
                    <option value={'Hotel to Invoice OTA'}>
                      Hotel to Invoice OTA
                    </option>
                    <option value={'Hotel to Invoice OTA'}>
                      Hotel to Invoice OTA
                    </option>
                  </select>
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA Code:
                  </label>
                  <input
                    placeholder='Enter OTA Code'
                    name='otaCode'
                    required
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaCode: e.target.value,
                      })
                    }
                    type='text'
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA GST No:
                  </label>
                  <input
                    placeholder='Enter OTA GST No.'
                    type='text'
                    required
                    name='otaGSTNo'
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaGSTNo: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    GST State Code:
                  </label>
                  <select
                    placeholder='Select Channel'
                    name='gstStateCode'
                    required
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        getStateCode: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  >
                    <option value={'State Code'}>State Code</option>
                    <option value={'City Code'}>City Code</option>
                  </select>
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA PAN No:
                  </label>
                  <input
                    required
                    placeholder='Enter OTA PAN No.'
                    name='otaPANNo'
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        getPANNo: e.target.value,
                      })
                    }
                    type='text'
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA TIN No:
                  </label>
                  <input
                    placeholder='Enter OTA TIN No.'
                    required
                    name='otaTINNo'
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        getTINNo: e.target.value,
                      })
                    }
                    type='text'
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA TCS No:
                  </label>
                  <input
                    placeholder='Enter OTA TCS No.'
                    type='text'
                    required
                    name='otaTCSNo'
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaTCSNo: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA User Id:
                  </label>
                  <input
                    required
                    placeholder='Enter OTA User Id'
                    type='text'
                    name='otauserId'
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otauseId: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA Password:
                  </label>
                  <input
                    required
                    placeholder='Enter OTA Password'
                    type='text'
                    name='otaPassword'
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaPassword: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
              </div>

              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA Public Key:
                  </label>
                  <input
                    required
                    placeholder='Enter OTA Public Key'
                    type='text'
                    name='otaPublicKey'
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaPublicKey: e.target.value,
                      })
                    }
                    className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  />
                </div>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    OTA Private Key:
                  </label>
                  <input
                    placeholder='Enter OTA Private Key'
                    type='text'
                    name='otaPrivateKey'
                    required
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaPrivateKey: e.target.value,
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

export default AddOta;
