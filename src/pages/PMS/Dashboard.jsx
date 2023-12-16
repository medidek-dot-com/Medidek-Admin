import React, { useState, useEffect } from "react";
import "@inovua/reactdatagrid-community/index.css";
import axios from "axios";
import PmsLayout from "../../layout/PmsLayout";
import CardThree from "../../components/CardThree";
import CardFour from "../../components/CardFour";
import BookingTable from "../../components/BookingTable";
import { Link, useParams } from "react-router-dom";

const Dashboard = () => {
    let { id } = useParams();
    const [active, setActive] = useState(false);
    const columns = [
        {
            name: "_index",
            header: "#",
            width: 50,
            defaultWidth: 50,
            render: ({ data, rowIndex }) => rowIndex + 1,
            sortable: false,
            resizable: false,
            frozen: true,
        },
        {
            name: "created_Date",
            header: "Entry Date",
            minWidth: 120,
            defaultFlex: 1,
        },
        { name: "name", header: "Name", minWidth: 100, defaultFlex: 2 },
        { name: "gender", header: "Gender", minWidth: 100, defaultFlex: 2 },
        { name: "mobile", header: "Mobile No.", minWidth: 100, defaultFlex: 1 },
        {
            name: "",
            header: "Status",
            minWidth: 100,
            defaultFlex: 1,
            value: "App",
        },
    ];
    const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
    const gridStyle = { minHeight: 550 };
    let [live, setlivedata] = useState({
        livehoteldata: "",
        liveguestdetails: "",
        totalbooking: "",
    });
    const [rows, setRows] = useState([]);
    let len;
    //   useEffect(() => {
    //     getTotalhotels();
    //     loadData();
    //     loadNewData();
    //     setRows(customerDataSource);
    //   }, []);

    const DATASET_URL = "https://swagstay-db-new.onrender.com/guest";

    const [customerDataSource, setCustomerDataSource] = useState([]);
    async function getTotalhotels() {
        let tottalhotels = await axios.get(
            "https://swagstay-db-new.onrender.com/Addhotel"
        );
        console.log(tottalhotels.data.data.length);
        live.livehoteldata = tottalhotels.data.data.length;
    }

    const loadData = () => {
        const newDataSource = async () => {
            return fetch(DATASET_URL).then(async (response) => {
                return response.json().then((data) => {
                    console.log(data.data.length);
                    live.liveguestdetails = data.data.length;
                    return data.data;
                });
            });
        };

        setCustomerDataSource(newDataSource);
    };

    console.log(customerDataSource);
    // console.log(loadData.length);
    // console.log(columns.cre);

    // Bookings

    const [bookings, setBookings] = useState("");
    //   useEffect(() => {
    //     getRooms();
    //   }, []);
    async function getRooms() {
        let result = await axios.post(
            `https://swagstay-db-new.onrender.com/getbookingdetailscount/${id}`
        );
        console.log(result.data.data, "#######");
        setBookings(result.data.data);
    }

    const bookingColumns = [
        {
            name: "_index",
            header: "#",
            width: 50,
            defaultWidth: 50,
            render: ({ rowIndex }) => rowIndex + 1,
            sortable: false,
            resizable: false,
            frozen: true,
        },
        {
            name: "created_Date",
            header: "Entry Date",
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "VerifiedStatus",
            header: "Verified Status",
            minWidth: 150,
            defaultFlex: 1,
        },
        {
            name: "CheckinStatus",
            header: "Checkin Status",
            minWidth: 150,
            defaultFlex: 1,
        },
        {
            name: "HotelID",
            header: "Hotel ID",
            minWidth: 100,
            render: ({ data }) => data.Bookhotel._id,
            defaultFlex: 1,
        },
        {
            name: "_id",
            header: "Booking ID",
            minWidth: 100,
            render: ({ data }) => data._id,
            defaultFlex: 1,
        },
        {
            name: "HotelName",
            header: "Hotel Name",
            minWidth: 250,
            render: ({ data }) => data.Bookhotel.Hotel_name,
            defaultFlex: 1,
        },
        {
            name: "CityName",
            header: "City Name",
            minWidth: 250,
            render: ({ data }) => data.Bookhotel.City,
            defaultFlex: 1,
        },
        {
            name: "Roomtype",
            header: "Room Type",
            minWidth: 150,
            render: ({ data }) => data.selectedinfo.Roomtype,
            defaultFlex: 1,
        },
        {
            name: "TotalRooms",
            header: "Total Rooms",
            minWidth: 130,
            render: ({ data }) => data.selectedinfo.rooms,
            defaultFlex: 1,
        },
        {
            name: "TotalNights",
            header: "Total Nights",
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "TotalGuests",
            header: "Total Guests",
            minWidth: 130,
            render: ({ data }) => data.selectedinfo.guest,
            defaultFlex: 1,
        },
        {
            name: "GuestName",
            header: "Guest Name",
            minWidth: 170,
            render: ({ data }) => data.Guestdetails.name,
            defaultFlex: 1,
        },
        {
            name: "GuestNo",
            header: "Guest No.",
            minWidth: 170,
            render: ({ data }) => data.Guestdetails.mobile,
            defaultFlex: 1,
        },
        {
            name: "Date",
            header: "CheckIn Date - Checkout Date",
            render: ({ data }) =>
                data.selectedinfo.selectedDateCheckIn +
                " - " +
                data.selectedinfo.selectedDateCheckOut,
            minWidth: 250,
            defaultFlex: 1,
        },
        {
            name: "BookingStatus",
            header: "Booking Status",
            minWidth: 190,
            defaultFlex: 1,
        },
        {
            name: "swagstayAmount",
            header: "Swagstay Amount",
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "DiscountAmount",
            header: "Discount Amount",
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "walletAmount",
            header: "Wallet Amount",
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "TotalAmount",
            header: "Total Amount",
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "BalanceAmount",
            header: "Balance Amount",
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "bookingMode",
            header: "Booking Mode",
            minWidth: 130,
            defaultFlex: 1,
        },
        //   {
        //     headerName: 'Details',
        //     name: 'myAccordionname',
        //     minWidth: 150,
        //     defaultFlex: 1,
        //     cellRendererFramework: AccordionRenderer,
        //     cellRendererParams: {
        //       value: (params) => params.value.summary,
        //       details: (params) => params.value.details,
        //     },
        //   },
        //   { name: 'status', header: 'Status', minWidth: 80, defaultFlex: 1 },
    ];

    const DATA_URL = "https://swagstay-db-new.onrender.com/getBookingDetails";

    const [dataSource, setDataSource] = useState([]);

    const loadNewData = () => {
        const newDataSource = async () => {
            return fetch(DATA_URL).then(async (response) => {
                return response.json().then((data1) => {
                    console.log(data1.data.length);
                    setlivedata({ ...live, totalbooking: data1.data.length });
                    const data = data1.data;
                    return data;
                });
            });
        };

        setDataSource(newDataSource);
    };
    return (
        <PmsLayout>
            <h1 className="my-2 text-2xl font-bold">Bookings</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <Link to={`/swagmanager/${id}/booking`}>
                    <CardThree
                        date={"08|05|2023"}
                        booking={"Upcoming Booking"}
                        bookingNo={bookings}
                    />
                </Link>
                <CardThree
                    status={"Check-in"}
                    date={"08|05|2023"}
                    booking={"Departure Booking"}
                    bookingNo={"0 Booking"}
                />
                <CardThree
                    status={"Create Booking"}
                    date={"08|05|2023"}
                    booking={"In House"}
                    bookingNo={"0/12"}
                />
                <CardThree
                    status={"Occupancy"}
                    date={"08|05|2023"}
                    booking={"In House"}
                    bookingNo={"0.00"}
                />
            </div>

            <div className="my-6 box-border bg-meta-9 p-6 dark:bg-meta-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Current Performance</h1>
                    <div className="relative z-0 inline-block w-fit max-w-125 rounded-md shadow-sm">
                        <button
                            type="button"
                            className="text-gray-700 hover:bg-gray-50 focus:border-indigo-500 relative inline-flex items-center rounded-l-md border border-[#b8b8b8] bg-whiter px-4 py-2 text-sm font-medium focus:z-10 focus:bg-white focus:shadow-card focus:outline-none focus:ring-1 dark:bg-boxdark focus:dark:border focus:dark:border-white"
                        >
                            Today
                        </button>
                        <button
                            type="button"
                            className="text-gray-700 hover:bg-gray-50 focus:border-indigo-500 relative inline-flex items-center border-y border-[#b8b8b8] bg-whiter px-4 py-2 text-sm font-medium focus:z-10 focus:bg-white focus:shadow-card focus:outline-none focus:ring-1 dark:bg-boxdark focus:dark:border focus:dark:border-white"
                        >
                            This Week
                        </button>
                        <button
                            type="button"
                            className="text-gray-700 hover:bg-gray-50 focus:border-indigo-500 relative inline-flex items-center border-y border-l border-[#b8b8b8] bg-whiter px-4 py-2 text-sm font-medium focus:z-10 focus:bg-white focus:shadow-card focus:outline-none focus:ring-1 dark:bg-boxdark focus:dark:border focus:dark:border-white"
                        >
                            This Month
                        </button>
                        <button
                            type="button"
                            className="text-gray-700 hover:bg-gray-50 focus:border-indigo-500 relative inline-flex items-center rounded-r-md border border-[#b8b8b8] bg-whiter px-4 py-2 text-sm font-medium focus:z-10 focus:bg-white focus:shadow-card focus:outline-none focus:ring-1 dark:bg-boxdark focus:dark:border focus:dark:border-white"
                        >
                            Last Month
                        </button>
                    </div>
                </div>
                <div className="justify-stretch my-6 box-border  flex flex-wrap gap-6">
                    <CardFour date="2may" title="Revenue" amount="200.00" />
                    <CardFour
                        date="2may"
                        title="Avg. Root Ratio"
                        amount="200.00"
                    />
                    <CardFour
                        date="2may"
                        title="Swagstay Ratings"
                        amount="200.00"
                    />
                    <CardFour date="2may" title="Check-in %" amount="200.00" />
                    <CardFour date="2may" title="Cancelled" amount="200.00" />
                    <CardFour
                        date="2may"
                        title="Booking Value"
                        amount="₹ 224324.00"
                    />
                </div>
                <div>
                    <BookingTable />
                </div>
            </div>
        </PmsLayout>
    );
};

export default Dashboard;

// import React from "react";

// const Dashboard = () => {
//     return <div>Dashboard</div>;
// };

// export default Dashboard;
