import React, { useState, useEffect, useCallback } from 'react';
import PmsLayout from '../../../layout/PmsLayout';
const Room = () => {
  return (
    <PmsLayout>
      <div>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h1 className='mt-4 ml-4  text-2xl font-bold text-black dark:text-body'>
            Add new User
          </h1>
          <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
            <h3 className='font-medium text-black dark:text-white'>
              Basic Details
            </h3>
          </div>
          <div className='flex flex-wrap gap-5.5 p-6.5'>
            <div className='w-5/12'>
              <label className='mb-3 block text-black dark:text-white'>
                Full Name
              </label>
              <input
                type='text'
                placeholder='  Full Name'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              />
            </div>

            <div className='w-5/12'>
              <label className='mb-3 block text-black dark:text-white'>
                Contact No*
              </label>
              <input
                type='text'
                placeholder=' Contact No'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              />
            </div>
            <div className='w-5/12'>
              <label className='mb-3 block font-medium text-black dark:text-white'>
                Email-ID*
              </label>
              <input
                type='text'
                placeholder=' Email-ID'
                disabled=''
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black'
              />
            </div>
          </div>

          <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
            <h3 className='mt-4 text-2xl font-bold text-black dark:text-body'>
              Role & Permission
            </h3>
          </div>

          <div className='flex flex-wrap gap-5.5 p-6.5'>
            <div className='w-5/12'>
              <label className='mb-3 block text-black dark:text-white'>
                Department*
              </label>
              {/* <input
                type=""
                placeholder=' Department*'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              /> */}
              <select className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                <option>Information technology</option>
                <option>Account</option>
                <option> HouseKeeping</option>
                <option>Front Desk</option>
                <option>Bank Office</option>
                <option>Marketing and Business Devlopment</option>
                <option>Finance</option>
                <option>Management</option>
              </select>
            </div>

            <div className='w-5/12'>
              <label className='mb-3 block text-black dark:text-white'>
                Designation*
              </label>
              {/* <input
                type='text'
                placeholder='Designation*'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              /> */}
              <select className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                <option>Select Designation</option>
                <option>Front Office Manager</option>
                <option> General Manager</option>
                <option>Owner</option>
                <option>Hotel Manager</option>
                <option>Receptionist</option>
                <option>GRA</option>
              </select>
            </div>
            <div className='w-5/12'>
              <label className='mb-3 block font-medium text-black dark:text-white'>
                User Name*
              </label>
              <input
                type='text'
                placeholder='User Name*'
                disabled=''
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black'
              />
            </div>
            <div className='w-5/12'>
              <label className='mb-3 block font-medium text-black dark:text-white'>
                Password*
              </label>
              <input
                type='password'
                placeholder='Password* '
                disabled=''
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black'
              />
              <button className='float-right mt-2 rounded-sm bg-meta-3 p-2 px-4 text-white'>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </PmsLayout>
  );
};

export default Room;
