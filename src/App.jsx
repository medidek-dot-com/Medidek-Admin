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
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                    <Route exact path="/dashboard" element={<Analytics />} />
                    {/* <Route exact path="/hospitals" element={<Hospitals />} /> */}
                    <Route exact path="/hospitals" element={<Hotel />} />
                    <Route exact path="/doctors" element={<Doctor />} />
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
                {/* <Route
                    exact
                    path="/web-master/privacyPolicy"
                    element={<PrivacyPolicy />}
                /> */}
            </Routes>
        </>
    );
};

export default App;

// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Analytics from "./pages/Dashboard/Analytics";
// import Calendar from "./pages/Calendar";
// import Profile from "./pages/Profile";
// import FormElements from "./pages/Form/FormElements";
// import FormLayout from "./pages/Form/FormLayout";
// import Tables from "./pages/Tables";
// import Settings from "./pages/Settings";
// import Chart from "./pages/Chart";
// import Alerts from "./pages/UiElements/Alerts";
// import Buttons from "./pages/UiElements/Buttons";
// import SignIn from "./pages/Authentication/SignIn";
// import SignUp from "./pages/Authentication/SignUp";
// import Hotel from "./pages/Hotel";
// import HotelInstallation from "./pages/HotelInstallation";
// import CustomerBooking from "./pages/CustomerBooking";
// import AgentBooking from "./pages/AgentBooking";
// import City from "./pages/City";
// import CustomerList from "./pages/CustomerList";
// import AddHotel from "./components/forms/AddHotel";
// import Addcity from "./components/forms/Addcity";
// import Login from "./components/forms/Login";
// import Register from "./components/forms/Register";
// import UpdateHotel from "./components/forms/UpdateHotel";
// import Loader from "./components/Loader";
// import UpdateCity from "./components/forms/UpdateCity";
// import Promocodes from "./pages/Form/WebAppMaster/Promocodes";
// import Blog from "./pages/Form/WebAppMaster/Blog";
// import Business from "./pages/Form/WebAppMaster/Business";
// import ContactUs from "./pages/Form/WebAppMaster/Contactus";
// import ImageURL from "./pages/Form/WebAppMaster/ImageURL";
// import Maintenance from "./pages/Form/WebAppMaster/Maintenance";
// import Notifications from "./pages/Form/WebAppMaster/Notifications";
// import Subscribe from "./pages/Form/WebAppMaster/Subscribe";
// import Team from "./pages/Form/WebAppMaster/Team";
// import Testimonial from "./pages/Form/WebAppMaster/Testimonial";
// import UpcomingProperty from "./pages/Form/WebAppMaster/UpcomingProperty";
// import Seo from "./pages/Form/WebAppMaster/Seo";
// import Hoteltypemaster from "../src/pages/Form/HotelMaster/HotelTypeMaster";
// import Roomtypemaster from "../src/pages/Form/HotelMaster/Roomtypemaster";
// import Otamaster from "../src/pages/Form/HotelMaster/Otamaster";
// import DeparmentMAster from "../src/pages/Form/HotelMaster/DepartmentMaster";
// import DesignationMaster from "../src/pages/Form/HotelMaster/DesignationMaster";
// import Addservices from "../src/pages/Form/HotelMaster/Addservices";
// import Addservicespackages from "../src/pages/Form/HotelMaster/Addservicespakages";
// import Amenities from "../src/pages/Form/HotelMaster/Amenities";
// import BussinusManager from "../src/pages/Form/HotelMaster/BusinessManager";
// import Swaguser from "../src/pages/Form/HotelMaster/Swaguser";
// import Agentuser from "../src/pages/Form/HotelMaster/Addagentuser";
// import Hoteluser from "../src/pages/Form/HotelMaster/Hoteluser";
// import CitySequence from "../src/pages/Form/HotelMaster/citysequnces";
// import PrivacyPolicy from "./pages/Form/WebAppMaster/PrivacyPolicy";
// import OnlinePayment from "./pages/Form/Reports/OnlinePayment";
// import PromocodeReport from "./pages/Form/Reports/PromocodeReport";
// import WalletReport from "./pages/Form/Reports/WalletReport";
// import RatingReport from "./pages/Form/Reports/RatingReport";
// import AgentReport from "./pages/Form/Reports/AgentReport";
// import RefferReport from "./pages/Form/Reports/RefferReport";
// import BtcReport from "./pages/Form/Reports/BtcReport";
// import CommissionReport from "./pages/Form/Reports/CommissionReport";
// import Viewvacancy from "../src/pages/Form/Career/Viewvacancy";
// import Jobapplication from "../src/pages/Form/Career/jobapplication";
// import Leadsapi from "../src/pages/Form/Leade Api/Leadsapi";
// import AddOta from "./components/forms/AddOta";
// import ViewOta from "../src/components/forms/ViewOta";
// import AddHoteluser from "./components/forms/AddHoteluser";
// import UpdateHoteluser from "./components/forms/UpdateHotelUser";
// import AddGallery from "./components/forms/AddGallery";
// import AddBank from "./components/forms/AddBank";
// import AddDocuments from "./components/forms/AddDocuments";
// import AddServicePackages from "../src/pages/Form/HotelMaster/Addservicespakages";
// import AddAgentuser from "./components/forms/Addagentuser";
// import Updateagentuser from "./components/forms/updateAgentuser";
// import Updateswaguser from "./components/forms/updateswaguser";
// import Addswaguser from "./components/forms/Addswaguser";
// import Dashboard from "./pages/PMS/Dashboard";
// import Reports from "./pages/PMS/Reports";
// import Roomreport from "./pages/PMS/Roomreport";
// import Room from "./pages/PMS/Setting/Room";
// import User from "./pages/PMS/Setting/User";
// import Propertydetails from "./pages/PMS/Setting/Propertydeatails";
// import Inventory from "./pages/PMS/Inventory";
// import Bookings from "./pages/PMS/Bookings";
// import NewBookings from "./pages/PMS/Newbooking";
// import ADDpromocodes from "./components/Webappmaster/Promocode";

// const App = () => {
//     console.log("hello world");
//     const [loading, setLoading] = useState(true);

//     const preloader = document.getElementById("preloader");

//     if (preloader) {
//         setTimeout(() => {
//             preloader.style.display = "none";
//             setLoading(false);
//         }, 2000);
//     }

//     useEffect(() => {
//         setTimeout(() => setLoading(false), 1000);
//     }, []);

//     const user = localStorage.getItem("token");

//     return !loading ? (
//         <>
//             <Routes>
//                 {!user ? (
//                     <Route
//                         path="/*"
//                         element={<Navigate replace to="/login" />}
//                     />
//                 ) : (
//                     <Route
//                         path="/"
//                         element={<Navigate replace to="/dashboard" />}
//                     />
//                 )}
//                 <Route path='/' element={<Navigate replace to='/dashboard' />} />
//                 <Route path="/login" exact element={<Login />} />
//                 <Route path="/register" exact element={<Register />} />
//                 <Route exact path="/dashboard" element={<Analytics />} />
//                 <Route exact path="/hotel" element={<Hotel />} />
//                 <Route exact path="/hotel/addHotel" element={<AddHotel />} />
//                 <Route
//                     exact
//                     path="/hotel/updateHotel/:id"
//                     element={<UpdateHotel />}
//                 />
//                 <Route
//                     exact
//                     path="/hotel/updateHotel/:id/gallery"
//                     element={<AddGallery />}
//                 />
//                 <Route
//                     exact
//                     path="/hotel/updateHotel/:id/bankdetails"
//                     element={<AddBank />}
//                 />
//                 <Route
//                     exact
//                     path="/hotel/updateHotel/:id/documents"
//                     element={<AddDocuments />}
//                 />
// <Route exact path="/cities/addCity" element={<Addcity />} />
//                 <Route
//                     exact
//                     path="/cities/updateCity/:id"
//                     element={<UpdateCity />}
//                 />
//                 <Route
//                     exact
//                     path="/installation"
//                     element={<HotelInstallation />}
//                 />
// <Route
//     exact
//     path="/customerBooking"
//     element={<CustomerBooking />}
// />
// <Route exact path="/agentBooking" element={<AgentBooking />} />
//                 <Route exact path="/cities" element={<City />} />
//                 <Route exact path="/customerList" element={<CustomerList />} />

//                 {/* WEB/APP Master */}
//                 <Route exact path="/web-master/blog" element={<Blog />} />
// <Route
//     exact
//     path="/web-master/business"
//     element={<Business />}
// />
// <Route
//     exact
//     path="/web-master/contactus"
//     element={<ContactUs />}
// />
//                 <Route
//                     exact
//                     path="/web-master/imageURL"
//                     element={<ImageURL />}
//                 />
//                 <Route
//                     exact
//                     path="/web-master/maintenance"
//                     element={<Maintenance />}
//                 />
{
    /* <Route
    exact
    path="/web-master/privacyPolicy"
    element={<PrivacyPolicy />}
/> */
}
<Route exact path="/web-master/notifications" element={<Notifications />} />;
//                 <Route
//                     exact
//                     path="/web-master/promocodes"
//                     element={<Promocodes />}
//                 />
// <Route
//     exact
//     path="/web-master/addpromocodes"
//     element={<ADDpromocodes />}
// />
//                 <Route exact path="/web-master/seo" element={<Seo />} />
// <Route
//     exact
//     path="/web-master/subscribe"
//     element={<Subscribe />}
// />
// <Route exact path="/web-master/team" element={<Team />} />
//                 <Route
//                     exact
//                     path="/web-master/testimonial"
//                     element={<Testimonial />}
//                 />
// <Route
//     exact
//     path="/web-master/upcomingProperty"
//     element={<UpcomingProperty />}
// />

//                 <Route path="/calendar" element={<Calendar />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/forms/form-elements" element={<FormElements />} />
//                 <Route path="/forms/form-layout" element={<FormLayout />} />
//                 <Route path="/tables" element={<Tables />} />
//                 <Route path="/settings" element={<Settings />} />
//                 <Route path="/chart" element={<Chart />} />
//                 <Route path="/ui/alerts" element={<Alerts />} />
//                 <Route path="/ui/buttons" element={<Buttons />} />
//                 <Route path="/auth/signin" element={<SignIn />} />
//                 <Route path="/auth/signup" element={<SignUp />} />

//                 {/* Hotel Master */}
// <Route
//     exact
//     path="/Hotelmaster"
//     element={<Hoteltypemaster />}
// />
{
    /* <Route exact path="/roomtypemaster" element={<Roomtypemaster />} />; */
}
{
    /* <Route exact path="/otamaster" element={<Otamaster />} /> */
}
//                 <Route exact path="/otamaster/addOta" element={<AddOta />} />
//                 <Route
//                     exact
//                     path="/otamaster/viewOta/:id"
//                     element={<ViewOta />}
//                 />
// <Route
//     exact
//     path="/deparmentmaster"
//     element={<DeparmentMAster />}
// />
// <Route
//     exact
//     path="/designationmaster"
//     element={<DesignationMaster />}
// />
// <Route exact path="/addservices" element={<Addservices />} />
// <Route
//     exact
//     path="/servicespackage"
//     element={<AddServicePackages />}
// />
// <Route exact path="/amenities" element={<Amenities />} />
// <Route
//     exact
//     path="/businessmanager"
//     element={<BussinusManager />}
// />
// <Route exact path="/swaguser" element={<Swaguser />} />
// <Route exact path="/agentuser" element={<Agentuser />} />
// <Route exact path="/hoteluser" element={<Hoteluser />} />
// <Route
//     exact
//     path="/hoteluser/addHotelUser"
//     element={<AddHoteluser />}
// />
//                 <Route
//                     exact
//                     path="/hoteluser/updateHotelUser/:id"
//                     element={<UpdateHoteluser />}
//                 />
//                 <Route exact path="/citysequences" element={<CitySequence />} />
// <Route
//     exact
//     path="/agentuser/addAgentuser"
//     element={<AddAgentuser />}
// />
//                 <Route
//                     exact
//                     path="/agentuser/updateAgentuser/:id"
//                     element={<Updateagentuser />}
//                 />
//                 <Route
//                     exact
//                     path="/swaguser/updateswaguser/:id"
//                     element={<Updateswaguser />}
//                 />
// <Route
//     exact
//     path="/swaguser/Addswaguser"
//     element={<Addswaguser />}
// />

//                 {/* Reports */}
// <Route
//     exact
//     path="/reports/onlinePayment"
//     element={<OnlinePayment />}
// />
// <Route
//     exact
//     path="/reports/promocodeReport"
//     element={<PromocodeReport />}
// />
// <Route
//     exact
//     path="/reports/commissionReport"
//     element={<CommissionReport />}
// />
// <Route
//     exact
//     path="/reports/ratingReport"
//     element={<RatingReport />}
// />
// <Route
//     exact
//     path="/reports/walletReport"
//     element={<WalletReport />}
// />
// <Route
//     exact
//     path="/reports/agentReport"
//     element={<AgentReport />}
// />
// <Route
//     exact
//     path="/reports/refferReport"
//     element={<RefferReport />}
// />
// <Route
//     exact
//     path="/reports/btcReport"
//     element={<BtcReport />}
// />

// <Route exact path="/viewvacancy" element={<Viewvacancy />} />
// <Route
//     exact
//     path="/jobapplication"
//     element={<Jobapplication />}
// />
// <Route exact path="/leadsapi" element={<Leadsapi />} />

//                 {/* PMS */}
//                 <Route
//                     exact
//                     path="/swagmanager/:id/dashboard"
//                     element={<Dashboard />}
//                 />
//                 <Route
//                     exact
//                     path="/swagmanager/:id/booking"
//                     element={<Bookings />}
//                 />
//                 <Route
//                     exact
//                     path="/swagmanager/:id/price"
//                     element={<Inventory />}
//                 />
//                 <Route
//                     exact
//                     path="/swagmanager/:id/report"
//                     element={<Reports />}
//                 />
//                 <Route
//                     exact
//                     path="/swagmanager/:id/roomReport"
//                     element={<Roomreport />}
//                 />
//                 <Route
//                     exact
//                     path="/swagmanager/:id/settings/rooms"
//                     element={<Room />}
//                 />
//                 <Route
//                     exact
//                     path="/swagmanager/:id/settings/users"
//                     element={<User />}
//                 />
//                 <Route
//                     exact
//                     path="/swagmanager/:id/settings/property"
//                     element={<Propertydetails />}
//                 />
//                 <Route
//                     exact
//                     path="/swagmanager/:id/newbooking"
//                     element={<NewBookings />}
//                 />
//             </Routes>
//         </>
//     ) : (
//         <>
//             <Loader />
//         </>
//     );
// };

// export default App;
