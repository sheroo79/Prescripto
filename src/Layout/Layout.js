import NavPage from '../Pages/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer'
import { UserProvider } from '../Components/UserContext'
function Layout() {
  
  return (
    <div>
      <UserProvider>
        <div>
          <NavPage />
          <Outlet />
          <Footer />
        </div>
    </UserProvider>
    </div>
  )
}

export default Layout
