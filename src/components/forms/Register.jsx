import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../images/logo/logo.png';

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'https://swagstay-db-new.onrender.com/api/users';
      const { data: res } = await axios.post(url, data);
      navigate('/login');
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className='font-poppins flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img className='mx-auto h-16 w-auto' src={Logo} alt='Workflow' />
          <h2 className='text-gray-900 mt-6 text-center text-3xl font-extrabold'>
            Register your account
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
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
                    type='username'
                    onChange={handleChange}
                    value={data.username}
                    required
                    autoComplete='username'
                    className='border-gray-300 placeholder-gray-400 focus:ring-red-500 focus:border-red-500 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  for='email'
                  className='text-gray-700 block text-sm font-medium'
                >
                  {' '}
                  Email address{' '}
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    onChange={handleChange}
                    value={data.email}
                    required
                    autoComplete='email'
                    className='border-gray-300 placeholder-gray-400 focus:ring-red-500 focus:border-red-500 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  for='password'
                  className='text-gray-700 block text-sm font-medium'
                >
                  {' '}
                  Password{' '}
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    onChange={handleChange}
                    value={data.password}
                    required
                    className='border-gray-300 placeholder-gray-400 focus:ring-red-500 focus:border-red-500 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm'
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
              {/* <Link to='/login'> */}
              {error && <div className='{styles.error_msg}'>{error}</div>}

              <button
                type='submit'
                className='hover:bg-red-700 focus:ring-red-500 flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
              >
                Register
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
