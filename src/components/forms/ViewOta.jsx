import React, { useEffect } from 'react';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const ViewOta = () => {
  let { id } = useParams();
  let [cloudimg, setcloudimg] = useState([]);
  const [image, setImage] = useState(null);

  console.log(cloudimg);
  let [ota, setOta] = useState({
    otaName: '',
    otaImage: cloudimg,
    otaRegistrationType: '',
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

    let result = await axios.put(
      `https://swagstay-db-new.onrender.com/otamaster/${id}`,
      ota
    );
    if (result.status === 200) {
      toast('OTA updated successfully');
      navigate('/otamaster');
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
  useEffect(() => {
    async function getDatabyid() {
      let result = await axios.get(
        `https://swagstay-db-new.onrender.com/otamaster/${id}`
      );
      console.log(result.data.result);
      setOta(result.data.result);
    }
    getDatabyid();
  }, []);

  return (
    <>
      <DefaultLayout>
        <ToastContainer position='top-center'></ToastContainer>
        <form method='POST' onSubmit={addHotel}>
          <h1 className='dark:text-gray-50 text-2xl font-bold md:text-4xl'>
            Update OTA
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
                  required
                  defaultValue={ota.otaImage}
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
                    value={ota.otaName}
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
                        required
                        id='registered'
                        name='otaRegistrationType'
                        defaultChecked={
                          ota.otaRegistrationType === 'registered'
                        }
                        value={'registered'}
                        onChange={(e) =>
                          setOta({
                            ...ota,
                            otaRegistrationType: e.target.value,
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
                        required
                        name='otaRegistrationType'
                        id='unregistered'
                        defaultChecked={
                          ota.otaRegistrationType == 'unregistered'
                        }
                        value={'unregistered'}
                        onChange={(e) =>
                          setOta({
                            ...ota,
                            registrationType: e.target.value,
                          })
                        }
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
                    value={ota.typeOfChannel}
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
                    value={ota.invoicingPattern}
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
                    required
                    name='otaCode'
                    value={ota.otaCode}
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
                    value={ota.otaGSTNo}
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
                    value={ota.getStateCode}
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
                    placeholder='Enter OTA PAN No.'
                    name='otaPANNo'
                    value={ota.otaPANNo}
                    required
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaPANNo: e.target.value,
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
                    name='otaTINNo'
                    required
                    value={ota.otaTINNo}
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otaTINNo: e.target.value,
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
                    value={ota.otaTCSNo}
                    required
                    type='text'
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
                    placeholder='Enter OTA User Id'
                    type='text'
                    required
                    value={ota.otauserId}
                    onChange={(e) =>
                      setOta({
                        ...ota,
                        otauserId: e.target.value,
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
                    placeholder='Enter OTA Password'
                    type='text'
                    required
                    value={ota.otaPassword}
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
                    value={ota.otaPublicKey}
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
                    required
                    value={ota.otaPrivateKey}
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
              type='submit'
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

export default ViewOta;
