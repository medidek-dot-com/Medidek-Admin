import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
const AddGallery = () => {
  let { id } = useParams();
  let [updatedimage, setupdatedimg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  console.log(updatedimage);
  let [image, setImage] = useState([]);
  let [photos, setphotos] = useState([]);
  let [gallery, setgallery] = useState({});
  console.log(gallery);
  useEffect(() => {
    Gethotelimage();
  }, []);

  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const navigate = useNavigate();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  // async function addHotel(e) {
  //   let result = await axios.post(
  //     'https://swagstay-db-new.onrender.com/hoteluser',
  //     hotelUser
  //   );
  //   console.log(result);
  //   if (result.status === 200) {
  //     toast('hotelUser added successfully');
  //     navigate('/hoteluser');
  //   } else {
  //     toast('please try again');
  //   }
  // }
  async function Gethotelimage() {
    let result = await axios(
      `https://swagstay-db-new.onrender.com/AddhotelfindbyID/${id}`
    );
    console.log(result);
    setImage(result.data.data);
    console.log(image.image);
  }

  async function geturlofimg(e) {
    let result = await axios.post(
      'https://swagstay-db-new.onrender.com/uploadimage',
      { image: e },
      config
    );
    console.log(result);
    console.log(updatedimage);
    setupdatedimg(result.data.val);
  }
  async function Updatemainimage() {
    let result = await axios.put(
      `https://swagstay-db-new.onrender.com/updatehotelmainimg/${id}`,
      { updatedimage: updatedimage }
    );
    console.log(result);
    if (result.status === 200) {
      toast('hotelUser added successfully');
    } else {
      toast('please try again');
    }
  }
  async function Uploadimages() {
    setIsOpen(false);
    for (let key in gallery) {
      let result = await axios.post(
        `https://swagstay-db-new.onrender.com/uploadimage`,
        { image: gallery[key] },
        config
      );
      console.log(result.data.val);
      if (result.status === 200) {
        setphotos((prev) => {
          return [...prev, result.data.val];
        });
      }
    }
  }
  async function imagesupload() {
    let upload = await axios.put(
      `https://swagstay-db-new.onrender.com/addhotelgallery/${id}`,
      { photos: photos }
    );
    if (upload === 200) {
      toast.success('images added');
    }
  }
  console.log(image.gallery);
  return (
    <>
      <DefaultLayout>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className='modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[40rem] lg:top-[20rem]'
            overlayClassName='overlay'
          >
            <div className='relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='flex flex-col gap-3 p-8'>
                <h1 className='text-xl font-semibold'> UPload Images</h1>
                <div className='text-center'>
                  <input
                    type='file'
                    multiple
                    onChange={(e) => {
                      // Uploadimages(e.target.files);
                      setgallery(e.target.files);
                    }}
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  ></input>
                  <button
                    className='mt-4 h-fit bg-meta-3 p-2 px-4 text-white'
                    onClick={Uploadimages}
                  >
                    ADD
                  </button>
                </div>
              </div>
              <button
                className='absolute top-2 right-2'
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                X
              </button>
            </div>
          </Modal>
        )}
        <ToastContainer position='top-center'></ToastContainer>
        <div>
          <h1 className='dark:text-gray-50 text-2xl font-bold md:text-4xl'>
            Hotel Image Gallery
          </h1>
          <div className='my-4 box-border rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-col gap-5.5 p-6.5'>
              <div className='flex gap-10'>
                <div className='w-1/2'>
                  <label className='mb-3 block text-black dark:text-white'>
                    Add Hotel Images<span className='text-meta-1'>*</span>:
                  </label>
                  <ImageUploadPreviewComponent />
                  {/* <input
                  type='text'
                  name='name'
                  required
                  placeholder='Enter Personal Name'
                  onChange={(e) =>
                    setHotelUser({
                      ...hotelUser,
                      name: e.target.value,
                    })
                  }
                  className='w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                /> */}
                </div>
              </div>
              <div className='w-1/2 '>
                <h1 className={'text-2xl font-bold'}>Main Image</h1>
                <div className='h-50 w-50'>
                  {' '}
                  <img src={image.image}></img>
                </div>
                <div className='mt-4 flex  gap-4'>
                  <button
                    className='mb-6 inline-block w-fit bg-meta-3 p-2 px-4 text-white'
                    onClick={() => {
                      Updatemainimage();
                    }}
                  >
                    Update
                  </button>
                  <input
                    type='file'
                    onChange={(e) => {
                      geturlofimg(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className='my-4 box-border'>
                  <hi className='dark:text-gray-50  text-2xl font-bold md:text-4xl'>
                    Hotel Gallery
                  </hi>
                  <button
                    className='float-right mt-2 mb-6 inline-block w-fit rounded bg-meta-3 p-2 px-4 text-white'
                    onClick={() => setIsOpen(true)}
                  >
                    Add images
                  </button>
                </div>
                <div className='flex w-full  flex-wrap  justify-evenly px-4  py-6 align-middle'>
                  <div className='text-center'>
                    <div className='border-1 h-40 w-50 border-2 bg-white'>
                      <img src={image.image} className='h-full w-full'></img>
                    </div>
                    <div className='flex justify-center gap-2'>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-3 p-2 px-4 text-white'>
                        update
                      </button>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-1 p-2 px-4 text-white'>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='border-1 h-40 w-50 border-2 bg-white'>
                      <img src={image.image} className='h-full w-full'></img>
                    </div>
                    <div className='flex justify-center gap-2'>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-3 p-2 px-4 text-white'>
                        update
                      </button>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-1 p-2 px-4 text-white'>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='border-1 h-40 w-50 border-2 bg-white'>
                      <img src={image.image} className='h-full w-full'></img>
                    </div>
                    <div className='flex justify-center gap-2'>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-3 p-2 px-4 text-white'>
                        update
                      </button>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-1 p-2 px-4 text-white'>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='border-1 h-40 w-50 border-2 bg-white'>
                      <img src={image.image} className='h-full w-full'></img>
                    </div>
                    <div className='flex justify-center gap-2'>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-3 p-2 px-4 text-white'>
                        update
                      </button>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-1 p-2 px-4 text-white'>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='border-1 h-40 w-50 border-2 bg-white'>
                      <img src={image.image} className='h-full w-full'></img>
                    </div>
                    <div className='flex justify-center gap-2'>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-3 p-2 px-4 text-white'>
                        update
                      </button>
                      <button className='mt-2 mb-6 inline-block w-fit rounded bg-meta-1 p-2 px-4 text-white'>
                        Delete
                      </button>
                    </div>
                  </div>{' '}
                </div>
              </div>

              <button
                onClick={() => {
                  addHotel();
                  imagesupload();
                }}
                className='mb-6 mt-0 inline-block w-fit bg-meta-3 p-2 px-4 text-white'
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AddGallery;

class ImageUploadPreviewComponent extends Component {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      file: [null],
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
    console.log(this.state.file);
    console.log(this.fileArray);
  }

  render() {
    return (
      <div>
        <div className='form-group multi-preview box-border flex flex-wrap gap-5'>
          {(this.fileArray || []).map((url) => (
            <div className='box-border flex h-1/4 w-1/4 flex-grow-0 flex-col gap-2'>
              <img src={url} alt='...' className='h-full w-full' />
              <button className='w-fit rounded border border-meta-1 text-meta-1'>
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className='form-group my-4'>
          <input
            type='file'
            className='form-control'
            onChange={this.uploadMultipleFiles}
            multiple
          />
        </div>
        {/* <button
          type='button'
          className='btn btn-danger btn-block'
          onClick={this.uploadFiles}
        >
          Upload
        </button> */}
      </div>
    );
  }
}
