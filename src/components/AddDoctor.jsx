import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
// import DefaultLayout from "../../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../Utils/axiosClient";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api";
const AddDoctor = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0",
        libraries: ["places"],
    });
    const [error, seterror] = useState(false);

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    // let [hotel, setHotel] = useState({
    //     Name_of_hotel_company: "",
    //     Website_hotel: "",
    //     Authoried_signatory_designation: "",
    //     Authoried_signatory_name: "",
    //     Authoried_signatory_designationswagName: "",
    //     Authoried_signatory_designationSwag: "",
    //     Mobile_no: "",
    //     Hotel_email: "",
    //     Business_manager: "",

    //     Hotel_name: "",
    //     Hotel_type: "",
    //     Latitude: "",
    //     City: "",
    //     Locality: "",
    //     Swag_email: "",
    //     Address: "",
    //     Commision: "",
    //     Meta_discription: "",

    //     Landline_no: "",
    //     Website_swag_info: "",
    //     Contact_no: "",

    //     Total_rooms: "",
    //     GSTN_no: "",
    //     Longitude: "",
    //     Map_link: "",
    //     Zip_code: "",
    //     Small_description: "",
    //     image: "",
    // });

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: "",
        qulification: "",
        speciality: "",
        yearOfExprience: "",
        email: "",
        phone: "",
        password: "medidek@123",
        connsultationFee: "",
        description: "",
        acceptAppointments: "bySlot",
        location: "",
        landmark: "",
        enterFullAddress: "",
        mapLink: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const navigate = useNavigate();
    let config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputValue({ ...inputValue, mapLink: originRef?.current.value });
        console.log(inputValue.mapLink);
        if (
            !inputValue.nameOfTheDoctor ||
            !inputValue.qulification ||
            !inputValue.speciality ||
            !inputValue.yearOfExprience ||
            !inputValue.email ||
            !inputValue.phone ||
            !inputValue.password ||
            !inputValue.connsultationFee ||
            !inputValue.description ||
            !inputValue.acceptAppointments ||
            !inputValue.landmark ||
            !inputValue.enterFullAddress ||
            !inputValue.location ||
            !inputValue.mapLink
        ) {
            seterror(true);
            return false;
        }

        let formData = new FormData();
        formData.append("nameOfTheDoctor", inputValue.nameOfTheDoctor);
        formData.append("qulification", inputValue.qulification);
        formData.append("speciality", inputValue.speciality);
        formData.append("yearOfExprience", inputValue.yearOfExprience);
        formData.append("email", inputValue.email);
        formData.append("phone", inputValue.phone);
        formData.append("password", inputValue.password);
        formData.append("connsultationFee", inputValue.connsultationFee);
        formData.append("description", inputValue.description);
        formData.append("acceptAppointments", inputValue.acceptAppointments);
        formData.append("location", inputValue.location);
        formData.append("landmark", inputValue.landmark);
        formData.append("enterFullAddress", inputValue.enterFullAddress);
        formData.append("mapLink", inputValue.mapLink);
        formData.append("image", inputImage);

        try {
            const response = await axiosClient.post("/v2/addDoctor", formData);
            console.log(response);
            if (response.status === "ok") {
                toast.success("Doctor Added successfully");
                setInputValue({
                    ...inputValue,
                    nameOfTheDoctor: "",
                    qulification: "",
                    speciality: "",
                    yearOfExprience: "",
                    email: "",
                    phone: "",
                    connsultationFee: "",
                    description: "",
                    location: "",
                    landmark: "",
                    enterFullAddress: "",
                    mapLink: "",
                });
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const days = ["Royal", "Luxury"];
    const [hotelType, setHotelType] = useState([]);
    const [bmanager, setBmanager] = useState([]);
    const [citiesMaster, setCitiesMaster] = useState([]);
    const [inputImage, setInputImage] = useState("");
    async function getCitiesMaster() {
        let result = await axios.get(
            "https://swagstay-db-new.onrender.com/getcity"
        );
        setCitiesMaster(result.data.Data);
        console.log(result.data.Data);
    }
    async function getHotelMaster() {
        let result = await axios.get(
            "https://swagstay-db-new.onrender.com/hoteltypemaster"
        );
        setHotelType(result.data.result);
        console.log(hotelType);
    }
    async function getBusinessManager() {
        let result = await axios.get(
            "https://swagstay-db-new.onrender.com/businessmanager"
        );
        setBmanager(result.data.result);
        console.log(result.data.result);
    }
    useEffect(() => {
        getHotelMaster();
        getCitiesMaster();
        getBusinessManager();
    }, []);
    const [allDays, setAllDays] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const handleAllDaysChange = () => {
        setAllDays(!allDays);
        if (!allDays) {
            setSelectedDays(hotelType);
        } else {
            setSelectedDays([]);
        }
    };

    const handleDayChange = (event) => {
        const day = event.target.value;
        if (event.target.checked) {
            setSelectedDays((prevSelectedDays) => [...prevSelectedDays, day]);
        } else {
            setSelectedDays((prevSelectedDays) =>
                prevSelectedDays.filter((d) => d !== day)
            );
        }
        setAllDays(selectedDays.length === 6); // Check if all individual days are selected
    };

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef();

    async function calculateRoute() {
        if (
            originRef.current.value === "" ||
            destiantionRef.current.value === ""
        ) {
            return;
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    }

    return (
        <>
            {!isLoaded ? (
                <h1>Loading.....</h1>
            ) : (
                <DefaultLayout>
                    <ToastContainer position="top-center"></ToastContainer>
                    <form onSubmit={handleSubmit}>
                        <div className="mx-8 flex flex-col gap-3">
                            <h1 className="dark:text-gray-50 text-4xl font-bold">
                                Add Hospital
                            </h1>
                            <div className="">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={(e) => {
                                        setInputImage(e.target.files[0]);
                                    }}
                                />
                            </div>
                            {/* Hotel Company Info */}
                            <div className="flex flex-col gap-3">
                                <h5 className="dark:text-gray-50 text-lg font-bold underline">
                                    Hospital Information
                                </h5>
                                <div className="flex gap-2">
                                    <label
                                        htmlFor="nameOfTheDoctor"
                                        className="text-md dark:text-gray-50 w-[19.5rem]"
                                    >
                                        Name of the Doctor
                                    </label>
                                    <input
                                        type="text"
                                        id="nameOfTheDoctor"
                                        required
                                        name="nameOfTheDoctor"
                                        className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5"
                                        value={inputValue.nameOfTheDoctor}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="authsignatoryname"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Authorised Signatory (Name)
                                    </label>
                                    <input
                                        type="text"
                                        id="authsignatoryname"
                                        required
                                        name={hotel.Authoried_signatory_name}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Authoried_signatory_name:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="authsignatorydesignation"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Authorised Signatory (Designation)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        id="authsignatorydesignation"
                                        name={
                                            hotel.Authoried_signatory_designation
                                        }
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Authoried_signatory_designation:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="qulification"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Qualification
                                        </label>
                                        <input
                                            // onKeyDown={(e) => {
                                            //     e.key === "-" && e.preventDefault();
                                            // }}
                                            // min="0"
                                            onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                            id="qulification"
                                            required
                                            name="qulification"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.qulification}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="speciality"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Speciality
                                        </label>
                                        <input
                                            required
                                            id="speciality"
                                            min="0"
                                            name="speciality"
                                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.speciality}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="yearOfExprience"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Years Of Experience
                                        </label>
                                        <input
                                            type="number"
                                            id="yearOfExprience"
                                            required
                                            name="yearOfExprience"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.yearOfExprience}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="email"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Enter Email Id
                                        </label>
                                        <input
                                            required
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="phone"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Enter Phone No
                                        </label>
                                        <input
                                            id="phone"
                                            type="number"
                                            required
                                            name="phone"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="connsultationFee"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Connsultation Fee
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            id="connsultationFee"
                                            name="connsultationFee"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.connsultationFee}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="description"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Enter Description
                                        </label>
                                        <input
                                            id="description"
                                            required
                                            name="description"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="location"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Enter Location
                                        </label>
                                        <input
                                            required
                                            id="location"
                                            name="location"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.location}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="landmark"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Landmark
                                        </label>
                                        <input
                                            id="landmark"
                                            required
                                            name="landmark"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.landmark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <label
                                            htmlFor="enterFullAddress"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Enter Full Address
                                        </label>
                                        <input
                                            required
                                            id="enterFullAddress"
                                            name="enterFullAddress"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.enterFullAddress}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        htmlFor="mapLink"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Map Link
                                    </label>
                                    <GoogleMap onLoad={(map) => setMap(map)} />
                                    <Autocomplete>
                                        <input
                                            type="text"
                                            placeholder="Origin"
                                            ref={originRef}
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        />
                                    </Autocomplete>
                                </div>
                            </div>

                            {/* Swag Info */}
                            {/* <div className="flex flex-col gap-3"> */}
                            {/* <h5 className="dark:text-gray-50 text-lg font-bold underline">
                                Swag Information
                            </h5> */}
                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="businessmanager"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Business Manager
                                    </label>
                                    <select
                                        id="businessmanager"
                                        required
                                        value={hotel.Business_manager}
                                        placeholder="--SELECT--"
                                        className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 flex h-8 w-[11.47rem] items-center rounded border-2"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Business_manager:
                                                    e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            hidden
                                            className="text-sm"
                                        >
                                            Select
                                        </option>
                                        {bmanager.map((bm) => (
                                            <option
                                                value={bm.fullName}
                                                className="text-sm"
                                            >
                                                {bm.fullName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="contactno"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Contact No.
                                    </label>
                                    <input
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        min="0"
                                        onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                        required
                                        type="number"
                                        id="contactno"
                                        name="Contact_no"
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Contact_no: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="email"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        id="email"
                                        name="email"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Swag_email: e.target.value,
                                            })
                                        }
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="website"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        required
                                        name="Website_swag_info"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                Website_swag_info:
                                                    e.target.value,
                                            });
                                        }}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="authsignatorynameswag"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Authorised Signatory Name (Swag)
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        id="authsignatorynameswag"
                                        name={
                                            hotel.Authoried_signatory_designationswagName
                                        }
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Authoried_signatory_designationswagName:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="authsignatorydesignationswag"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Authorised Signatory Designation (Swag)
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        id="authsignatorydesignationswag"
                                        name={
                                            hotel.Authoried_signatory_designationSwag
                                        }
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Authoried_signatory_designationSwag:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="hotelname"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Hotel Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        id="hotelname"
                                        name={hotel.Hotel_name}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Hotel_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="totalrooms"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Total Rooms
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        id="totalrooms"
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        min="0"
                                        onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                        name={hotel.Total_rooms}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Total_rooms: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="hoteltype"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Hotel Type
                                    </label>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="flex gap-0.5">
                                            <input
                                                type="checkbox"
                                                id="allDays"
                                                name="Hotel_type"
                                                defaultValue="All Types"
                                                checked={allDays}
                                                onChange={handleAllDaysChange}
                                            />
                                            <label htmlFor="allDays">
                                                All Types
                                            </label>
                                        </div>
                                        {hotelType.map((day) => (
                                            <div
                                                className="flex gap-0.5"
                                                key={day.hotelType}
                                            >
                                                <input
                                                    type="checkbox"
                                                    required
                                                    id={day.hotelType}
                                                    name="Hotel_type"
                                                    value={day.hotelType}
                                                    checked={selectedDays.includes(
                                                        day
                                                    )}
                                                    onChange={(e) =>
                                                        setHotel({
                                                            ...hotel,
                                                            Hotel_type:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                                <label htmlFor={day.hotelType}>
                                                    {day.hotelType}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="gstnno"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        GSTN No.
                                    </label>
                                    <input
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        required
                                        type="text"
                                        id="gstnno"
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                GSTN_no: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="email"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Latitude
                                    </label>
                                    <input
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        type="text"
                                        required
                                        id="lattitude"
                                        name={hotel.Latitude}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Latitude: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="longitude"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Longitude
                                    </label>
                                    <input
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        required
                                        type="text"
                                        id="longitude"
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Longitude: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="city"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        City
                                    </label>
                                    <select
                                        required
                                        id="city"
                                        className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 flex h-8 w-[11.47rem] items-center rounded border-2"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                City: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            hidden
                                            className="text-sm"
                                        >
                                            Select
                                        </option>
                                        {citiesMaster.map((city) => (
                                            <option
                                                value={city.city}
                                                className="text-sm"
                                            >
                                                {city.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="map"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Map Link
                                    </label>
                                    <input
                                        type="link"
                                        id="map"
                                        required
                                        name={hotel.Map_link}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Map_link: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="locality"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Locality
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        id={hotel.Locality}
                                        name="locality"
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Locality: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="address"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Address
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        id="address"
                                        name={hotel.Address}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Address: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="zip"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Zip Code
                                    </label>
                                    <input
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        min="0"
                                        onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                        required
                                        type="number"
                                        id="zip"
                                        name={hotel.Zip_code}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Zip_code: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="smdesc"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Small Description
                                    </label>
                                    <textarea
                                        required
                                        rows={2}
                                        id="smdesc"
                                        name={hotel.Small_description}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Small_description:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="commission"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Commission
                                    </label>
                                    <select
                                        required
                                        id="commission"
                                        name={hotel.Commision}
                                        placeholder="--SELECT COMMISSION--"
                                        className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 flex h-8 w-[11.47rem] items-center rounded border-2"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Commision: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="" className="text-sm">
                                            Select
                                        </option>
                                        <option
                                            value="Swag18"
                                            className="text-sm"
                                        >
                                            Swag18
                                        </option>
                                        <option
                                            value="Swag20"
                                            className="text-sm"
                                        >
                                            Swag20
                                        </option>
                                        <option
                                            value="Resort"
                                            className="text-sm"
                                        >
                                            Resort
                                        </option>
                                        <option
                                            value="Owned"
                                            className="text-sm"
                                        >
                                            Owned
                                        </option>
                                    </select>
                                </div>
                            </div> */}
                            {/* <div className="flex gap-2">
                                <label
                                    for="metadesc"
                                    className="text-md dark:text-gray-50 w-60"
                                >
                                    Meta Description
                                </label>
                                <textarea
                                    required
                                    rows={2}
                                    id="metadesc"
                                    name={hotel.Meta_discription}
                                    className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 rounded border-2 p-1.5"
                                    onChange={(e) =>
                                        setHotel({
                                            ...hotel,
                                            Meta_discription: e.target.value,
                                        })
                                    }
                                />
                            </div> */}
                            {/* </div> */}
                            <button
                                type="submit"
                                // style={{ backgroundColor: currentColor }}
                                className="border-green-700 float-left w-fit rounded border-2 bg-black p-2 text-sm text-white"
                            >
                                Save & Continue
                            </button>
                        </div>
                    </form>
                </DefaultLayout>
            )}
        </>
    );
};

export default AddDoctor;
