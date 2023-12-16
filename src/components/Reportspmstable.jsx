import React from 'react';

const BookingTable = () => {
  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <div className='max-w-full overflow-x-auto'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
              <th className='min-w-[150px]  font-medium text-black dark:text-white xl:pl-11'>
                Booking ID
              </th>
              <th className='min-w-[150px]  font-medium text-black dark:text-white'>
                Guest Name
              </th>
              <th className='min-w-[120px]  font-medium text-black dark:text-white'>
                Status
              </th>
              <th className='min-w-[150px]  font-medium text-black dark:text-white'>
                Arrival/ Check in Date
              </th>
              <th className='min-w-[120px]  font-medium text-black dark:text-white'>
                Departure/ Check out Date
              </th>
              <th className=' font-medium text-black dark:text-white'>
                Room Category
              </th>
              <th className='  min-w-[120px] font-medium text-black dark:text-white'>
                Room No.
              </th>
              <th className=' min-w-[120px] font-medium text-black dark:text-white'>
                Room Revenue/ Others Bill
              </th>
              <th className=' min-w-[120px]  font-medium text-black dark:text-white'>
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>

            <tr>
              <td className='py-5 px-4 pl-9 xl:pl-11'>
                <p className='text-sm'>ID5678900</p>
              </td>
              <td>
                <p className='text-black dark:text-white'>Jan 13,2023</p>
              </td>
              <td>
                <p className='inline-flex rounded-full bg-warning bg-opacity-10  text-sm font-medium text-warning'>
                  Pending
                </p>
              </td>
              <td>
                <p className='text-black dark:text-white'>Jan 13,2023</p>
              </td>
              <td>
                <p className='text-black dark:text-white'>Jan 13,2023</p>
              </td>
              <td>
                <p className='text-black dark:text-white'>Delux</p>
              </td>
              <td>
                <p className='text-black dark:text-white'>349</p>
              </td>
              <td>
                <p className='text-black dark:text-white'>Delux</p>
              </td>
              <td>
                <p className='text-black dark:text-white'>5678</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
