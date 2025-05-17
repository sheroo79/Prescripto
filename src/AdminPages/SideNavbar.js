import React from 'react'
import '../Css/AdminStyle.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
function SideNavbar() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)
  return (
    <div className='side-navbar'>
        <ul>
         <li onClick={()=> navigate('/admin-dashboard')} className={location.pathname === '/admin-dashboard' ? 'blue' : ''}><MdDashboard className='fs-3'/> Dashboard</li>
         <li onClick={()=> navigate('/view-appointment')}  className={location.pathname === '/view-appointment' ? 'blue' : ''}><i className="ri-calendar-2-fill"></i> Appointments</li>
         <li onClick={()=> navigate('/add-doctor')}  className={location.pathname === '/add-doctor' ? 'blue' : ''}><i className="ri-sticky-note-add-line"></i>Add Doctors</li>
         <li onClick={()=> navigate('/doctor-list')}  className={location.pathname === '/doctor-list' ? 'blue' : ''}><i className="ri-group-line" ></i> Doctors List</li>
         <li onClick={()=> navigate('/patients')}  className={location.pathname === '/patients' ? 'blue' : ''}><i class="ri-parent-fill"></i> Patients</li>
        </ul>
    </div> 
  )
}

export default SideNavbar
