import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// local imports
import PmsLayout from '../../../layout/PmsLayout';
import RoomCard from '../../../components/PMS/RoomCard';

const CheckinRoom = () => {
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
  const [checkin, setCheckin] = useState(false);
  let [update, setupdate] = useState(false);
  let [room, setRoom] = useState({
    hotel: id,
    type: '',
    roomNo: 100,
    floor: '',
    checkin: '',
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
    let result = await axios.get(`http://localhost:5000/roomofhotels/${id}`);
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
  async function updateRoom(e) {
    e.preventDefault();
    let result = await axios.put(
      `http://localhost:5000/roomofhotels/${id}`,
      room
    );

    console.log(result);
    if (result.status === 200) setupdate(!update);
    setIsOpen(false);
  }
  return (
    <div className='overflow-y-scroll'>
      <div className='flex max-h-90 w-full max-w-[60rem] flex-col justify-between'>
        <div className='my-6 flex items-center justify-between'>
          <h1 className='text-4xl font-bold text-black dark:text-body'>
            Deluxe
          </h1>
          {/* <button
            onClick={() => setIsOpen(true)}
            className='rounded-md bg-meta-3 p-2 px-4 font-medium text-white'
          >
            Add Room
          </button> */}
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
                    click={(e) => {
                      e.preventDefault();
                      setCheckin(true);
                    }}
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
    </div>
  );
};

export default CheckinRoom;
