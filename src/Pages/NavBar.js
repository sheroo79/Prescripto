import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Css/navpage.scss';
import { useGetUserDataQuery } from '../features/ApiSlice';
import { doctorApi } from '../features/ApiSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../features/ApiSlice';
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
function NavPage() {
  const location = useLocation()
  console.log(location)
  const ContainerRef = useRef()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
    const {data,refetch} = useGetUserDataQuery()
    useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);
  const [ulToggle, setUlToggle] = useState(null)
  const [lineStyle, setLineStyle] = useState(false)
  const [previewImage,setPreviewImage] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
console.log(isOpen)
  
  const navigate = useNavigate()
  
  const handleShow = (link) =>{
    setLineStyle(link)
  }
  const handleLogOut = (e)=>{
    e.stopPropagation();
    toast.success("Log out successfully!",{
       className:"toast-success"
    })
    dispatch(logout())
    setTimeout(() => {
      navigate('/login')
      dispatch(doctorApi.util.resetApiState())
    }, 3000);
  }

  useEffect(()=>{
    window.addEventListener("click",()=> setUlToggle(null))
    return window.removeEventListener("click",()=> setUlToggle(null))
  },[])

  useEffect(()=>{
    setPreviewImage(data?.user?.profileImage)
  },[data])
  const handleNavigate = () =>{
      navigate('/userProfile');
      setUlToggle(null)
  }
   useEffect(()=>{
        if(ContainerRef.current){
          ContainerRef.current.scrollIntoView({top: '-50px'})
        }
      },[location.pathname])
  return (
    <>
    <Navbar expand="lg" data-bs-theme="light" id='Navbar' className='pt-2'>
      <Container ref={ContainerRef} className='nav-container'>
        <Navbar.Brand className='brand-img' onClick={()=> navigate('/')}>
          <img src='https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg' alt='Brand' className="h-6 sm:h-7 md:h-9 lg:h-11 xl:h-13 2xl:h-14"/>
        </Navbar.Brand>
          <Nav navbarScroll className='nav-link hidden md:flex md:flex-row items-center gap-3'>
            <Nav.Link as={Link} to='/' onClick={()=> {handleShow('/')}} className={location.pathname === '/' ? 'line': ''}>Home</Nav.Link>
            <Nav.Link as={Link}
            to='/doctors' onClick={()=> handleShow('doctors')} className={location.pathname === '/doctors' ? 'line': ''}>All Doctors</Nav.Link>
            <Nav.Link as={Link} to='/about' onClick={()=> handleShow('about')} className={location.pathname === '/about' ? 'line': ''}>About</Nav.Link>
            <Nav.Link as={Link} to='/contact' onClick={()=> handleShow('contact')} className={location.pathname === '/contact' ? 'line': ''}>Contact</Nav.Link>
          </Nav>
        

          { localStorage.getItem("PATIENT") === "true" ? 
          <div className='userIcon' onClick={(e)=> {setUlToggle(!ulToggle);e.stopPropagation()}}>
            {
              previewImage !== undefined ? 
              <div className='nav-img-icon h-7 w-7 mt-1 relative bg-[#63DFA6] rounded-full overflow-hidden' >
              <img src={previewImage} alt='ProfileUserImg'/>
            </div> : <FontAwesomeIcon icon={faCircleUser} className='user h-7 w-7 mt-1'/>
            }
            <i className="ri-arrow-drop-down-line text-[#5F6FFF] text-2xl mt-1 -mr-1">
              {
                ulToggle && <ul>
                <li onClick={(e)=> {e.stopPropagation();
                  handleNavigate()
                  }}>My Profile</li>
                <li onClick={()=> {
                    navigate('/appointment')
                }}>My Appointment</li>
                <li onClick={()=> {
                    navigate('/payment-history')
                }}>Payments History</li>
                <li onClick={(e)=> {
                    handleLogOut(e);
                    setUlToggle(null)
                }}>Log Out</li>
              </ul>
              }
            </i>
            <RiMenu3Fill className='text-[#5F6FFF] text-2xl mt-1 md:hidden' onClick={(e)=> {
              e.stopPropagation()
              setIsOpen(true)
            }}/>
          </div> : <Button className='nav-Btn' onClick={()=> navigate('/signUp')}>Create account</Button>}
      </Container>
    </Navbar>
        <div className={`absolute top-0 w-full md:hidden h-full bg-white p-2 pt-3 z-10 transition-transform duration-500 ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`}>
          <div className='flex justify-between px-3'>
            <img src='https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg' alt='Brand' className="h-6 sm:h-7 md:h-9 lg:h-11 xl:h-13 2xl:h-14"/>
              <RxCross2 className='text-2xl mt-1 text-[#5F6FFF]' onClick={()=> setIsOpen(false)}/>
          </div>
          <div className='p-5'>
              <ul className="list-none flex flex-col gap-2 " onClick={()=> setIsOpen(false)}>
              <li className='m-auto'>
                <Link
                  to="/"
                  onClick={() => handleShow('/')}
                  className={`block px-4 py-2 text-black font-bold text-center rounded transition ${
                    location.pathname === '/' ? 'bg-[#5F6FFF] text-white font-medium' : ''
                  }`}
                >
                  HOME
                </Link>
              </li>
              <li className='m-auto'>
                <Link
                  to="/doctors"
                  onClick={() => handleShow('doctors')}
                  className={`block px-4 py-2 text-black font-bold text-center rounded transition ${
                    location.pathname === '/doctors' ? 'bg-[#5F6FFF] text-white font-medium' : ''
                  }`}
                >
                  ALL DOCTORS
                </Link>
              </li>
              <li className='m-auto'>
                <Link
                  to="/about"
                  onClick={() => handleShow('about')}
                  className={`block px-4 py-2 text-black font-bold text-center rounded transition ${
                    location.pathname === '/about' ? 'bg-[#5F6FFF] text-white font-medium' : ''
                  }`}
                >
                  ABOUT
                </Link>
              </li>
              <li className='m-auto'>
                <Link
                  to="/contact"
                  onClick={() => handleShow('about')}
                  className={`block px-4 py-2 text-black font-bold text-center rounded transition ${
                    location.pathname === '/contact' ? 'bg-[#5F6FFF] text-white font-medium' : ''
                  }`}
                >
                  CONTACT
                </Link>
              </li>
              </ul>
          </div>
         </div>
    </>
  )
}

export default NavPage
