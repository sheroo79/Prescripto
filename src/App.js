import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";
import CreateAccout from "../src/auth/SignUp";
import Drdetail from "../src/Pages/DoctorDetails";
import AddDoctor from "./AdminPages/AddDoctor";
import AdminDrDetails from './AdminPages/AdminDrDetails';
import AdminNavbar from './AdminPages/AdminNavbar';
import AdminProfile from './AdminPages/AdminProfile';
import Dashboard from "./AdminPages/Dashboard";
import DoctorList from "./AdminPages/DoctorList";
import LeftNabar from "./AdminPages/LayoutNavbar";
import Patients from "./AdminPages/Patients";
import ViewAppointment from "./AdminPages/ViewAppointment";
import "./App.css";
import Login from "./auth/Login";
import DrsideNavbar from './DoctorPages/DrSideNavbar';
import DRViewApp from './DoctorPages/DrViewAppointment';
import DrLayout from './DoctorPages/Layout';
import Layout from "./Layout/Layout";
import About from "./Pages/About";
import Appointments from "./Pages/Appointments";
import Contact from "./Pages/Contact";
import AllDr from "./Pages/Doctors";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import TestApi from "./TestApi";
// Routes
import { ToastContainer } from "react-toastify";
import AdminRoute from "./Components/AdminRoute";
import DoctorRoute from "./Components/DoctorRoute";
import PatientRoute from "./Components/PatientRoute";
import DoctorDashboard from "./DoctorPages/DoctorDashboard";
import DoctorProfle from "./DoctorPages/DoctorProfle";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentHistory from "./Pages/PaymentHistory";
import AdminPaymentHistory from "./AdminPages/AdminPaymentHistory";
import DoctorPaymentHistory from "./DoctorPages/DoctorPaymentHistory";
import Schedule from "./DoctorPages/Schedule";
function App() {
  return (
    <>
      
      <BrowserRouter>  
        <ToastContainer theme='colored' autoClose={2000} className="custom-toast" />        
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="doctors/:field?" element={<AllDr />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="signUp" element={<CreateAccout />} />
              <Route path="login" element={<Login />} />
              <Route path="doctorDetail/:id?" element={<Drdetail />} />
              <Route path="dummy" element={<dummyJs/>}/>
              <Route path="testApi" element={<TestApi />} />
              <Route path="payment-verify" element={<PatientRoute><PaymentSuccess/></PatientRoute>} />
              <Route path="payment-history" element={<PatientRoute><PaymentHistory/></PatientRoute>}/>
              <Route path="appointment" element={
                <PatientRoute>
                  <Appointments />
                </PatientRoute>
              } />
              <Route path="userProfile" element={<PatientRoute>
                <Profile/>
              </PatientRoute>} />
            </Route>
              {/* Admin Pages */}
              <Route path="/" element={
                <AdminRoute>
                  <LeftNabar />
                </AdminRoute>
              }>
                <Route path="admin-dashboard" element={<Dashboard />} />
                <Route path="view-appointment" element={<ViewAppointment />} />
                <Route path="add-doctor" element={<AddDoctor />} />
                <Route path="doctor-list" element={<DoctorList />} />
                <Route path="patients" element={<Patients/>}/>
                <Route path="admin-profile" element={<AdminProfile/>}/>
                <Route path="/admin/payment-history" element={<AdminPaymentHistory/>}/>
              </Route>
              <Route path="Admin-Dr-Details/:id?" element={
                <AdminRoute>
                <>
                  <AdminNavbar />
                  <AdminDrDetails />
                </>
              </AdminRoute>
              } />
                <Route path="/doctor" element={
                  <DoctorRoute>
                    <DrLayout />
                  </DoctorRoute>
                  }>
                  <Route path="doctor-dashboard" element={<DoctorDashboard/>}/>
                  <Route path="payment-history" element={<DoctorPaymentHistory/>}/>
                  <Route path="Dr-sideBar" element={<DrsideNavbar/>}/>
                  <Route path="Dr-ViewAppointment" element={<DRViewApp/>}/>
                  <Route path="Doctor-profile" element={<DoctorProfle/>}/>
                  <Route path="schedule" element={<Schedule/>}/>
                </Route>  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// SecurePass123!