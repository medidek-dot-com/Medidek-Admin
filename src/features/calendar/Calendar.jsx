import React, { useState, useEffect } from "react";
import axios from "axios";
// components
import AllDays from "./AllDays";
import DayCardList from "./DayCardList";
// Utility functions
// For getting real data
// import DataService from '../../services/dataService';
// import {
//   getMatchMonthAndYear,
//   getEventsByDayNumber,
// } from '../../utilities/calendar';
import { parse } from "date-fns";
import { useParams } from "react-router-dom";

const Status = {
    IDLE: "idle",
    LOADING: "loading",
    RESOLVED: "resolved",
    REJECTED: "rejected",
};

const Calendar = ({ date, roomType }) => {
    let { id } = useParams();
    const [selectedhotel, setselectedhotel] = useState([]);
    const [Inventorydate, setInventorydate] = useState({
        hotel: id,
        startDate: "",
        endDate: "",
        numberOfRoomtoSell: "",
    });

    useEffect(() => {
        getHotelDetails();
        getDateDetails();
        getBookings();
        getPriceDates();
        getPriceDetails();
    }, []);
    async function getDateDetails() {
        let result = await axios.get(
            `https://swagstay-db-new.onrender.com/Addhotel/${id}/roominventory`
        );
        console.log(
            result.data.result[result.data.result.length - 1].numberOfRoomtoSell
        );
        setInventorydate(result.data.result[result.data.result.length - 1]);
    }
    async function getHotelDetails() {
        let result = await axios.get(
            `https://swagstay-db-new.onrender.com/AddhotelfindbyID/${id}`
        );
        console.log(result);
        setselectedhotel(result.data.data);
    }
    // const { cache } = useEventsContext();
    // const [events, setEvents] = useState('');
    // status and errors or api calls

    const [bookings, setBookings] = useState([]);
    async function getBookings() {
        let result = await axios.get(
            `https://swagstay-db-new.onrender.com/getBookingDetails`
        );
        console.log(result.data.data);
        setBookings(result.data.data);
    }
    console.log(bookings);

    const [priceDates, setPriceDates] = useState([
        {
            hotel: id,
            startDate: "",
            endDate: "",
        },
    ]);
    const [prices, setPrices] = useState([
        {
            hotel: id,
            startDate: priceDates.startDate,
            endDate: priceDates.endDate,
            days: [],
            singlePersonRate: 0,
            doublePersonRate: 0,
            extraPersonRate: 0,
            extraChildPersonRate: 0,
        },
    ]);

    async function getPriceDates() {
        let result = await axios.get(
            `https://swagstay-db-new.onrender.com/addhotel/${id}/bulkrateInventory`
        );
        // console.log(result.data.result);
        setPriceDates(result.data.result[result.data.result.length - 1]);
        // console.log(priceDates);
    }

    async function getPriceDetails() {
        let result = await axios.post(
            `https://swagstay-db-new.onrender.com/bulkrateInventory/${id}`,
            { startDate: priceDates.startDate, endDate: priceDates.endDate }
        );
        console.log(result.data);
        // console.log(result.data.result[result.data.result.length - 1]);
        setPrices(result.data.result[result.data.result.length - 1]);
    }

    const [status, setStatus] = useState(Status.IDLE);
    const [error, setError] = useState(null);

    // const eventsInSelectedMonth = getMatchMonthAndYear(
    //   date.month,
    //   date.year,
    //   events
    // );

    // An array of days containing events for populating the calendar
    const days = Array.from({ length: date.daysInMonth }, (_, i) => {
        const currentDay = i + 1;

        //Creates dateObject using month spelled out in a string, currentDay and year
        const dateObject = parse(
            `${date.month}, ${currentDay}, ${date.year}`,
            "MMMM, dd, yyyy",
            new Date()
        );

        // Inventorydate.forEach((hotel) => {
        //   Inventorydate.hotel === selectedhotel._id ? hotel.Inventorydate : null;
        // });
        const hotelObject = async () => {};

        return {
            date: dateObject,
            rooms: Inventorydate,
            hotel: selectedhotel,
            booking: bookings,
            price: prices,
            priceDates: priceDates,
            roomType: roomType,
            // events: getEventsByDayNumber(currentDay, eventsInSelectedMonth),
        };
    });

    // useEffect(() => {
    //   // Fetch events from server
    //   const fetch = async () => {
    //     // Database data from server
    //     const response = await DataService.getAll(date.monthStart, date.monthEnd);
    //     return response.data;
    //   };
    //   fetch();
    //   // if the same call has already been made, do not repeat it
    //   // if (!cache.current.includes(date.monthStart)) {
    //   //   setStatus(Status.LOADING);
    //   //   cache.current.push(date.monthStart);
    //   //   fetch()
    //   //     .then((data) => {
    //   //       setEvents((prev) => [...prev, ...data]);
    //   //       setStatus(Status.RESOLVED);
    //   //     })
    //   //     .catch((error) => {
    //   //       setError(error.message);
    //   //       setStatus(Status.REJECTED);
    //   //     });
    //   // }
    // }, [setEvents, date.monthStart, date.monthEnd]);

    // while we are loading events, add the "animate-pulse" className to show skeleteon loading effect
    let classNames =
        "flex flex-grow h-full w-full overflow-auto text-gray-7 bg-gray-2 border border-t-0 border-bodydark dark:border-boxdark dark:bg-strokedark";
    if (status === Status.LOADING) {
        classNames += " animate-pulse";
    }
    console.log(days);
    return (
        <div className={classNames}>
            <div className="flex flex-grow flex-col">
                {/* render error message if there was an error fetching data */}
                {status === Status.REJECTED && <div>{error}</div>}
                <AllDays />
                <DayCardList data={days} firstDayOfMonth={date.firstDay} />
            </div>
        </div>
    );
};

export default Calendar;
