import React from 'react';

const MonthAndYear = ({
  month,
  year,
  handlePreviousMonth,
  handleNextMonth,
}) => {
  return (
    <div className='flex items-center'>
      <div className='flex gap-4'>
        <button onClick={handlePreviousMonth}>
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
        <h2 className='ml-2 text-3xl font-bold leading-none'>
          {month}, {year}
        </h2>
        <button onClick={handleNextMonth}>
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MonthAndYear;
