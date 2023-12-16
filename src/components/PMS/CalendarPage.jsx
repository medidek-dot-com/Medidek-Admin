import useDate from '../../hooks/useDate';
import Calendar from '../../features/calendar/Calendar';
import CalendarHeader from '../../features/calendarHeader';
import FormProvider from '../../contexts/FormContext';

// import RejectionModal from "../features/modal/RejectionModal";
import { useRef } from 'react';

function CalendarPage({ Inventorydate, price, roomType }) {
  const date = useDate();
  const canScrollMonthRef = useRef(true);

  const handleWheelScroll = (e) => {
    if (!canScrollMonthRef.current) return;
    canScrollMonthRef.current = false;

    if (e.deltaY > 0) {
      date.getNextMonth();
    } else {
      date.getPreviousMonth();
    }
    setTimeout(() => {
      canScrollMonthRef.current = true;
    }, 200);
  };

  return (
    <FormProvider>
      <main className='max-w-screen flex min-h-[40rem] min-w-[48rem] flex-col gap-1 shadow-sm'>
        <CalendarHeader date={date} Inventorydate={Inventorydate} />
        <Calendar
          date={date}
          Inventorydate={Inventorydate}
          price={price}
          roomType={roomType}
        />
      </main>
    </FormProvider>
  );
}
export default CalendarPage;
