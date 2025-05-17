import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNavbar from './SideNavbar'
import AdminNavbar from './AdminNavbar'
import { UserProvider } from '../Components/UserContext'
function LeftNabar() {
  return (
    <>
      <UserProvider>
        <AdminNavbar/>
        <div className='d-flex'>
          <SideNavbar/>
          <Outlet/>
        </div>
      </UserProvider>
      
    </>
  )
}
export default LeftNabar
