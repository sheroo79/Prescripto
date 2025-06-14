import { MdDashboard } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/AdminStyle.scss';
import { FaUserClock } from "react-icons/fa";
function SideNavbar() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)
  return (
    <div className='side-navbar'>
        <ul>
          <li onClick={()=> navigate('/doctor/doctor-dashboard')}  className={location.pathname === '/doctor/doctor-dashboard' ? 'blue' : ''}><MdDashboard className='fs-3'/> DashBoard</li>
          <li onClick={()=> navigate('/doctor/Dr-ViewAppointment')}  className={location.pathname === '/doctor/Dr-ViewAppointment' ? 'blue' : ''}><i className="ri-calendar-2-fill"></i> Appointments</li>
          <li onClick={()=> navigate('/doctor/schedule')}  className={location.pathname === '/doctor/schedule' ? 'blue' : ''}><FaUserClock className="fs-4"/> My Schedule</li>
        </ul>
    </div> 
  )
}

export default SideNavbar
