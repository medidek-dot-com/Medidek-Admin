import react, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { set } from 'date-fns';
function Addpromocode() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [allhotel, setallhotel] = useState([]);
  const [allcity, setallcity] = useState([]);

  useEffect(() => {
    getAllHotels();
    getAllcity();
  }, []);
  let [promocode, setpromocode] = useState({
    image: '',
    promoCodeName: '',
    promoCodeType: '',
    amountDiscount: '',
    noOfUser: '',
    perUserLimit: '',
    minOrderAmount: '',
    maxOrderAmount: '',
    availableFrom: '',
    expriration: '',
    privateAll: '',
    description: '',
    applyOn: '',
  });
  console.log(promocode);
  async function ApplyCode(e) {
    e.preventDefault();
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/promocode',
      promocode
    );
    console.log(result);
    if (result.status === 200) {
      alert('Apply successfully...');
      navigate('/web-master/promocodes');
    }
  }
  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  async function cloudimg(e) {
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/uploadimage',
      { image: e },
      config
    );
    console.log(result.data.val);
    setpromocode(() => {
      return { ...promocode, image: result.data.val };
    });
  }

  async function getAllHotels() {
    let result = await axios.get(
      'https://swagstay-db-new.onrender.com/Addhotel'
    );
    if (result.status === 200) {
      setallhotel(result.data.data);
    }
  }
  async function getAllcity() {
    let result = await axios.get(
      'https://swagstay-db-new.onrender.com/getcity'
    );
    if (result.status === 200) {
      setallcity(result.data.Data);
    }
  }
  const [code1, setcode1] = useState(false);
  const [code2, setcode2] = useState(false);

  return (
    <DefaultLayout>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[40rem] lg:top-[20rem]'
          overlayClassName='overlay'
        >
          <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-col gap-3 p-8'>
              <h1 className='text-xl font-semibold'>All Hotels</h1>
              <div className='h-40 w-60 overflow-y-scroll  border-[2px] p-2 font-bold'>
                {allhotel.map((val, i) => {
                  return (
                    <div className=' mt-1 rounded border-[1px] bg-gray p-1'>
                      {' '}
                      {i + 1 + ')'} {val.Hotel_name}
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              className='absolute top-2 right-2'
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </Modal>
      )}
      <form onSubmit={ApplyCode}>
        <div className='flex  w-full flex-col justify-between bg-white p-8'>
          <h1 className='text-xl font-bold text-black-2'>Add promo code</h1>
          <div>
            <h1 className=' font-bold text-meta-1'>
              Image(250*250) And Max Size(1MB)
            </h1>
            <div className='mt-3  h-40 w-40 border-[2px]'>
              <img src={promocode.image} className='h-full w-full'></img>
            </div>
            <div className='mt-4'>
              <input
                type='file'
                required
                onChange={(e) => {
                  cloudimg(e.target.files[0]);
                }}
              ></input>
            </div>
          </div>

          <div className=''>
            <div className='mt-6 flex  w-1/2 gap-4'>
              <div className='flex gap-2 '>
                <label name='apply'>City</label>
                <input
                  type='radio'
                  name='apply'
                  required
                  onClick={() => {
                    setcode1(false);
                    setcode2(true);
                  }}
                ></input>
              </div>
              <div className='flex gap-2'>
                <label name='apply'>Hotel</label>
                <input
                  type='radio'
                  required
                  name='apply'
                  onClick={() => {
                    setcode1(true);
                    setcode2(false);
                  }}
                ></input>
              </div>
              <div className='flex gap-2 '>
                <label name='apply'>All</label>
                <input
                  type='radio'
                  name='apply'
                  required
                  onClick={() => {
                    setcode1(false);
                    setcode2(false);
                  }}
                ></input>
              </div>
            </div>
            <div>
              {code1 ? (
                <div className='scrollbar-hide relative top-2 h-40 w-60  overflow-y-scroll rounded border-[2px] border-gray p-2 py-2 shadow-1  '>
                  {allhotel.map((val, i) => {
                    return (
                      <div
                        className=' mt-1 rounded border-[1px] border-gray bg-gray p-1 shadow-1 '
                        onClick={() => {
                          setcode1(false);
                          setcode2(false);
                        }}
                      >
                        {' '}
                        {i + 1 + ')'} {val.Hotel_name}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              {code2 ? (
                <div className='relative top-2 h-40  w-60 overflow-y-scroll rounded border-[2px] border-gray p-2  py-2 shadow-1'>
                  {allcity.map((val, i) => {
                    return (
                      <div
                        className=' mt-1 rounded border-[1px] border-gray bg-gray p-1 shadow-1'
                        onClick={() => {
                          setcode1(false);
                          setcode2(false);
                        }}
                      >
                        {' '}
                        {i + 1 + ')'}
                        {val.city}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className='mt-6 flex  justify-around gap-8'>
            <div>
              <label>
                Promo Code<span className='text-lg text-meta-1'>*</span>
              </label>
              <input
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                placeholder='Promocode'
                required
                onChange={(e) => {
                  setpromocode({ ...promocode, promoCodeName: e.target.value });
                }}
              />
            </div>
            <div>
              <label className='inline-block'>
                Promocode Type<span className='text-lg text-meta-1'>*</span>
              </label>
              <select
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-40 rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                onChange={(e) => {
                  setpromocode({ ...promocode, promoCodeType: e.target.value });
                }}
                required
              >
                <option value='Percentage'>Percentage</option>
                <option value='Amount'> Amount</option>
              </select>
            </div>
            <div>
              <label>
                Amount/Discount<span className='text-lg text-meta-1'>*</span>
              </label>
              <input
                required
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                placeholder='Amount/Discount'
                type='number'
                onChange={(e) => {
                  setpromocode({
                    ...promocode,
                    amountDiscount: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label>
                No Of User<span className='text-lg text-meta-1'>*</span>
              </label>
              <input
                required
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                placeholder='No Of User'
                type='number'
                onChange={(e) => {
                  setpromocode({ ...promocode, noOfUser: e.target.value });
                }}
              />
            </div>
            <div>
              <label>
                Per User Limit<span className='text-lg text-meta-1'>*</span>
              </label>
              <input
                required
                type='number'
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                placeholder='Per User Limit'
                onChange={(e) => {
                  setpromocode({ ...promocode, perUserLimit: e.target.value });
                }}
              />
            </div>
            <div>
              <label>
                Min Order Amount<span className='text-lg text-meta-1'>*</span>
              </label>
              <input
                required
                type='number'
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                placeholder='Min Order Amount'
                onChange={(e) => {
                  setpromocode({
                    ...promocode,
                    minOrderAmount: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className='mt-6 flex justify-between gap-8'>
            <div>
              <label>
                Max Discount Amount
                <span className='text-lg text-meta-1'>*</span>
              </label>
              <input
                required
                type='number'
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                placeholder='Max Discount Amount'
                onChange={(e) => {
                  setpromocode({
                    ...promocode,
                    maxOrderAmount: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <label>
                Available From<span className='text-lg text-meta-1'>*</span>
              </label>
              <input
                required
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                placeholder='Available From'
                type='date'
                onChange={(e) => {
                  setpromocode({ ...promocode, availableFrom: e.target.value });
                }}
              />
            </div>
            <div>
              <label>
                Expiration<span className='text-lg text-meta-1'>*</span>
              </label>
              <input
                required
                type='date'
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                placeholder='Expiration'
                onChange={(e) => {
                  setpromocode({ ...promocode, expriration: e.target.value });
                }}
              />
            </div>
            <div>
              <label>
                Private/All<span className='text-lg text-meta-1'>*</span>
              </label>
              <select
                required
                className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-40 rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
                onChange={(e) => {
                  setpromocode({ ...promocode, privateAll: e.target.value });
                }}
              >
                <option value='Private'>Private</option>
                <option value='Public'>Public</option>
              </select>
            </div>
          </div>
          <div className='mt-6'>
            <label>
              Description<span className='text-lg text-meta-1'>*</span>
            </label>
            <input
              required
              className='border-gray-300 focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm'
              placeholder='Description'
              onChange={(e) => {
                setpromocode({ ...promocode, description: e.target.value });
              }}
            />
          </div>
          <div className='mt-4'>
            <button
              className='rounded bg-meta-3 px-2 py-2 text-sm text-white'
              type='submit'
            >
              Add Promo code
            </button>
          </div>
        </div>
      </form>
    </DefaultLayout>
  );
}

export default Addpromocode;
