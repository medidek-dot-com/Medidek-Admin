import React from 'react';
import DayCard from './DayCard';

const DayCardList = ({ data, firstDayOfMonth }) => {
  // Use for generating empty divs to fill days from previous month
  const DAYS = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  const daysFromPrevMonth = Array.from(
    { length: DAYS[firstDayOfMonth] },
    (_, i) => i + 1
  );

  // Total number of squares in the calendar
  const totalDays = daysFromPrevMonth.length + data.length;
  // Number of rows in the calendar
  const numRows = Math.ceil(totalDays / 7);

  return (
    <div
      className={`grid h-auto w-full flex-grow grid-cols-7 grid-rows-${numRows} mt-1 gap-px bg-bodydark pt-px dark:bg-meta-4`}
    >
      {/* Empty div used for days that are not in the month */}
      {daysFromPrevMonth.map((day) => (
        <div
          key={`day-${day}`}
          className='text-md flex items-center justify-center'
        >
          ×
        </div>
      ))}

      {data.map((dayData) => (
        <DayCard key={dayData.date} {...dayData} />
      ))}
    </div>
  );
};

export default DayCardList;
