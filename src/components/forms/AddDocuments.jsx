import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import blankimage from '../../images/images.png';
const AddDocuments = () => {
  let [cloudimg, setcloudimg] = useState([]);
  let [image, setImage] = useState([]);
  //   console.log(cloudimg);
  let [Document, setDocument] = useState({
    leaseAgreementOrOwnershipNOC: '',
    companyPanCard: '',
    GSTCertificate: '',
    agreementBetweenSwagestayAndHotel: '',
    nocOfPartners: '',
    partnershipDeed: '',
    electricBill: '',
    CancelledCheque: '',
    MSMECertificat: '',
    hotelid: '',
  });

  const navigate = useNavigate();

  async function addHotel(e) {
    e.preventDefault();
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/hoteluser',
      Document
    );
    console.log(result);
    if (result.status === 200) {
      toast('hotelUser added successfully');
      navigate('/hoteluser');
    } else {
      toast('please try again');
    }
  }

  return (
    <>
      <DefaultLayout>
        <ToastContainer position='top-center'></ToastContainer>
        <form method='' onSubmit=''>
          <div className='bg-white p-8'>
            <h1 className='text-4xl font-bold text-black'>Add Documents</h1>
            <div className='my-6 flex  w-full gap-2'>
              <div className=' w-1/2'>
                <h1 className='text-md font-medium text-black'>
                  Lease Agreement Or Ownership NOC
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2  '>
                  {' '}
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        leaseAgreementOrOwnershipNOC: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
              {/* <div className='w-1/2  p-2 '>
                <h1>Lease Agreement Or Ownership NOC</h1>
                <div className=' m-2   bg-body p-2'>
                  <input type='file'></input>
                </div>
              </div> */}
              <div className=' w-1/2 '>
                <h1 className='text-md font-medium text-black'>
                  Company Pan Card
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2 '>
                  {' '}
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        companyPanCard: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
            </div>

            <div className='my-6 flex  w-full gap-2'>
              <div className=' w-1/2'>
                <h1 className='text-md font-medium text-black'>
                  GST Certificate
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2  '>
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        GSTCertificate: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
              {/* <div className='w-1/2  p-2 '>
                <h1>Lease Agreement Or Ownership NOC</h1>
                <div className=' m-2   bg-body p-2'>
                  <input type='file'></input>
                </div>
              </div> */}
              <div className=' w-1/2 '>
                <h1 className='text-md font-medium text-black'>
                  Agreement Between Swagestay And Hotel
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2 '>
                  {' '}
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        agreementBetweenSwagestayAndHotel: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
            </div>

            <div className='my-6 flex  w-full gap-2'>
              <div className=' w-1/2'>
                <h1 className='text-md font-medium text-black'>
                  NOC Of Partners
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2  '>
                  {' '}
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        nocOfPartners: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
              {/* <div className='w-1/2  p-2 '>
                <h1>Lease Agreement Or Ownership NOC</h1>
                <div className=' m-2   bg-body p-2'>
                  <input type='file'></input>
                </div>
              </div> */}
              <div className=' w-1/2 '>
                <h1 className='text-md font-medium text-black'>
                  Partnership Deed
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2 '>
                  {' '}
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        partnershipDeed: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className='my-6 flex  w-full gap-2'>
              <div className=' w-1/2'>
                <h1 className='text-md font-medium text-black'>
                  Electric Bill
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2  '>
                  {' '}
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        electricBill: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
              {/* <div className='w-1/2  p-2 '>
                <h1>Lease Agreement Or Ownership NOC</h1>
                <div className=' m-2   bg-body p-2'>
                  <input type='file'></input>
                </div>
              </div> */}
              <div className=' w-1/2 '>
                <h1 className='text-md font-medium text-black'>
                  Cancelled Cheque
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2 '>
                  {' '}
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        CancelledCheque: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
            </div>

            <div className='my-6 flex  w-full gap-2'>
              <div className=' w-1/2'>
                <h1 className='text-md font-medium text-black'>
                  MSME Certificat
                </h1>
                <div className='h-40 w-40 bg-black-2'>
                  <img
                    src={blankimage || blankimage}
                    className='h-full w-full'
                  />
                </div>
                <div className='mt-2  rounded-tl-md bg-body  bg-opacity-30 p-2  '>
                  {' '}
                  <input
                    type='file'
                    onChange={(e) => {
                      setDocument({
                        ...Document,
                        MSMECertificat: e.target.files[0],
                      });
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div>
              <button className='bg-meta-3 px-4 py-2 text-white'> Save</button>
            </div>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
};

export default AddDocuments;
