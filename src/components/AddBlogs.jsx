import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
// import DefaultLayout from "../../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../Utils/axiosClient";

const AddBlogs = () => {
    const [error, seterror] = useState(false);
    const [img, setimg] = useState("");

    const [inputValue, setInputValue] = useState({
        author: "",
        title: "",
        description: "",
        publishDate: "",
    });
    const [inputImage, setInputImage] = useState("");
    const [isLoaded, setIsloaded] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setInputValue({ ...inputValue, });
        if (
            !inputValue.author ||
            !inputValue.title ||
            !inputValue.description ||
            !inputValue.publishDate
        ) {
            seterror(true);
            return false;
        }

        let formData = new FormData();
        formData.append("author", inputValue.author);
        formData.append("title", inputValue.title);
        formData.append("description", inputValue.description);
        formData.append("publishDate", inputValue.publishDate);
        formData.append("image", inputImage);

        try {
            const response = await axiosClient.post("/v2/addBlog", formData);
            console.log(response);
            if (response.status === "ok") {
                toast.success("Blog Added successfully");
                setInputValue({
                    ...inputValue,
                    author: "",
                    title: "",
                    description: "",
                    publishDate: "",
                });
                setInputImage("");
                setimg("");
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setIsloaded(false);
        }
    };

    return (
        <>
            {isLoaded ? (
                <h1>Loading.....</h1>
            ) : (
                <DefaultLayout>
                    <ToastContainer position="top-center"></ToastContainer>
                    <form onSubmit={handleSubmit}>
                        <div className="mx-8 flex flex-col gap-3">
                            <h1 className="dark:text-gray-50 text-4xl font-bold">
                                Add Blog
                            </h1>
                            <div className="">
                                <input
                                    type="file"
                                    value={img}
                                    name="image"
                                    onChange={(e) => {
                                        setInputImage(e.target.files[0]);
                                        setimg(e.target.files[0]?.filename);
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="dark:text-gray-50 text-lg font-bold underline">
                                    Blog Information
                                </h5>
                                <div className="flex flex-col gap-2  md:justify-between">
                                    <div className="flex w-full flex-col gap-2">
                                        <label
                                            htmlFor="author"
                                            className="text-md dark:text-gray-50 w-[19.5rem]"
                                        >
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            required
                                            name="author"
                                            className="border-gray-300 focus:border-yellow-700 bg-gray-50 dark:text-gray-50 dark:bg-gray-600 h-8 w-full rounded border-2 p-1.5"
                                            value={inputValue.author}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <label
                                            htmlFor="title"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Title
                                        </label>
                                        <input
                                            // onKeyDown={(e) => {
                                            //     e.key === "-" && e.preventDefault();
                                            // }}
                                            // min="0"
                                            onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                                            id="title"
                                            required
                                            name="title"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2  md:justify-between">
                                    <div className="flex w-full flex-col gap-2">
                                        <label
                                            htmlFor="description"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            rows="4"
                                            cols="50"
                                            required
                                            id="description"
                                            min="0"
                                            name="description"
                                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 resize-none rounded border-2 p-1.5"
                                            value={inputValue.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <label
                                            htmlFor="publishDate"
                                            className="text-md dark:text-gray-50 w-60"
                                        >
                                            Publish Date
                                        </label>
                                        <input
                                            type="date"
                                            id="publishDate"
                                            required
                                            name="publishDate"
                                            className="bg-gray-50 dark:text-gray-50 dark:bg-gray-600 border-gray-300 focus:border-yellow-700 h-8 rounded border-2 p-1.5"
                                            value={inputValue.publishDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* <div className="flex justify-between"> */}

                                {/* <div className="flex gap-2">
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
                                    </div> */}
                                {/* </div> */}
                                {/* <div className="flex justify-between">
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
                                </div> */}
                            </div>

                            <button
                                type="submit"
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

export default AddBlogs;
