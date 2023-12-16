import React from 'react';

const AllDays = () => {
  return (
    <div className='mt-4 grid grid-cols-7 shadow'>
      <div className='text-md pl-1 text-center font-bold'>Monday</div>
      <div className='text-md pl-1 text-center   font-bold '>Tuesday</div>
      <div className='text-md pl-1 text-center  font-bold '>Wednesday</div>
      <div className='text-md pl-1 text-center  font-bold '>Thursday</div>
      <div className='text-md pl-1 text-center  font-bold '>Friday</div>
      <div className='text-md pl-1 text-center  font-bold  text-[#E0835D]'>
        Saturday
      </div>
      <div className='text-md pl-1 text-center   font-bold  text-[#E0835D]'>
        Sunday
      </div>
    </div>
  );
};

export default AllDays;
