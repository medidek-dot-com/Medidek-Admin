import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DefaultLayout from "../layout/DefaultLayout";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { Link, NavLink } from "react-router-dom";
import Button from "@inovua/reactdatagrid-community/packages/Button";
import { AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai";
import AccordionRenderer from "../components/AccordionRenderer";

const customCellStyle = (cellProps) => {
    const { value, rowActive } = cellProps;
    return {
        color: rowActive ? "#e9ecf0" : value % 2 ? "#ff595e" : "inherit",
    };
};

Modal.setAppElement("html");

const Doctor = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const columns = [
        {
            name: "_index",
            header: "#",
            width: 50,
            defaultWidth: 50,
            render: ({ data, rowIndex }) => rowIndex + 1,
            sortable: false,
            resizable: false,
        },
        {
            name: "Name_of_Hospital_company",
            header: "Hospital Company",
            minWidth: 150,
            defaultFlex: 1,
        },
        {
            name: "Hotel_name",
            header: "Hospital Name",
            minWidth: 150,
            defaultFlex: 1,
        },
        {
            name: "Hotel_type",
            header: "Hospital Type",
            minWidth: 120,
            defaultFlex: 1,
        },
        {
            name: "Mobile_no",
            header: "Contact",
            minWidth: 130,
            defaultFlex: 1,
            isPrimaryKey: true,
        },
        {
            name: "Hotel_email",
            header: "Email",
            minWidth: 170,
            defaultFlex: 1,
            isPrimaryKey: true,
        },
        {
            name: "created_at",
            header: "Date",
            minWidth: 120,
            defaultFlex: 1,
        },
        {
            name: "City",
            header: "City",
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "Website_hotel",
            header: "Hospital Email",
            minWidth: 190,
            defaultFlex: 1,
        },
        {
            name: "price",
            header: "Price",
            minWidth: 60,
            defaultFlex: 1,
            render: ({ data }) => <p>₹ {data.price} </p>,
        },
        {
            name: "Status",
            header: "Status",
            minWidth: 120,
            render: ({ data }) => (
                <div className="flex">
                    {data.Status ? (
                        <>
                            {" "}
                            <AiTwotoneLock className="h-8 w-6 cursor-pointer text-meta-1" />
                        </>
                    ) : (
                        <>
                            <AiTwotoneUnlock className="h-8 w-6 cursor-pointer text-meta-3" />{" "}
                        </>
                    )}
                    <NavLink to={`/swagmanager/${data._id}/dashboard`}>
                        <button className="bg-meta-6 p-1 px-4 text-white">
                            CRS
                        </button>
                    </NavLink>
                </div>
            ),
            defaultFlex: 1,
        },
        {
            name: "Featured",
            header: "Featured",
            render: ({ data }) => (
                <>
                    <div>Featured</div>
                </>
            ),
            minWidth: 130,
            defaultFlex: 1,
        },
        {
            name: "Recommend",
            header: "Recommend",
            render: ({ data }) => (
                <>
                    <div>Recommend</div>
                </>
            ),
            minWidth: 130,
            defaultFlex: 1,
        },

        // {
        //   name: 'Discount',
        //   header: 'Discount',
        //   minWidth: 200,
        //   defaultFlex: 1,
        //   style: customCellStyle,
        //   render: ({ data }) => {
        //     return (

        //     );
        //   },
        // },
        {
            name: "Action",
            header: "Action",
            minWidth: 650,
            defaultFlex: 1,
            style: customCellStyle,
            render: ({ data }) => {
                return (
                    <div className="flex gap-2">
                        <NavLink to={`/hotel/updateHotel/${data._id}`}>
                            <Button>Edit</Button>
                        </NavLink>
                        <NavLink to={`/hotel/updateHotel/${data._id}/gallery`}>
                            <Button>Gallery</Button>
                        </NavLink>
                        <NavLink
                            to={`/hotel/updateHotel/${data._id}/bankdetails`}
                        >
                            <Button>Bank</Button>
                        </NavLink>
                        <NavLink to={`/hotel/updateHotel/${data._id}`}>
                            <Button>Ratings</Button>
                        </NavLink>
                        <NavLink
                            to={`/hotel/updateHotel/${data._id}/documents`}
                        >
                            <Button>Documents</Button>
                        </NavLink>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen2(!isOpen2);
                                getHotelType(data._id);
                            }}
                        >
                            Booking Type
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(!isOpen);
                                getHotelType(data._id);
                            }}
                        >
                            Discount
                        </Button>
                        <NavLink to={`/hotel/updateHotel/${data._id}`}>
                            <Button>Other</Button>
                        </NavLink>
                    </div>
                );
            },
        },
        // { name: 'status', header: 'Status', minWidth: 80, defaultFlex: 1 },
        // {
        //   headerName: 'Details',
        //   name: 'Details',
        //   minWidth: 150,
        //   defaultFlex: 1,
        //   cellRendererFramework: AccordionRenderer,
        //   cellRendererParams: {
        //     value: (params) => params.value.summary,
        //     details: (params) => params.value.details,
        //   },
        // },
    ];

    const rowClass = `dark:bg-boxdark-2 dark:text-bodydark`;
    const gridStyle = { minHeight: 650 };

    const defaultFilterValue = [
        { name: "City", operator: "startsWith", type: "string", value: "" },
        {
            name: "Hotel_name",
            operator: "startsWith",
            type: "string",
            value: "",
        },
    ];

    const SEPARATOR = ",";
    // let [hotelData, sethotelData] = useState([]);
    // console.log(hotelData);
    // async function deletAll() {
    //   let result = await axios.delete(
    //     'https://swagstay-db-new.onrender.com/Addhotel'
    //   );
    //   console.log(result);
    // }
    const [gridRef, setGridRef] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        loadData();
        setRows(dataSource);
    }, []);

    const DATASET_URL = "https://swagstay-db-new.onrender.com/Addhotel";

    const [dataSource, setDataSource] = useState([]);

    let [hotelType, setHotelType] = useState({
        hotelType: "",
        status: "",
        stateName: "",
    });

    // Update Hotel Type Method

    // const { id } = useParams();
    const getHotelType = async (hotelType_id) => {
        try {
            let response = await axios.get(
                `https://swagstay-db-new.onrender.com/AddhotelfindbyID/${hotelType_id}`
            );
            console.log(response.data.data);
            setHotelType(response.data.data);

            // return response.data.result;
        } catch (error) {
            console.log("Error while calling getHotelTypeByID API", error);
        }
    };

    async function updateHotelType(id) {
        try {
            let result = await axios.put(
                `https://swagstay-db-new.onrender.com/updateHotel/${id}`,
                hotelType
                // config
            );
            toast.success("Hotel Type Updated successfully!");
            console.log(result);
        } catch (err) {
            toast.error("Something went wrong!");
            console.log("Error while updating Hotel", err);
        }
    }
    // const [columns] = useState(columns);
    const [showColumnMenuTool, setShowColumnMenuTool] = useState(true);

    const loadData = useCallback(() => {
        const newDataSource = () => {
            return fetch(DATASET_URL).then((response) => {
                return response.json().then((data) => {
                    return data;
                });
            });
        };

        setDataSource(newDataSource);
    }, []);

    const renderRowContextMenu = (menuProps, { rowProps }) => {
        menuProps.autoDismiss = true;
        menuProps.items = [
            {
                label: "Column " + rowProps.rowIndex,
            },
        ];
    };

    console.log(dataSource);

    // Export to excel
    const downloadBlob = (blob, fileName = "grid-data.xlsx") => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.position = "absolute";
        link.style.visibility = "hidden";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };
    const exportCSV = () => {
        const columns = gridRef.current.visibleColumns;

        const header = columns.map((c) => c.name).join(SEPARATOR);
        const rows = gridRef.current.data.map((data) =>
            columns.map((c) => data[c.id]).join(SEPARATOR)
        );

        const contents = [header].concat(rows).join("\n");
        const blob = new Blob([contents], { type: "text/xlsx;charset=utf-8;" });

        downloadBlob(blob);
    };

    // const exportToPdf = () => {
    //   // create a new PDF document
    //   const doc = new jsPDF();
    //   // set the title of the document
    //   doc.setProperties({ title: 'Hotel List' });
    //   // define the columns to export
    //   const exportColumns = columns.map((column) => ({
    //     header: column.header,
    //     dataKey: column.key,
    //   }));
    //   // define the rows to export
    //   const exportRows = rows.map((row) =>
    //     exportColumns.reduce(
    //       (obj, col) => ({
    //         ...obj,
    //         [col.dataKey]: row[col.dataKey],
    //       }),
    //       {}
    //     )
    //   );
    //   // add the table to the document
    //   doc.autoTable({
    //     head: [exportColumns.map((col) => col.header)],
    //     body: exportRows,
    //   });
    //   // save the document
    //   doc.save('Hotels-list-admin.pdf');
    // };

    return (
        <>
            <DefaultLayout>
                <div className="flex justify-center">
                    {isOpen && (
                        <Modal
                            isOpen={isOpen}
                            onRequestClose={() => setIsOpen(false)}
                            className="modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[40rem] lg:top-[5rem]"
                            overlayClassName="overlay"
                        >
                            <div className="relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="flex flex-col gap-3 p-8">
                                    <h1 className="text-xl font-semibold">
                                        Add Discount
                                    </h1>
                                    <div>
                                        <label className="mb-1 block text-black dark:text-white">
                                            Amount
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Amount"
                                            name={hotelType.price}
                                            defaultValue={hotelType.price}
                                            onChange={(e) => {
                                                setHotelType({
                                                    ...hotelType,
                                                    price: e.target.value,
                                                });
                                            }}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-black dark:text-white">
                                            Discount Amount
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Discount"
                                            name={hotelType.status}
                                            defaultValue={hotelType.status}
                                            onChange={(e) => {
                                                setHotelType({
                                                    ...hotelType,
                                                    status: e.target.value,
                                                });
                                            }}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                    <button
                                        onClick={() =>
                                            updateHotelType(hotelType._id)
                                        }
                                        className="w-full rounded-lg bg-meta-3 p-2 text-white"
                                    >
                                        Update
                                    </button>
                                </div>
                                <button
                                    className="absolute top-2 right-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    X
                                </button>
                            </div>
                        </Modal>
                    )}
                    {isOpen2 && (
                        <Modal
                            isOpen={isOpen2}
                            onRequestClose={() => setIsOpen2(false)}
                            className="modal absolute top-[5rem] right-[5rem] z-[100] rounded bg-white shadow-lg lg:right-[40rem] lg:top-[5rem]"
                            overlayClassName="overlay"
                        >
                            <div className="relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="flex flex-col gap-3 p-8">
                                    <h1 className="text-xl font-semibold">
                                        Update Booking Type
                                    </h1>
                                    <div>
                                        <label className="mb-1 block text-black dark:text-white">
                                            Booking Type
                                        </label>
                                        <select
                                            name={hotelType.price}
                                            defaultValue={hotelType.price}
                                            onChange={(e) => {
                                                setHotelType({
                                                    ...hotelType,
                                                    price: e.target.value,
                                                });
                                            }}
                                            className="w-full rounded-lg border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        >
                                            <option
                                                value={"Advance + Full Amount"}
                                            >
                                                Pay at Hotel
                                            </option>
                                            <option
                                                value={
                                                    "Hotel Pay + Full Amount"
                                                }
                                            >
                                                Pay Now
                                            </option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={() =>
                                            updateHotelType(hotelType._id)
                                        }
                                        className="w-full rounded-lg bg-meta-3 p-2 text-white"
                                    >
                                        Update
                                    </button>
                                </div>
                                <button
                                    className="absolute top-2 right-2"
                                    onClick={() => setIsOpen2(false)}
                                >
                                    X
                                </button>
                            </div>
                        </Modal>
                    )}
                </div>
                <div className="">
                    <h1 className="text-2xl font-bold">Hospital Master</h1>
                    <div className="flex items-center justify-between">
                        <div className="text-grey-900 my-2 inline-block gap-6 bg-white p-1 px-2">
                            <label for="city" className="mr-5">
                                Select City:
                            </label>
                            <select
                                name="city"
                                id="city"
                                className="pr-5 text-boxdark outline-none focus:ring-0"
                            >
                                <option value="Nagpur">Nagpur</option>
                                <option value="Wardha">Wardha</option>
                                <option value="Goa">Goa</option>
                            </select>
                        </div>
                        <Link to="/admin/addDoctor">
                            <button className="h-fit bg-meta-3 p-2 px-4 text-white">
                                Add Doctor
                            </button>
                        </Link>
                    </div>
                    <div className="my-2 flex items-center gap-2">
                        {/* <button
              className='bg-meta-3 p-2 px-4 text-white'
              onClick={exportToPdf}
            >
              Export to PDF
            </button> */}
                        <button
                            className="bg-meta-3 p-2 px-4 text-white"
                            onClick={exportCSV}
                        >
                            Export to Excel
                        </button>
                    </div>
                    <ReactDataGrid
                        idProperty="serial"
                        handle={setGridRef}
                        columns={columns}
                        rows={rows}
                        dataSource={dataSource}
                        style={gridStyle}
                        rowClass={rowClass}
                        virtualizeColumns={true}
                        defaultFilterValue={defaultFilterValue}
                        showColumnMenuTool={showColumnMenuTool}
                        theme={"default-light dark:default-dark"}
                        renderRowContextMenu={renderRowContextMenu}
                    />
                </div>
            </DefaultLayout>
        </>
    );
};

export default Doctor;
