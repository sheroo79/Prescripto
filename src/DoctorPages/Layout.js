import { Outlet } from 'react-router-dom'
import DrNavbar from './DoctorNavbar'
import SideNavbar from './DrSideNavbar'
function Layout() {
  
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
