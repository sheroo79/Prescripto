import React from 'react'
import { Outlet } from 'react-router-dom'
import DrNavbar from './DoctorNavbar'
import SideNavbar from './DrSideNavbar'
import { UserProvider } from '../Components/UserContext'
function Layout() {
  return (
    <>
        <UserProvider>
        <DrNavbar/>
        <div className='d-flex'>
            <SideNavbar/>
            <Outlet/>
        </div>
        </UserProvider>
    </>
  )
}

export default Layout
