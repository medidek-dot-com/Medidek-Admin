import { isSameDay, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
// import Event from './Event';
// import { useFormModalContext } from '../../contexts/FormModalContext';
import { useFormContext } from '../../contexts/FormContext';
import startOfDay from 'date-fns/startOfDay';
// import { parseISO, eachDayOfInterval } from 'date-fns';

const DayCard = ({ date, rooms, hotel, booking, price, roomType }) => {
  const { setFormData } = useFormContext();
  const [isOpen3, setIsOpen3] = useState(false);
  // const formModal = useFormModalContext();

  //Extracts month in long format from date object
  const month = format(date, 'MMMM');

  //Extracts day from date object
  const day = date.getDate();
  const formatedDate = format(date, 'yyyy-MM-dd');

  //Checks if current day matches date
  console.log(rooms);
  const sameDayCheck = isSameDay(startOfDay(date), new Date());
  const rsDate = rooms.startDate.split('T')[0];
  const reDate = rooms.endDate.split('T')[0];
  const psDate = price.startDate;
  const peDate = price.endDate;
  const theDate = peDate - psDate;
  // console.log(rooms.startDate.split('T')[0]);
  console.log(psDate, peDate);
  // console.log(format(date, 'yyyy-MM-dd'));
  const nDate = format(date, 'yyyy-MM-dd');

  // const theStartDate = parseISO('YYYY-MM-DD', rooms.startDate);
  // const theEndDate = parseISO('YYYY-MM-DD', rooms.endDate);
  // const dates = eachDayOfInterval({
  //   start: theStartDate,
  //   end: theEndDate,
  // });
  // console.log(dates);

  // const fnDate = () => {
  //   var superDate = [];
  //   for (var i = sDate; i <= eDate; i++) {
  //     superDate.push(i);
  //   }
  //   return superDate;
  // };

  // console.log(fnDate());

  // useEffect(() => {
  //   window.onclick(setIsOpen3(false));
  // }, []);

  // Sort events by startAt property
  // let sortedEvents = [...events].sort(
  //   (a, b) => new Date(a.startAt) - new Date(b.startAt)
  // );

  return (
    <>
      {isOpen3 && (
        <Modal
          isOpen={isOpen3}
          onRequestClose={() => setIsOpen3(false)}
          className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[30rem] lg:top-[5rem]'
          overlayClassName='overlay'
        >
          <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-body'>
            <div className='flex flex-col gap-3 p-8 pb-2'>
              <h1 className='text-xl font-semibold'>
                Rate Details: {day} {month}
              </h1>
            </div>
            <hr />
            <div className='flex w-80 flex-col gap-1 p-8 py-4'>
              <div className='flex justify-between'>
                <h4 className='text-md'>Present Inventory</h4>
                <p>{rooms.numberOfRoomtoSell}</p>
              </div>
              <div className='flex justify-between'>
                <h4 className='text-md'>Booked Inventory</h4>
                <p>{booking.length || 0}</p>
              </div>
              <div className='flex justify-between'>
                <h4 className='text-md'>Single</h4>
                <p>₹{price.singlePersonRate}</p>
              </div>
              <div className='flex justify-between'>
                <h4 className='text-md'>Double</h4>
                <p>₹{price.doublePersonRate}</p>
              </div>
              <div className='flex justify-between'>
                <h4 className='text-md'>Extra Adult</h4>
                <p>₹{price.extraPersonRate}</p>
              </div>
              <div className='flex justify-between'>
                <h4 className='text-md'>Extra Child</h4>
                <p>₹{price.extraChildPersonRate}</p>
              </div>
            </div>
            <button
              className='absolute top-2 right-2 rounded-full px-2 text-meta-1 hover:bg-meta-1 hover:text-white'
              onClick={() => setIsOpen3(false)}
            >
              X
            </button>
          </div>
        </Modal>
      )}

      <div
        className={`dark:border-boxy group relative flex h-28 flex-col bg-gray-2 dark:bg-bodydark dark:text-strokedark ${
          sameDayCheck
            ? 'shadow-[0_35px_60px_-15px_rgba(255,255,255, 0.9)] border-[3px] border-body '
            : 'shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
        }`}
        onClick={() => setIsOpen3(true)}
      >
        <span
          className={`block px-2 py-1 text-xs font-bold shadow-sm ${
            sameDayCheck && 'bg-body text-white'
          }`}
        >
          {day} {month}
          {console.log(format(date, 'dd-yyyy-MM'))}
        </span>

        {/* {rooms.map((rooms) => rooms.startDate == day && ( */}
        {/* {fnDate().forEach((i) => { */}
        <>
          {/* {console.log(i)};{console.log('day' + day)}; */}
          <div className='flex justify-between overflow-auto px-1 py-1 text-xs'>
            <p>{roomType || ''}</p>
            {formatedDate <= reDate && formatedDate >= rsDate ? (
              <p className='font-semibold'>
                {booking.length}/
                {hotel._id === rooms.hotel
                  ? rooms.numberOfRoomtoSell
                  : hotel.Total_rooms}
              </p>
            ) : (
              <p className='font-semibold'>
                0/
                {hotel._id === rooms.hotel
                  ? rooms.numberOfRoomtoSell
                  : hotel.Total_rooms}
              </p>
            )}
          </div>
        </>
        {formatedDate <= peDate && formatedDate >= psDate ? (
          <>
            <div className='flex justify-between overflow-auto px-1 py-1 text-xs'>
              <p>Single</p>
              <p>₹{hotel._id === price.hotel ? price.singlePersonRate : 0}</p>
            </div>
            <div className='flex justify-between overflow-auto px-1 py-1 text-xs'>
              <p>Double</p>
              <p>₹{hotel._id === price.hotel ? price.doublePersonRate : 0}</p>
            </div>
          </>
        ) : (
          <>
            <div className='flex justify-between overflow-auto px-1 py-1 text-xs'>
              <p>Single</p>
              <p>₹{hotel.price}</p>
            </div>
            <div className='flex justify-between overflow-auto px-1 py-1 text-xs'>
              <p>Double</p>
              <p>₹{hotel.price}</p>
            </div>
          </>
        )}
        {/* })} */}

        {/* <div className='flex flex-col px-1 py-1 overflow-auto'>
        {sortedEvents.map((event, i) => (
          <Event event={event} key={i} />
        ))}
      </div> */}

        {/* <button
          className='absolute bottom-0 right-0 mb-2 mr-2 hidden h-6 w-6 items-center justify-center rounded bg-meta-9 text-white hover:bg-meta-4 group-hover:flex dark:bg-meta-4'
          onClick={() => {
            let chosenDate = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            setFormData((prevFormData) => ({
              ...prevFormData,
              initialDate: chosenDate,
              finalDate: chosenDate,
            }));
          }}
        >
          <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button> */}
      </div>
    </>
  );
};

export default DayCard;
