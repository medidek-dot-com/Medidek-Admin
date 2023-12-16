import moment from "moment";
import React, { Component, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartOne = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(
        moment().startOf("isoWeek")
    );

    const [dat, setdat] = useState([]);

    const handlePrevWeek = () => {
        setCurrentWeekStart(currentWeekStart.clone().subtract(1, "week"));
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(currentWeekStart.clone().add(1, "week"));
    };

    const weekstart = () => {
        var label = [];
        for (let i = 0; i < 7; i++) {
            const currentDay = currentWeekStart.clone().add(i, "days");
            label.push(currentDay.format("ddd DD YYYY"));
        }
        setdat(label);
    };

    useEffect(() => {
        // Fetch your chart data or update your chart with currentWeekStart
        // For now, let's just log the start and end dates of the current week
        // const currentWeekEnd = currentWeekStart.clone().endOf("isoWeek");
        const labels = [];
        weekstart();
    }, [currentWeekStart]);

    // console.log(label);
    const [data, setdata] = useState({
        series: [
            {
                name: "Cancelled",
                data: [23, 11, 22, 27, 13, 22, 37],
            },

            {
                name: "Total",
                data: [30, 25, 36, 30, 45, 35, 64],
            },
        ],
    });

    const options = {
        legend: {
            show: false,
            position: "top",
            horizontalAlign: "left",
        },
        colors: ["#3C50E0", "#80CAEE"],
        chart: {
            fontFamily: "Satoshi, sans-serif",
            height: 335,
            type: "area",
            dropShadow: {
                enabled: true,
                color: "black",
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },

            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 300,
                    },
                },
            },
            {
                breakpoint: 1366,
                options: {
                    chart: {
                        height: 350,
                    },
                },
            },
        ],
        stroke: {
            width: [2, 2],
            curve: "straight",
        },
        labels: {
            show: false,
            position: "top",
        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: true,
        },
        markers: {
            size: 4,
            colors: "#fff",
            strokeColors: ["#3056D3", "#80CAEE"],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            hover: {
                size: undefined,
                sizeOffset: 5,
            },
        },
        xaxis: {
            type: "category",
            categories: dat,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            title: {
                style: {
                    fontSize: "0px",
                },
            },
            min: 0,
            max: 100,
        },
    };

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

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-primary">
                                Cancelled Appointments
                            </p>
                            <p className="text-sm font-medium">
                                12.04.2022 - 12.05.2022
                            </p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-secondary">
                                Total Appointments
                            </p>
                            <p className="text-sm font-medium">
                                12.04.2022 - 12.05.2022
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button
                            onClick={handlePrevWeek}
                            className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
                        >
                            Previous Week
                        </button>
                        <button
                            onClick={handleNextWeek}
                            className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
                        >
                            Next Week
                        </button>
                        <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Month
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={data.series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartOne;
