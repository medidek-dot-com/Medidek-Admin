import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BookingTable = (props) => {
  let [totalroom, settotalroom] = useState([]);
  useEffect(() => {
    getRooms();
  }, []);
  console.log(props.id);
  // async function getdetails() {
  //   let result = await axios.get(
  //     `https://swagstay-db-new.onrender.com/AddhotelfindbyID/${props.id}`
  //   );
  //   console.log(result.data.data.Total_rooms);
  //   settotalroom(result.data.data.Total_rooms);
  // }

  async function getRooms() {
    let result = await axios.get(
      `https://swagstay-db-new.onrender.com/roomofhotels/${props.id}`
    );

    console.log(result.data.result);
    settotalroom(result.data.result);
  }
  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <div className='max-w-full overflow-x-auto'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
              <th className='min-w-[120px]  text-center font-medium text-black dark:text-white xl:pl-11'>
                Room No
              </th>
              <th className='min-w-[150px] text-center font-medium text-black dark:text-white'>
                Guest Name / Particular
              </th>
              <th className='min-w-[120px]  text-center font-medium text-black  dark:text-white '>
                CheckIn
              </th>
              <th className='min-w-[150px]  text-center font-medium text-black dark:text-white'>
                CheckOut
              </th>
              <th className='min-w-[120px] text-center font-medium text-black dark:text-white'>
                Room Type
              </th>
              <th className='  min-w-[120px]font-medium px-4 text-center text-black dark:text-white'>
                PAX
              </th>
              <th className='  min-w-[120px] text-center  font-medium text-black dark:text-white'>
                Paid Amount
              </th>
              <th className=' min-w-[120px] text-center font-medium text-black dark:text-white'>
                Bill Amount
              </th>
              <th className=' min-w-[120px]  text-center font-medium text-black dark:text-white '>
                Balance Amount
              </th>
              <th className=' min-w-[120px]  text-center font-medium text-black dark:text-white'>
                Due Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {totalroom.length == 0 ? (
              <>
                <tr className='flex justify-center'>
                  <td>
                    <h1 className='my-10 text-xl'>No data for this Hotel ..</h1>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {totalroom.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td className='flex justify-center'>{val.roomNo}</td>
                      <td className='text-center'>{val.guestName}</td>
                      <td className='text-center'>{val.checkin}</td>
                      <td className='text-center'>{val.checkout}</td>
                      <td className='text-center'>{val.type}</td>
                      <td className='text-center'>{val.pax}</td>
                      <td className='text-center'>{val.paidAmount}</td>
                      <td className='text-center'>{val.balanceAmount}</td>
                      <td className='text-center'>{val.billAmount}</td>
                      <td className='text-center'>{val.due}</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
