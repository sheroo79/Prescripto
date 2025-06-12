import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DrNavbar from './DoctorNavbar'
import SideNavbar from './DrSideNavbar'
function Layout() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    }, [pathname]);
  
  return (
    <>
        <DrNavbar/>
        <div className='d-flex'>
            <SideNavbar/>
            <Outlet/>
        </div>
    </>
  )
}

export default Layout
