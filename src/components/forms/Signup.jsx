import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/logo/MedidekOriginalLOGOBLue.png";
import Loader from "../Loader";
import { axiosClient } from "../../Utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utils/localStorageManager";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice";

const Signup = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(data);
        try {
            // const url = "https://mehrhospitality.com";
            // const { data: res } = await axios.post(url, data);
            const response = await axiosClient.post("/v2/createAdmin", data);
            if (response.status === "ok") {
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                dispatch(login(response.result.adminUser));
                navigate("/dashboard");
                setLoading(false);

                console.log(data);
                // localStorage.setItem("token", res.data);
            }
            // window.location('/dashboard');
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
        setLoading(false);
    };
    return (
        <>
            {!loading ? (
                <div className="font-poppins flex h-screen flex-col items-center justify-center ">
                    {/* <div className="sm:mx-auto sm:w-full sm:max-w-md"> */}
                    <div className="mb-14 sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mr-auto h-10 w-auto"
                            src={"/m-logonew.png"}
                            alt="Workflow"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="text-gray-900 mb-4 text-center font-[Raleway] text-3xl font-bold">
                            Create Admin Account
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-gray-700 block text-sm font-medium"
                                >
                                    {" "}
                                    Email address{" "}
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                        value={data.email}
                                        required
                                        autoComplete="email"
                                        className="border-gray-300 placeholder-gray-400 focus:ring-red-500 focus:border-red-500 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>
                            {/* <div>
                <label
                  for='username'
                  className='text-gray-700 block text-sm font-medium'
                >
                  {' '}
                  Username{' '}
                </label>
                <div className='mt-1'>
                  <input
                    id='username'
                    name='username'
                    type='text'
                    onChange={handleChange}
                    value={data.username}
                    required
                    autoComplete='username'
                    className='border-gray-300 placeholder-gray-400 focus:ring-red-500 focus:border-red-500 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm'
                  />
                </div>
              </div> */}

                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-gray-700 block text-sm font-medium"
                                >
                                    {" "}
                                    Password{" "}
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        value={data.password}
                                        required
                                        className="border-gray-300 placeholder-gray-400 focus:ring-red-500 focus:border-red-500 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-teal-600 focus:ring-red-500 border-gray-300 rounded'
                  />
                  <label
                    for='remember-me'
                    className='ml-2 block text-sm text-gray-900'
                  >
                    {' '}
                    Remember me{' '}
                  </label>
                </div>

                <div className='text-sm'>
                  <a
                    href='/forgotPassword'
                    className='font-medium text-teal-600 hover:text-teal-500'
                  >
                    {' '}
                    Forgot your password?{' '}
                  </a>
                </div>
              </div> */}
                            {error && (
                                <div className="{styles.error_msg}">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="hover:bg-red-700 focus:ring-red-500 font-Lato mb-4 flex w-full justify-center rounded-md border border-transparent bg-[#1F51C6] py-2 px-4 text-sm font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                            >
                                Sign Up
                            </button>
                        </form>
                        <p className="mt-4 text-center">
                            Already have an account? <Link to={"/"}>Login</Link>
                        </p>
                        {/* </div> */}
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Signup;
