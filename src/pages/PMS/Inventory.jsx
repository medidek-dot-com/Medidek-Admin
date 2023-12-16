import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import PmsLayout from '../../layout/PmsLayout';
import CalendarPage from '../../components/PMS/CalendarPage';

// Icons
import { FiUser, FiUsers } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
const Inventory = () => {
  let { id } = useParams();
  let [selectedhotel, setSelectedhotel] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [allDays, setAllDays] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const [selectRoomType, setSelectRoomType] = useState('');
  console.log(selectRoomType);
  // startDate: { type: Date, require: true, description: 'must be a String' },
  // endDate: { type: Date, require: true, description: 'must be String' },
  // numberOfRoomtoSell: {
  //   type: Number,
  //   required: true,
  //   description: 'must be Number',
  // },
  let [price, setPrice] = useState({
    hotel: id,
    startDate: '',
    endDate: '',
    numberOfDays: [],
    singlePersonRate: '',
    doublePersonRate: '',
    extraPersonRate: '',
    extraChildPersonRate: '',
    roomType: selectRoomType.selectRoomType,
  });
  console.log(price);

  const rateloop = () => {
    for (
      let i = new Date(price.startDate).getDate();
      i <= new Date(price.endDate).getDate();
      i++
    ) {
      console.log(i);
      var date = new Date(
        new Date(price.startDate).getFullYear(),
        new Date(price.startDate).getMonth(),
        i
      );
      console.log(date.toLocaleDateString());
      return date.toLocaleDateString();
    }
  };
  let [priceperdate, setPriceperdate] = useState({
    hotel: id,
    date: rateloop(),
    singlePersonRate: '',
    doublePersonRate: '',
    extraPersonRate: '',
    extraChildPersonRate: '',
    roomType: selectRoomType.selectRoomType,
  });
  console.log(priceperdate);

  console.log(rateloop());
  let [Inventorydate, setInventorydate] = useState({
    hotel: id,
    startDate: '',
    endDate: '',
    numberOfRoomtoSell: '',
  });

  console.log(Inventorydate);
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    getHotelDetails();
    getDateDetails();
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    setMinDate(formattedDate);
  }, []);
  async function getHotelDetails() {
    let result = await axios.get(
      `https://swagstay-db-new.onrender.com/AddhotelfindbyID/${id}`
    );
    console.log(result);
    setSelectedhotel(result.data.data);
  }
  async function getDateDetails() {
    let result = await axios.get(
      `https://swagstay-db-new.onrender.com/roominventory/${id}`
    );
    console.log(result.data.result);
    setInventorydate(result.data.result);
  }
  async function Setdatedeatils(e) {
    e.preventDefault();
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/roominventory',
      Inventorydate
    );
    console.log(result);
    if (result.status === 200) {
      setIsOpen2(false);
      window.location.reload();
      toast.success('Inventory added successfully!');
    } else {
      toast.error('Please enter details correctly!');
    }
  }
  async function postRates(e) {
    e.preventDefault();
    // let result = await axios.post(
    //   'http://localhost:5000/rateperdate',
    //   priceperdate
    // );
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/bulkrateInventory',
      price
    );
    console.log(result);
    if (result.status === 200) {
      setIsOpen(!open);
      window.location.reload();
      toast.success('Inventory added successfully!');
    } else {
      toast.error('Please enter details correctly!');
    }
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAllDaysChange = () => {
    setAllDays(!allDays);
    if (!allDays) {
      setSelectedDays([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]);
    } else {
      setSelectedDays([]);
    }
  };

  const handleDayChange = (event) => {
    const day = event.target.value;
    if (event.target.checked) {
      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, day]);
    } else {
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.filter((d) => d !== day)
      );
    }
    setAllDays(selectedDays.length === 6); // Check if all individual days are selected
  };

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return (
    <>
      <ToastContainer />
      <div className='flex justify-center'>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[30rem] lg:top-[5rem]'
            overlayClassName='overlay'
          >
            <div className='text-gray-800 relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-body'>
              <div className='flex flex-col gap-3 p-8 pb-2'>
                <h1 className='text-xl font-semibold'>
                  Bulk Rate Update: {selectRoomType.selectRoomType}
                </h1>
              </div>

              <hr />
              <form method='UPDATE' onSubmit={postRates} className='mx-8 my-3'>
                <div className='flex gap-5'>
                  <div className='flex flex-col gap-1 py-2'>
                    <label className='text-md font-semibold'>Start Date:</label>
                    <input
                      required
                      type='date'
                      name='startDate'
                      min={minDate}
                      defaultValue={price.startDate}
                      className='w-40 rounded border p-1 text-sm'
                      onChange={(e) => {
                        setPrice({
                          ...price,
                          startDate: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='flex flex-col gap-1 py-2'>
                    <label className='text-md font-semibold'>End Date:</label>
                    <input
                      required
                      type='date'
                      min={minDate}
                      name='endDate'
                      defaultValue={price.endDate}
                      className='w-40 rounded border p-1 text-sm'
                      onChange={(e) => {
                        setPrice({
                          ...price,
                          endDate: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='mt-2 flex gap-6'>
                  {/* <div className='flex flex-col items-start gap-1'>
                    <label htmlFor='days' className='text-md font-semibold'>
                      Days:
                    </label>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='monday'
                        name='days'
                        value='Monday'
                        onClick={() => {
                          setallDays(!allDays);
                        }}
                      />
                      <label htmlFor='monday'>All days</label>
                    </div>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='monday'
                        name='days'
                        value='Monday'
                        Checked={allDays}
                      />
                      <label htmlFor='monday'>Monday</label>
                    </div>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='Tuesday'
                        name='days'
                        value='Tuesday'
                      />
                      <label htmlFor='Tuesday'>Tuesday</label>
                    </div>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='Wednesday'
                        name='days'
                        value='Wednesday'
                      />
                      <label htmlFor='Wednesday'>Wednesday</label>
                    </div>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='Thursday'
                        name='days'
                        value='Thursday'
                      />
                      <label htmlFor='Thursday'>Thursday</label>
                    </div>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='Friday'
                        name='days'
                        value='Friday'
                      />
                      <label htmlFor='Friday'>Friday</label>
                    </div>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='Saturday'
                        name='days'
                        value='Saturday'
                      />
                      <label htmlFor='Saturday'>Saturday</label>
                    </div>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='Sunday'
                        name='days'
                        value='Sunday'
                      />
                      <label htmlFor='Sunday'>Sunday</label>
                    </div>
                  </div> */}
                  <div className='flex flex-col items-start gap-1'>
                    <label htmlFor='days' className='text-md font-semibold'>
                      Days:
                    </label>
                    <div className='flex gap-0.5'>
                      <input
                        type='checkbox'
                        id='allDays'
                        name='days'
                        value='All Days'
                        checked={allDays}
                        onChange={handleAllDaysChange}
                      />
                      <label htmlFor='allDays'>All days</label>
                    </div>
                    {days.map((day) => (
                      <div className='flex gap-0.5' key={day}>
                        <input
                          type='checkbox'
                          id={day}
                          name='days'
                          value={day}
                          checked={selectedDays.includes(day)}
                          onChange={handleDayChange}
                        />
                        <label htmlFor={day}>{day}</label>
                      </div>
                    ))}
                  </div>
                  <div className='flex flex-col items-end justify-between'>
                    <div className='flex gap-1'>
                      <label className='text-md flex items-center font-semibold'>
                        <FiUser /> (₹)
                      </label>
                      <input
                        type='number'
                        onKeyDown={(e) => {
                          e.key === '-' && e.preventDefault();
                        }}
                        required
                        name={price.singlePersonRate}
                        defaultValue={price.singlePersonRate}
                        className='w-40 rounded border p-1 text-sm'
                        min='1'
                        onChange={(e) => {
                          setPrice({
                            ...price,
                            singlePersonRate: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className='flex gap-1'>
                      <label className='text-md flex items-center font-semibold'>
                        <FiUsers /> (₹)
                      </label>
                      <input
                        type='number'
                        required
                        name='doublePersonRate'
                        defaultValue={price.doublePersonRate}
                        onKeyDown={(e) => {
                          e.key === '-' && e.preventDefault();
                        }}
                        className='w-40 rounded border p-1 text-sm'
                        min='2'
                        onChange={(e) => {
                          setPrice({
                            ...price,
                            doublePersonRate: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label className='text-md flex font-semibold'>
                        Extra Adult (₹)
                      </label>
                      <input
                        type='number'
                        required
                        onKeyDown={(e) => {
                          e.key === '-' && e.preventDefault();
                        }}
                        defaultValue={price.extraPersonRate}
                        name='extraPersonRate'
                        className='w-40  rounded border p-1 text-sm'
                        onChange={(e) => {
                          setPrice({
                            ...price,
                            extraPersonRate: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label className='text-md font-semibold'>
                        Extra Child (₹)
                      </label>
                      <input
                        onKeyDown={(e) => {
                          e.key === '-' && e.preventDefault();
                        }}
                        type='number'
                        required
                        defaultValue={price.extraChildPersonRate}
                        name='extraChildPersonRate'
                        className='w-40 rounded border p-1 text-sm'
                        onChange={(e) => {
                          setPrice({
                            ...price,
                            extraChildPersonRate: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className='my-3 mt-6 bg-meta-3 p-1 px-4 text-white'
                  type='submit'
                >
                  Update & Continue
                </button>
              </form>
              <button
                className='absolute top-2 right-2 text-meta-1'
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>
          </Modal>
        )}
        {isOpen2 && (
          <Modal
            isOpen={isOpen2}
            onRequestClose={() => setIsOpen2(false)}
            className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[30rem] lg:top-[5rem]'
            overlayClassName='overlay'
          >
            <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-body'>
              <div className='flex flex-col gap-3 p-8 pb-2'>
                <h1 className='text-xl font-semibold'>
                  Update Inventory: {selectedhotel.Hotel_type}
                </h1>
              </div>
              <hr />
              <form
                method='POST'
                onSubmit={Setdatedeatils}
                className='mx-8 my-3'
              >
                <div className='flex gap-6'>
                  <div className='flex flex-col gap-1 py-2'>
                    <label className='text-md font-semibold'>Start Date:</label>
                    <input
                      required
                      min={minDate}
                      type='date'
                      name='startDate'
                      className='rounded border p-1 text-sm'
                      onChange={(e) => {
                        setInventorydate({
                          ...Inventorydate,
                          startDate: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='flex flex-col gap-1 py-2'>
                    <label className='text-md font-semibold'>End Date:</label>
                    <input
                      required
                      type='date'
                      name='endDate'
                      min={minDate}
                      className='rounded border p-1 text-sm'
                      onChange={(e) => {
                        setInventorydate({
                          ...Inventorydate,
                          endDate: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-1 py-2'>
                  <label className='text-md font-semibold'>
                    Number of Rooms to Sell
                  </label>
                  <input
                    type='number'
                    required
                    name='numberOfRoomtoSell'
                    className='rounded border p-1 text-sm'
                    onKeyDown={(e) => {
                      e.key === '-' && e.preventDefault();
                    }}
                    defaultValue={
                      Inventorydate.numberOfRoomtoSell ||
                      selectedhotel.Total_rooms
                    }
                    onChange={(e) => {
                      setInventorydate({
                        ...Inventorydate,
                        numberOfRoomtoSell: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  className='my-3 bg-meta-3 p-1 px-4 text-white'
                  type='submit'
                >
                  Update & Continue
                </button>
              </form>
              <button
                className='absolute top-2 right-2 text-meta-1'
                onClick={() => setIsOpen2(false)}
              >
                X
              </button>
            </div>
          </Modal>
        )}
      </div>

      <PmsLayout>
        <div className='flex justify-between'>
          <h1 className='my-2 text-2xl font-bold'>Inventory Manager</h1>
        </div>

        <div className='flex items-end justify-between'>
          <div className='flex items-end gap-2'>
            <label htmlFor='roomtype' className='text-lg'>
              Room Type:
            </label>
            <select
              id='roomtype'
              defaultValue={selectedhotel.Hotel_type}
              onChange={(e) => {
                setSelectRoomType({ selectRoomType: e.target.value });
              }}
              required
              className='inline-block w-fit rounded border p-1 px-2 focus:outline-none'
            >
              <option hidden selected>
                Select Room Type
              </option>
              <option value={selectedhotel.Hotel_type}>
                {selectedhotel.Hotel_type}
              </option>
              <option value='classic'>Classic</option>
            </select>
          </div>
          <div className='flex h-fit gap-4'>
            <button
              onClick={() => setIsOpen(true)}
              className='bg-meta-3 p-2 px-4 text-white'
            >
              Rates
            </button>
            <button
              onClick={() => setIsOpen2(true)}
              className='bg-meta-3 p-2 px-4 text-white'
            >
              Inventory
            </button>
          </div>
        </div>
        <div className='my-6 box-border bg-meta-9 p-6 dark:bg-bodydark'>
          <CalendarPage
            Inventorydate={Inventorydate}
            price={price}
            roomType={selectRoomType.selectRoomType}
          />
        </div>
      </PmsLayout>
    </>
  );
};

export default Inventory;
