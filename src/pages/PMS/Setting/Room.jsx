import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// local imports
import PmsLayout from '../../../layout/PmsLayout';
import RoomCard from '../../../components/PMS/RoomCard';

const Room = () => {
  const floors = [
    'Ground',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  let { id } = useParams();
  let [rooms, setRooms] = useState([]);
  let [update, setupdate] = useState(false);
  let [room, setRoom] = useState({
    hotel: id,
    type: '',
    roomNo: 100,
    floor: '',
  });
  console.log(room);
  let [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getRooms();
  }, []);
  useEffect(() => {
    getRooms();
  }, [update]);
  async function getRooms() {
    let result = await axios.get(
      `https://swagstay-db-new.onrender.com/roomofhotels/${id}`
    );
    console.log(result.data.result);
    setRooms(result.data.result);
  }
  async function Setdatedeatils(e) {
    e.preventDefault();
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/roominventory',
      Inventorydate
    );
    console.log(result);
  }
  async function addRoom(e) {
    e.preventDefault();
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/roomofhotels',
      room
    );

    console.log(result);
    if (result.status === 200) setupdate(!update);
    setIsOpen(false);
  }
  return (
    <PmsLayout>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[30rem] lg:top-[5rem]'
          overlayClassName='overlay'
        >
          <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-col gap-3 p-8 pb-2'>
              <h1 className='text-xl font-semibold'>Add Room</h1>
            </div>
            <hr />
            <form method='UPDATE' onSubmit={addRoom} className='mx-8 my-3'>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <label
                    htmlFor='roomCategory'
                    className='text-sm font-semibold'
                  >
                    Category
                  </label>
                  <select
                    name='type'
                    required
                    id='roomCategory'
                    className='rounded border p-1 text-sm'
                    onChange={(e) => {
                      setRoom({
                        ...room,
                        type: e.target.value,
                      });
                    }}
                  >
                    <option value='Classic'>Classic</option>
                    <option value='Deluxe'>Deluxe</option>
                  </select>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='roomNo' className='text-sm font-semibold'>
                    Room Number
                  </label>
                  <input
                    type='number'
                    required
                    id='roomNo'
                    name='roomNo'
                    onChange={(e) => {
                      setRoom({
                        ...room,
                        roomNo: e.target.value,
                      });
                    }}
                    className='rounded border p-1 text-sm'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='floor' className='text-sm font-semibold'>
                    Floor
                  </label>
                  <select
                    name='floor'
                    id='floor'
                    required
                    onChange={(e) => {
                      setRoom({
                        ...room,
                        floor: e.target.value,
                      });
                    }}
                    className='max-h-20 overflow-y-scroll rounded border p-1 text-sm'
                  >
                    {floors.map((floor) => {
                      return (
                        <option value={`${floor}-Floor`}>
                          {floor}-{'Floor'}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <button
                className='my-3 bg-meta-3 p-1 px-4 text-white'
                type='submit'
              >
                Add Room
              </button>
            </form>
            <button
              className='absolute top-2 right-2 text-meta-1'
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
        </Modal>
      )}
      <div className='flex w-full flex-col justify-between'>
        <div className='my-6 flex items-center justify-between'>
          <h1 className='text-4xl font-bold text-black dark:text-body'>
            Deluxe
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className='rounded-md bg-meta-3 p-2 px-4 font-medium text-white'
          >
            Add Room
          </button>
        </div>
        <div className='flex flex-wrap justify-center gap-4 rounded bg-meta-9 py-16 dark:bg-bodydark'>
          {rooms.map((room) => {
            if (room.type === 'Deluxe')
              return (
                <>
                  <RoomCard
                    floor={room.floor}
                    roomType={room.type}
                    roomNo={room.roomNo}
                  />
                </>
              );
          })}
        </div>
      </div>

      <div className='flex w-full flex-col justify-between'>
        <div className='my-6 flex justify-between'>
          <h1 className='text-4xl font-bold text-black dark:text-body'>
            Classic
          </h1>
          {/* <button
            onClick={() => setIsOpen(true)}
            className=' rounded-md bg-meta-3 p-2 font-bold text-white'
          >
            Add Room
          </button> */}
        </div>
        <div className='flex flex-wrap justify-center gap-4 rounded bg-meta-9 py-16 dark:bg-bodydark'>
          {rooms.map((room) => {
            if (room.type === 'Classic')
              return (
                <>
                  <RoomCard
                    floor={room.floor}
                    roomType={room.type}
                    roomNo={room.roomNo}
                  />
                </>
              );
          })}
        </div>
      </div>
    </PmsLayout>
  );
};

export default Room;
