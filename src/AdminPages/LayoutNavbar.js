import { Outlet, useLocation } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import SideNavbar from './SideNavbar'
function LeftNabar() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/admin/payment-history';
  return (
    <>
        <AdminNavbar/>
        <div className='d-flex'>
          {!hideSidebar && <SideNavbar />}
          <Outlet/>
        </div>
    </>
  )
}
export default LeftNabar
