import React from "react";
import Dashboard from "./pages/PMS/Dashboard";
import Analytics from "./pages/Dashboard/Analytics";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import { useSelector } from "react-redux";
import Hospitals from "./pages/Hospital/Hospitals";
import Hotel from "./pages/Hotel";
// import AddHotel from "./components/forms/AddHospital";
import HotelInstallation from "./pages/HotelInstallation";
import CustomerBooking from "./pages/CustomerBooking";
import AgentBooking from "./pages/AgentBooking";
import Addcity from "./components/forms/Addcity";
import City from "./pages/City";
import CustomerList from "./pages/CustomerList";
import Hoteltypemaster from "../src/pages/Form/HotelMaster/HotelTypeMaster";
import Roomtypemaster from "../src/pages/Form/HotelMaster/Roomtypemaster";
import Otamaster from "../src/pages/Form/HotelMaster/Otamaster";
import AddOta from "./components/forms/AddOta";
import DeparmentMAster from "../src/pages/Form/HotelMaster/DepartmentMaster";
import DesignationMaster from "../src/pages/Form/HotelMaster/DesignationMaster";
import Addservices from "../src/pages/Form/HotelMaster/Addservices";
import AddServicePackages from "../src/pages/Form/HotelMaster/Addservicespakages";
import Amenities from "../src/pages/Form/HotelMaster/Amenities";
import BussinusManager from "../src/pages/Form/HotelMaster/BusinessManager";
import Swaguser from "../src/pages/Form/HotelMaster/Swaguser";
import Addswaguser from "./components/forms/Addswaguser";
import Agentuser from "../src/pages/Form/HotelMaster/Addagentuser";
import AddAgentuser from "./components/forms/Addagentuser";
import Hoteluser from "../src/pages/Form/HotelMaster/Hoteluser";
import AddHoteluser from "./components/forms/AddHoteluser";
import CitySequence from "../src/pages/Form/HotelMaster/citysequnces";
import Promocodes from "./pages/Form/WebAppMaster/Promocodes";
import ADDpromocodes from "./components/Webappmaster/Promocode";
import UpcomingProperty from "./pages/Form/WebAppMaster/UpcomingProperty";
import Business from "./pages/Form/WebAppMaster/Business";
import Team from "./pages/Form/WebAppMaster/Team";
import Notifications from "./pages/Form/WebAppMaster/Notifications";
import ContactUs from "./pages/Form/WebAppMaster/Contactus";
import Subscribe from "./pages/Form/WebAppMaster/Subscribe";
import Viewvacancy from "../src/pages/Form/Career/Viewvacancy";
import Jobapplication from "../src/pages/Form/Career/jobapplication";
import OnlinePayment from "./pages/Form/Reports/OnlinePayment";
import PromocodeReport from "./pages/Form/Reports/PromocodeReport";
import CommissionReport from "./pages/Form/Reports/CommissionReport";
import RatingReport from "./pages/Form/Reports/RatingReport";
import WalletReport from "./pages/Form/Reports/WalletReport";
import AgentReport from "./pages/Form/Reports/AgentReport";
import RefferReport from "./pages/Form/Reports/RefferReport";
import BtcReport from "./pages/Form/Reports/BtcReport";
import Leadsapi from "../src/pages/Form/Leade Api/Leadsapi";
import Doctor from "./pages/Doctor";
import AddDoctor from "./components/AddDoctor";
import AddHospital from "./components/forms/AddHospital";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBlogs from "./components/AddBlogs";
import Blogs from "./pages/Blogs";

// import PrivacyPolicy from "./pages/Form/WebAppMaster/PrivacyPolicy";

const App = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return (
        <>
            <Routes>
                {!isLoggedIn ? (
                    <Route
                        path="/*"
                        element={<Navigate replace to="/login" />}
                    />
                ) : (
                    <Route
                        path="/"
                        element={<Navigate replace to="/dashboard" />}
                    />
                )}
                <Route path="/login" element={<Login />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
                <Route element={<ProtectedRoute />}>
                    <Route exact path="/dashboard" element={<Analytics />} />
                    {/* <Route exact path="/hospitals" element={<Hospitals />} /> */}
                    <Route exact path="/hospitals" element={<Hotel />} />
                    <Route exact path="/doctors" element={<Doctor />} />
                    <Route exact path="/blogs" element={<Blogs />} />
                    <Route
                        exact
                        path="/admin/addHospital"
                        element={<AddHospital />}
                    />
                    <Route
                        exact
                        path="/admin/addDoctor"
                        element={<AddDoctor />}
                    />
                    <Route
                        exact
                        path="/admin/addblogs"
                        element={<AddBlogs />}
                    />
                    <Route
                        path="/installation"
                        element={<HotelInstallation />}
                    />
                    <Route
                        exact
                        path="/customerBooking"
                        element={<CustomerBooking />}
                    />
                    <Route
                        exact
                        path="/agentBooking"
                        element={<AgentBooking />}
                    />
                    <Route exact path="/cities/addCity" element={<Addcity />} />
                    <Route exact path="/cities" element={<City />} />
                    <Route
                        exact
                        path="/customerList"
                        element={<CustomerList />}
                    />
                    <Route path="/Hotelmaster" element={<Hoteltypemaster />} />
                    <Route
                        path="/roomtypemaster"
                        element={<Roomtypemaster />}
                    />
                    <Route exact path="/otamaster" element={<Otamaster />} />
                    <Route
                        exact
                        path="/otamaster/addOta"
                        element={<AddOta />}
                    />
                    <Route
                        path="/deparmentmaster"
                        element={<DeparmentMAster />}
                    />
                    <Route
                        path="/designationmaster"
                        element={<DesignationMaster />}
                    />
                    <Route
                        exact
                        path="/addservices"
                        element={<Addservices />}
                    />
                    <Route
                        path="/servicespackage"
                        element={<AddServicePackages />}
                    />
                    <Route path="/amenities" element={<Amenities />} />
                    <Route
                        path="/businessmanager"
                        element={<BussinusManager />}
                    />
                    <Route exact path="/swaguser" element={<Swaguser />} />
                    <Route
                        path="/swaguser/Addswaguser"
                        element={<Addswaguser />}
                    />
                    <Route path="/agentuser" element={<Agentuser />} />
                    <Route
                        path="/agentuser/addAgentuser"
                        element={<AddAgentuser />}
                    />
                    <Route exact path="/hoteluser" element={<Hoteluser />} />
                    <Route
                        path="/hoteluser/addHotelUser"
                        element={<AddHoteluser />}
                    />
                    <Route path="/citysequences" element={<CitySequence />} />
                    <Route
                        path="/web-master/promocodes"
                        element={<Promocodes />}
                    />
                    <Route
                        exact
                        path="/web-master/addpromocodes"
                        element={<ADDpromocodes />}
                    />
                    <Route
                        exact
                        path="/web-master/upcomingProperty"
                        element={<UpcomingProperty />}
                    />
                    <Route
                        exact
                        path="/web-master/business"
                        element={<Business />}
                    />
                    <Route exact path="/web-master/team" element={<Team />} />
                    <Route
                        exact
                        path="/web-master/notifications"
                        element={<Notifications />}
                    />
                    <Route
                        exact
                        path="/web-master/contactus"
                        element={<ContactUs />}
                    />
                    <Route
                        exact
                        path="/web-master/subscribe"
                        element={<Subscribe />}
                    />
                    <Route
                        exact
                        path="/viewvacancy"
                        element={<Viewvacancy />}
                    />
                    <Route
                        exact
                        path="/jobapplication"
                        element={<Jobapplication />}
                    />
                    <Route
                        exact
                        path="/reports/onlinePayment"
                        element={<OnlinePayment />}
                    />
                    <Route
                        exact
                        path="/reports/promocodeReport"
                        element={<PromocodeReport />}
                    />
                    <Route
                        exact
                        path="/reports/commissionReport"
                        element={<CommissionReport />}
                    />
                    <Route
                        exact
                        path="/reports/ratingReport"
                        element={<RatingReport />}
                    />
                    <Route
                        exact
                        path="/reports/walletReport"
                        element={<WalletReport />}
                    />
                    <Route
                        exact
                        path="/reports/agentReport"
                        element={<AgentReport />}
                    />
                    <Route
                        exact
                        path="/reports/refferReport"
                        element={<RefferReport />}
                    />
                    <Route
                        exact
                        path="/reports/btcReport"
                        element={<BtcReport />}
                    />
                    <Route exact path="/leadsapi" element={<Leadsapi />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
