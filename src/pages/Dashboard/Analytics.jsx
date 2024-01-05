import React, { useState, useEffect, useCallback } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import CardTwo from "../../components/CardTwo";
import ChartOne from "../../components/ChartOne";
import ChartTwo from "../../components/ChartTwo";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import TableFour from "../../components/CustomerTable1";
import { BiDownload, BiHotel, BiUser } from "react-icons/bi";
import {
    FaCalculator,
    FaLock,
    FaRegListAlt,
    FaSalesforce,
    FaUserFriends,
    FaUsers,
    FaWallet,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosClient } from "../../Utils/axiosClient";
import moment from "moment";

const Analytics = () => {
    const [cardsData, setCardsData] = useState({});

    const columns = [
        {
            name: "index",
            header: "Sr. No",
            width: 50,
            defaultWidth: 50,
            render: ({ data, rowIndex }) => rowIndex + 1,
            sortable: false,
            resizable: false,
            frozen: true,
        },
        {
            name: "createddate",
            header: "Created Date",
            minWidth: 120,
            defaultFlex: 1,
            render: ({ data }) =>
                moment(data.createdDate).format("DD-MM-YY hh:mm"),
        },
        {
            name: "email",
            header: "Email",
            minWidth: 100,
            defaultFlex: 2,
            render: ({ data }) => data.email,
        },
        {
            name: "name",
            header: "Name",
            minWidth: 100,
            defaultFlex: 2,
            render: ({ data }) => data.name,
        },
        {
            name: "dateOfBirth",
            header: "Date Of Birth",
            minWidth: 100,
            defaultFlex: 2,
            render: ({ data }) => data.dateOfBirth,
        },
        {
            name: "phone",
            header: "Phone",
            minWidth: 100,
            defaultFlex: 2,
            render: ({ data }) => data.phone,
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
    // useEffect(() => {
    //     getTotalhotels();

    //     loadNewData();

    // }, []);

    const DATASET_URL = "https://mehrhospitality.com";

    const [customerDataSource, setCustomerDataSource] = useState([]);
    async function getTotalhotels() {
        let tottalhotels = await axios.get(
            "https://swagstay-db-new.onrender.com/Addhotel"
        );
        console.log(tottalhotels.data.data.length);
        live.livehoteldata = tottalhotels.data.data.length;
    }

    const latestAppointments = async () => {
        try {
            const response = await axiosClient.get("/v2/latestAppointments");
            if (response.status === "ok") {
                return setDataSource(response.result);
            }
        } catch (error) {
            toast.error(error.message);
        }

        // const newDataSource = async () => {
        //     return fetch(DATASET_URL).then(async (response) => {
        //         return response.json().then((data) => {
        //             console.log(data.data.length);
        //             live.liveguestdetails = data.data.length;
        //             return data.data;
        //         });
        //     });
        // };
    };
    const latestPatientsUser = async () => {
        try {
            const response = await axiosClient.get("/v2/latestPatientsUser");
            if (response.status === "ok") {
                return setCustomerDataSource(response.result);
            }
        } catch (error) {
            toast.error(error.message);
        }

        // const newDataSource = async () => {
        //     return fetch(DATASET_URL).then(async (response) => {
        //         return response.json().then((data) => {
        //             console.log(data.data.length);
        //             live.liveguestdetails = data.data.length;
        //             return data.data;
        //         });
        //     });
        // };
    };

    // console.log(loadData.length);
    // console.log(columns.cre);

    // Bookings

    const bookingColumns = [
        {
            name: "_index",
            header: "Sr. No",
            width: 50,
            defaultWidth: 50,
            render: ({ rowIndex }) => rowIndex + 1,
            sortable: false,
            resizable: true,
            frozen: true,
        },
        {
            name: "createddate",
            header: "Created Date",
            render: ({ data }) => data?.createddate,
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "appointmentStatus",
            header: "Appointment Status",
            render: ({ data }) => data?.status,
            minWidth: 150,
            defaultFlex: 1,
        },
        {
            name: "patientName",
            header: "Patient Name",
            render: ({ data }) => data?.name,
            minWidth: 150,
            defaultFlex: 1,
        },
        {
            name: "age",
            header: "Age",
            minWidth: 100,
            render: ({ data }) => data.age,
            defaultFlex: 1,
        },
        {
            name: "gender",
            header: "Gender",
            minWidth: 100,
            render: ({ data }) => data.gender,
            defaultFlex: 1,
        },
        {
            name: "phone",
            header: "Phone",
            minWidth: 250,
            render: ({ data }) => data.phone,
            defaultFlex: 1,
        },
        {
            name: "appointmentDate",
            header: "Appointment Date",
            minWidth: 150,
            render: ({ data }) =>
                moment(data.appointmentDate).format("DD-MM-YYYY"),
            defaultFlex: 1,
        },
        {
            name: "AppointmentTime",
            header: "Appointment Time",
            minWidth: 250,
            render: ({ data }) =>
                data.AppointmentTime ? data.AppointmentTime : "Token",
            defaultFlex: 1,
        },

        // {
        //     name: "TotalRooms",
        //     header: "Total Rooms",
        //     minWidth: 130,
        //     render: ({ data }) => data.selectedinfo.rooms,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "TotalNights",
        //     header: "Total Nights",
        //     minWidth: 130,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "TotalGuests",
        //     header: "Total Guests",
        //     minWidth: 130,
        //     render: ({ data }) => data.selectedinfo.guest,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "GuestName",
        //     header: "Guest Name",
        //     minWidth: 170,
        //     render: ({ data }) => data.Guestdetails.name,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "GuestNo",
        //     header: "Guest No.",
        //     minWidth: 170,
        //     render: ({ data }) => data.Guestdetails.mobile,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "Date",
        //     header: "CheckIn Date - Checkout Date",
        //     render: ({ data }) =>
        //         data.selectedinfo.selectedDateCheckIn +
        //         " - " +
        //         data.selectedinfo.selectedDateCheckOut,
        //     minWidth: 250,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "BookingStatus",
        //     header: "Booking Status",
        //     minWidth: 190,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "swagstayAmount",
        //     header: "Swagstay Amount",
        //     minWidth: 130,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "DiscountAmount",
        //     header: "Discount Amount",
        //     minWidth: 130,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "walletAmount",
        //     header: "Wallet Amount",
        //     minWidth: 130,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "TotalAmount",
        //     header: "Total Amount",
        //     minWidth: 130,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "BalanceAmount",
        //     header: "Balance Amount",
        //     minWidth: 130,
        //     defaultFlex: 1,
        // },
        // {
        //     name: "bookingMode",
        //     header: "Booking Mode",
        //     minWidth: 130,
        //     defaultFlex: 1,
        // },
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

    // const loadNewData = () => {
    //     const newDataSource = async () => {
    //         return fetch(DATA_URL).then(async (response) => {
    //             return response.json().then((data1) => {
    //                 console.log(data1.data.length);
    //                 setlivedata({ ...live, totalbooking: data1.data.length });
    //                 const data = data1.data;
    //                 return data;
    //             });
    //         });
    //     };

    //     setDataSource(newDataSource);
    // };

    const getDoctorsFigure = async () => {
        try {
            const response = await axiosClient.get(
                "/v2/getAllDashboardCardsData"
            );
            if (response.status === "ok") {
                setCardsData(response.result);
                return;
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDoctorsFigure();
        latestAppointments();
        latestPatientsUser();
        setRows(customerDataSource);
    }, []);
    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardTwo
                    value={cardsData?.totalDoctors?.totalDoctors}
                    title={"Total Doctors"}
                    icon={<BiHotel />}
                    link={"/hotel"}
                />
                <CardTwo
                    value={cardsData?.totalHospitals?.totalHospitals}
                    title={"Total Hospitals"}
                    icon={<BiDownload />}
                    link={"/installation"}
                />
                <CardTwo
                    value={cardsData?.totalPatient?.totalPatient}
                    title={"Total Patient"}
                    icon={<FaUsers />}
                    link={"/customerList"}
                />
                <CardTwo
                    value={cardsData?.totalAppointments?.appointmentBySlot}
                    title={"Total Appointments By Slot"}
                    icon={<FaLock />}
                    link={"/customerBooking"}
                />
                <CardTwo
                    value={cardsData?.totalAppointments?.appointmentByToken}
                    title={"Total Appointments By Token"}
                    icon={<FaLock />}
                    link={"/customerBooking"}
                />
                <CardTwo
                    value={cardsData?.totalDoctors?.todaysDoctor}
                    title={"Today's Doctor"}
                    icon={<FaWallet />}
                />
                <CardTwo
                    value={cardsData?.totalHospitals?.todaysHospital}
                    title={"Today's Hospitals"}
                    icon={<FaUserFriends />}
                />
                <CardTwo
                    value={cardsData?.totalPatient?.todaysPatient}
                    title={"Today's Patient"}
                    icon={<FaRegListAlt />}
                />
                <CardTwo
                    value={cardsData?.totalAppointments?.todaysSlotAppointments}
                    title={"Today's Appointment By Slot"}
                    icon={<FaCalculator />}
                />
                <CardTwo
                    value={
                        cardsData?.totalAppointments?.todaysTokenAppointments
                    }
                    title={"Today's Appointment By Token"}
                    icon={<FaCalculator />}
                />
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne />
                <ChartTwo />
                <div className="col-span-12">
                    <h1 className="my-2 text-2xl font-bold">
                        Latest Appoinment
                    </h1>
                    <ReactDataGrid
                        idProperty="emailAddress"
                        columns={bookingColumns}
                        dataSource={dataSource}
                        style={gridStyle}
                        rowClass={rowClass}
                        virtualizeColumns={true}
                    />
                </div>
                <div className="col-span-12">
                    <h1 className="my-2 text-2xl font-bold">New Patient</h1>
                    <ReactDataGrid
                        idProperty="emailAddress"
                        columns={columns}
                        rows={rows}
                        dataSource={customerDataSource}
                        style={gridStyle}
                        rowClass={rowClass}
                        virtualizeColumns={true}
                    />
                </div>
                {/* <ChatCard /> */}
            </div>
        </DefaultLayout>
    );
};

export default Analytics;
