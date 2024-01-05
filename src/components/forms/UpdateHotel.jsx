import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import DefaultLayout from "../../layout/DefaultLayout";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const UpdateHotel = () => {
    let [hotel, setHotel] = useState({
        Name_of_hotel_company: "",
        Website_hotel: "",
        Authoried_signatory_designation: "",
        Authoried_signatory_name: "",
        Authoried_signatory_designationswagName: "",
        Authoried_signatory_designationSwag: "",
        Mobile_no: "",
        Hotel_email: "",
        Business_manager: "",

        Hotel_name: "",
        Hotel_type: "",
        Latitude: "",
        City: "",
        Locality: "",
        Swag_email: "",
        Address: "",
        Commision: "",
        Meta_discription: "",

        Landline_no: "",
        Website_swag_info: "",
        Contact_no: "",

        Total_rooms: "",
        GSTN_no: "",
        Longitude: "",
        Map_link: "",
        Zip_code: "",
        Small_description: "",
        image: "",
    });
    // let [image, setimage] = useState('');
    let config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    const { id } = useParams();
    const getHotel = async (ab) => {
        try {
            let response = await axios.get(
                `https://swagstay-db-new.onrender.com/AddhotelfindbyID/${ab}`
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Error while calling Get Hotel API", error);
        }
    };

    const fetchData = async () => {
        let result = await getHotel(id);
        setHotel(result.data);
        console.log(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function updateHotel(e) {
        e.preventDefault();
        try {
            if (hotel.image === "") {
                return toast.error("please select image ");
            }
            let result = await axios.put(
                `https://swagstay-db-new.onrender.com/updateHotel/${id}`,
                hotel
                // config
            );
            console.log(result.status);
            if (result.status === 200) {
                fetchData();
                toast.success("Hotel data updated !");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.log("Error while updating Hotel", err);
        }
    }

    async function cloudimg(e) {
        let result = await axios.post(
            "https://swagstay-db-new.onrender.com/uploadimage",
            { image: e },
            config
        );
        console.log(result.data.val);
        setHotel(() => {
            return { ...hotel, image: result.data.val };
        });
    }
    console.log(hotel);
    return (
        <>
            <DefaultLayout>
                <ToastContainer position="top-center"></ToastContainer>
                <form method="POSt" onSubmit={updateHotel}>
                    <div className="mx-8 flex flex-col gap-3">
                        <h1 className="dark:text-gray-50 text-4xl font-bold">
                            Update Hotel
                        </h1>
                        <div className="">
                            <div className="h-30 w-30">
                                <img src={hotel.image}></img>
                            </div>
                            <input
                                type="file"
                                onChange={(e) => cloudimg(e.target.files[0])}
                            />
                        </div>
                        {/* Hotel Company Info */}
                        <div className="flex flex-col gap-3">
                            <h5 className="dark:text-gray-50 text-lg font-bold underline">
                                Hotel Company Information
                            </h5>
                            <div className="flex gap-2">
                                <label
                                    for="hotel-name"
                                    className="text-md dark:text-gray-50 w-[19.5rem]"
                                >
                                    Name of Hotel Company
                                </label>
                                <input
                                    type="text"
                                    id="hotel-name"
                                    required
                                    value={hotel.Name_of_hotel_company}
                                    defaultValue={hotel.Name_of_hotel_company}
                                    className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5"
                                    onChange={(e) =>
                                        setHotel({
                                            ...hotel,
                                            Name_of_hotel_company:
                                                e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex justify-between">
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
                                        value={hotel.Authoried_signatory_name}
                                        defaultValue={
                                            hotel.Authoried_signatory_name
                                        }
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
                                        id="authsignatorydesignation"
                                        required
                                        value={
                                            hotel.Authoried_signatory_designation
                                        }
                                        defaultValue={
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
                            </div>
                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="mobileno"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Mobile No.
                                    </label>
                                    <input
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        min="0"
                                        onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                        type="number"
                                        required
                                        id="mobileno"
                                        value={hotel.Mobile_no}
                                        defaultValue={hotel.Mobile_no}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Mobile_no: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="landlineno"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Landline No.
                                    </label>
                                    <input
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        min="0"
                                        onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                        required
                                        type="number"
                                        id="landlineno"
                                        value={hotel.Landline_no}
                                        defaultValue={hotel.Landline_no}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Landline_no: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
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
                                        value={hotel.Hotel_email}
                                        defaultValue={hotel.Hotel_email}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Hotel_email: e.target.value,
                                            })
                                        }
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
                                        value={hotel.Website_hotel}
                                        defaultValue={hotel.Website_hotel}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Website_hotel: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Swag Info */}
                        <div className="flex flex-col gap-3">
                            <h5 className="dark:text-gray-50 text-lg font-bold underline">
                                Swag Information
                            </h5>
                            <div className="flex justify-between">
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
                                            value="swagstay"
                                            className="text-sm"
                                        >
                                            Swagstay
                                        </option>
                                        <option
                                            value="swagstay"
                                            className="text-sm"
                                        >
                                            Fahim Ali
                                        </option>
                                        <option
                                            value="swagstay"
                                            className="text-sm"
                                        >
                                            Ankit Thakre
                                        </option>
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
                                        type="number"
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        min="0"
                                        onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                        required
                                        id="contactno"
                                        value={hotel.Contact_no}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Contact_no: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="email"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Email
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        value={hotel.Swag_email}
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
                                        value={hotel.Website_swag_info}
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
                            </div>

                            <div className="flex justify-between">
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
                                        value={
                                            hotel.Authoried_signatory_designationswagName
                                        }
                                        defaultValue={
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
                                        value={
                                            hotel.Authoried_signatory_designationSwag
                                        }
                                        defaultValue={
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
                            </div>

                            <div className="flex justify-between">
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
                                        value={hotel.Hotel_name}
                                        defaultValue={hotel.Hotel_name}
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
                                        onKeyDown={(e) => {
                                            e.key === "-" && e.preventDefault();
                                        }}
                                        min="0"
                                        onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                        required
                                        type="number"
                                        id="totalrooms"
                                        defaultValue={hotel.Total_rooms}
                                        value={hotel.Total_rooms}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Total_rooms: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="hoteltype"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Hotel Type
                                    </label>
                                    <select
                                        id="hoteltype"
                                        required
                                        value={hotel.Hotel_type}
                                        defaultValue={hotel.Hotel_type}
                                        placeholder="--SELECT--"
                                        className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 flex h-8 w-[11.47rem] items-center rounded border-2"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Hotel_type: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value="Delux"
                                            className="text-sm"
                                        >
                                            Delux Hotel
                                        </option>
                                        <option
                                            value="Luxury"
                                            className="text-sm"
                                        >
                                            Luxury Hotel
                                        </option>
                                        <option
                                            value="Resort"
                                            className="text-sm"
                                        >
                                            Resort Hotels
                                        </option>
                                    </select>
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
                                        value={hotel.GSTN_no}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                GSTN_no: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="email"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Lattitude
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        onKeyDown="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                        id="lattitude"
                                        value={hotel.Latitude}
                                        defaultValue={hotel.Latitude}
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
                                        type="number"
                                        id="longitude"
                                        value={hotel.Longitude}
                                        defaultValue={hotel.Longitude}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Longitude: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
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
                                        value={hotel.City}
                                        defaultValue={hotel.City}
                                        placeholder="--SELECT--"
                                        className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 flex h-8 w-[11.47rem] items-center rounded border-2"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                City: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value="Nagpur"
                                            className="text-sm"
                                        >
                                            Nagpur
                                        </option>
                                        <option
                                            value="Jaipur"
                                            className="text-sm"
                                        >
                                            Jaipur
                                        </option>
                                        <option
                                            value="Pune"
                                            className="text-sm"
                                        >
                                            Pune
                                        </option>
                                        <option value="Goa" className="text-sm">
                                            Goa
                                        </option>
                                        <option
                                            value="Nashik"
                                            className="text-sm"
                                        >
                                            Nashik
                                        </option>
                                        <option
                                            value="Indore"
                                            className="text-sm"
                                        >
                                            Indore
                                        </option>
                                        <option
                                            value="Wardha"
                                            className="text-sm"
                                        >
                                            Wardha
                                        </option>
                                        <option
                                            value="Chandrapur"
                                            className="text-sm"
                                        >
                                            Chandrapur
                                        </option>
                                        <option
                                            value="Bhopal"
                                            className="text-sm"
                                        >
                                            Bhopal
                                        </option>
                                        <option
                                            value="Kashi"
                                            className="text-sm"
                                        >
                                            Kashi
                                        </option>
                                        <option
                                            value="Kanha"
                                            className="text-sm"
                                        >
                                            Kanha
                                        </option>
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
                                        type="text"
                                        required
                                        id="map"
                                        value={hotel.Map_link}
                                        defaultValue={hotel.Map_link}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Map_link: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="locality"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Locality
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        id={hotel.Locality}
                                        value={hotel.Locality}
                                        defaultValue={hotel.Locality}
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
                                        type="text"
                                        required
                                        id="address"
                                        value={hotel.Address}
                                        defaultValue={hotel.Address}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Address: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
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
                                        type="number"
                                        required
                                        id="zip"
                                        value={hotel.Zip_code}
                                        defaultValue={hotel.Zip_code}
                                        className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Zip_code: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <label
                                        for="commission"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Commission
                                    </label>
                                    <select
                                        id="commission"
                                        required
                                        value={hotel.Commision}
                                        defaultValue={hotel.Commision}
                                        placeholder="--SELECT COMMISSION--"
                                        className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 flex h-8 w-[11.47rem] items-center rounded border-2"
                                        onChange={(e) =>
                                            setHotel({
                                                ...hotel,
                                                Commision: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value="swagstay"
                                            className="text-sm"
                                        >
                                            Swag18
                                        </option>
                                        <option
                                            value="swagstay"
                                            className="text-sm"
                                        >
                                            Swag20
                                        </option>
                                        <option
                                            value="swagstay"
                                            className="text-sm"
                                        >
                                            Resort
                                        </option>
                                        <option
                                            value="swagstay"
                                            className="text-sm"
                                        >
                                            Owned
                                        </option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <label
                                        for="smdesc"
                                        className="text-md dark:text-gray-50 w-60"
                                    >
                                        Small Description
                                    </label>
                                    <textarea
                                        rows={2}
                                        required
                                        id="smdesc"
                                        value={hotel.Small_description}
                                        defaultValue={hotel.Small_description}
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
                            </div>
                            <div className="flex gap-2">
                                <label
                                    for="metadesc"
                                    className="text-md dark:text-gray-50 w-60"
                                >
                                    Meta Description
                                </label>
                                <textarea
                                    rows={2}
                                    required
                                    id="metadesc"
                                    value={hotel.Meta_discription}
                                    defaultValue={hotel.Meta_discription}
                                    className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 rounded border-2 p-1.5"
                                    onChange={(e) =>
                                        setHotel({
                                            ...hotel,
                                            Meta_discription: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <button
                            // style={{ backgroundColor: currentColor }}
                            className="border-green-700 float-left w-fit rounded border-2 bg-black p-2 text-sm text-white"
                            type="submit"
                        >
                            Save & Continue
                        </button>
                    </div>
                </form>
            </DefaultLayout>
        </>
    );
};

export default UpdateHotel;
