import React, { useState, useEffect } from 'react';
import '@inovua/reactdatagrid-community/index.css';
import axios from 'axios';
import PmsLayout from '../../layout/PmsLayout';

const NewBookings = () => {
  return (
    <PmsLayout>
      <div className='flex  w-full flex-col gap-8 bg-white p-4'>
        <div className='flex w-full justify-between '>
          <div>
            <h1 className='text-xl font-semibold text-black-2'>
              Create Booking
            </h1>
          </div>
          <div className='rounded bg-black p-6 text-white'>
            <h1 className='text-xl'>Total charges</h1>
            <div className='flex justify-between gap-26 '>
              <div>0 RS</div>
              <div>
                <button className='rounded bg-meta-3 px-8 py-2'>
                  Save booking
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className=' mt-4 w-full rounded   bg-graydark  bg-opacity-10 p-4 py-3'>
          <div className='flex justify-between'>
            <div>
              <h1 className='text-xl font-semibold text-black-2'>
                Contact Details
              </h1>
            </div>
            <div className='flex'>
              <h1 className=' font-semibold text-black-2 '>Package Amount</h1>
              <input
                className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                placeholder='0'
              />
            </div>
          </div>

          <div>
            <div className='mt-8 flex gap-3'>
              <div className='w-2/6'>
                <div>
                  <label>Mobile</label>
                </div>
                <input
                  type='number'
                  placeholder='Mob no'
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                />
              </div>
              <div className='w-2/6'>
                <label>Name</label>
                <div></div>
                <input
                  type='text'
                  placeholder='Name'
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                />
              </div>
              <div className='w-2/6'>
                <div>
                  <label>Email</label>
                </div>
                <input
                  placeholder='email'
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                />
              </div>
            </div>
            <div className='mt-8 flex gap-3'>
              <div className='w-2/6'>
                <div>
                  {' '}
                  <label>Source:</label>
                </div>

                <input
                  type='text'
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                />
              </div>
              <div className='flex w-2/6 flex-col'>
                <div>
                  <label>ID Type:</label>
                  <input
                    type='text'
                    placeholder='ID Type'
                    className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                  />
                </div>
                <div>
                  <label>ID Number</label>
                  <input
                    type='number'
                    placeholder='ID Number'
                    className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                  />
                </div>
              </div>
              <div className='w-2/6'>
                <div>
                  <label>Remark</label>
                </div>
                <textarea placeholder='remark' className='border p-1' />
              </div>
            </div>
          </div>
        </div>

        <div className='rounded   bg-graydark bg-opacity-10 p-4'>
          <div>
            <h1 className='text-xl font-semibold text-black-2'>
              Billing Details
            </h1>
            <div className='mt-8 flex gap-3'>
              <div className='w-2/6'>
                <div>
                  <label>Company Name:</label>
                </div>
                <input
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                  placeholder='Company Name '
                />
              </div>
              <div className='w-2/6'>
                <label>GST Number:</label>
                <div></div>
                <input
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                  placeholder='GST Number'
                />
              </div>
              <div className='w-2/6'>
                <div>
                  <label>Company Address:</label>
                </div>
                <input
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                  placeholder='Company Address'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='rounded   bg-graydark bg-opacity-10 p-4'>
          <div>
            <h1 className='text-xl font-semibold text-black-2'>Stay Details</h1>
            <div className='mt-8 flex justify-between gap-3'>
              <div className='flex w-2/6 justify-center'>
                <div>
                  {' '}
                  <div>
                    <label>Check In:</label>
                  </div>
                  <input
                    className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                    placeholder='Check in '
                    type='date'
                  />
                </div>
              </div>
              <div>
                <div>
                  <label>Check out:</label>
                </div>
                <input
                  className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'
                  placeholder='Check out '
                  type='date'
                />
              </div>
              <div className='w-2/6'>
                <div>
                  {' '}
                  <label>Room type</label>
                </div>
                <select className='border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5'>
                  <option>Delux</option>
                  <option>Luxury</option>
                  <option>Classic</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button className='rounded-lg border py-2 px-8 text-black'>
            Add Room
          </button>
        </div>
      </div>
    </PmsLayout>
  );
};

export default NewBookings;
