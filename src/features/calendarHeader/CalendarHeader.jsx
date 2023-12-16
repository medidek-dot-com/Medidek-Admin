// import HeaderButton from './components/HeaderButton';
import TodayButton from './components/TodayButton';
import MonthAndYear from '../calendar/MonthAndYear';
//import Logo from "../../assets/images/"".svg";
// import { useFormModalContext } from '../../contexts/FormModalContext';
import react, { useState } from 'react';
import { FiLock, FiUnlock } from 'react-icons/fi';

function CalendarHeader({ date }) {
  // const formModal = useFormModalContext();
  // const { isAuthenticated, logout } = useAuthContext();
  const DISCORD_THREAD_URL =
    'discord://discord.com/channels/735923219315425401/1038482732633825442';

  const GH_ISSUES_URL = 'https://github.com/Caleb-Cohen/Together/issues';

  const linkToUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
    <header className='flex items-center justify-center border border-b-0 border-bodydark bg-gray-2 px-5 py-3 dark:border-boxdark dark:bg-strokedark'>
      {/* <section className='flex space-x-3'>
        <HeaderButton
          Icon={BsCalendarPlusFill}
          tooltipText='Add Event'
          onClick={formModal.handleOpen}
        />

        <HeaderButton
          Icon={MdGroupAdd}
          tooltipText='Join Team'
          onClick={() => linkToUrl(DISCORD_THREAD_URL)}
        />
      </section> */}
      <section className='mr-20 flex items-center space-x-3 '>
        <MonthAndYear
          month={date?.month}
          year={date?.year}
          handleNextMonth={date?.getNextMonth}
          handlePreviousMonth={date?.getPreviousMonth}
        />
        <TodayButton
          text={'Today'}
          tooltipText={'Jump to current month'}
          onClick={() => date.getCurrentMonth()}
        />
      </section>
      <LockSwitcher />
    </header>
  );
}
export default CalendarHeader;

const LockSwitcher = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <label
        htmlFor='toggle3'
        className='flex cursor-pointer select-none items-center'
      >
        <div className='relative'>
          <input
            type='checkbox'
            id='toggle3'
            className='sr-only'
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div
            className={`block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B] ${
              enabled &&
              '!bg-meta-1 text-white dark:!bg-meta-1 dark:text-meta-1'
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-body transition ${
              enabled &&
              '!right-1 !translate-x-full !bg-white text-meta-1 dark:!bg-white dark:text-meta-1'
            }`}
          >
            <span className={`hidden ${enabled && '!block'}`}>
              <FiLock />
            </span>
            <span className={`${enabled && 'hidden'}`}>
              <FiUnlock />
            </span>
          </div>
        </div>
      </label>
    </div>
  );
};
