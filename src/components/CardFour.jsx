import React from 'react';

const CardFour = (props) => {
  return (
    <div className='min-w-[15rem] rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='mt-2 mb-3 flex items-center justify-between'>
        <span className='rounded border border-meta-9 p-0.5 text-xs font-medium shadow-1'>
          {props.date}
        </span>
      </div>
      <div>
        <span className='text-lg font-semibold'>{props.title}</span>
        <h4 className='text-title-xs font-bold text-black dark:text-white'>
          {props.amount}
        </h4>
      </div>
    </div>
  );
};

export default CardFour;
