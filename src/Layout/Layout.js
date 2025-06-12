import NavPage from '../Pages/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer'
function Layout() {
  
  return (
    <div>
        <div>
          <NavPage />
          <Outlet />
          <Footer />
        </div>
   
    </div>
  )
}

export default Layout
