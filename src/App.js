import "./App.css";
import Layout from "./Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllDr from "./Pages/Doctors";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import CreateAccout from "../src/auth/SignUp";
import Profile from "./Pages/Profile";
import Drdetail from "../src/Pages/DoctorDetails";
import Login from "./auth/Login";
import "react-toastify/dist/ReactToastify.css";
import Appointments from "./Pages/Appointments";
import Dashboard from "./AdminPages/Dashboard";
import ViewAppointment from "./AdminPages/ViewAppointment";
import AddDoctor from "./AdminPages/AddDoctor";
import DoctorList from "./AdminPages/DoctorList";
import LeftNabar from "./AdminPages/LayoutNavbar";
import TestApi from "./TestApi";
import AdminDrDetails from './AdminPages/AdminDrDetails'
import AdminNavbar from './AdminPages/AdminNavbar'
import DrsideNavbar from './DoctorPage/DrSideNavbar'
import DrLayout from './DoctorPage/Layout'
import DRViewApp from './DoctorPage/DrViewAppointment'
import Patients from "./AdminPages/Patients";
import AdminProfile from './AdminPages/AdminProfile'
// Routes
import PatientRoute from "./Components/PatientRoute";
import AdminRoute from "./Components/AdminRoute"
import DoctorRoute from "./Components/DoctorRoute"
import DoctorProfle from "./DoctorPage/DoctorProfle";
import DoctorDashboard from "./DoctorPage/DoctorDashboard";
import ScrollToTop from "./Components/ScrollToTop";
function App() {
  return (
    <>
      
      <BrowserRouter>  
        <ScrollToTop/>        
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="doctors/:field?" element={<AllDr />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="signUp" element={<CreateAccout />} />
              <Route path="login" element={<Login />} />
              <Route path="doctorDetail/:id?" element={<Drdetail />} />
              <Route path="testApi" element={<TestApi />} />
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
                  <Route path="Dr-sideBar" element={<DrsideNavbar/>}/>
                  <Route path="Dr-ViewAppointment" element={<DRViewApp/>}/>
                  <Route path="Doctor-profile" element={<DoctorProfle/>}/>
                </Route>  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// SecurePass123!