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
function NavPage() {
  const location = useLocation()
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
    <Navbar expand="lg" data-bs-theme="light" id='Navbar'>
      <Container ref={ContainerRef} className='nav-container'>
        <Navbar.Brand className='brand-img' onClick={()=> navigate('/')}>
          <img src='https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg' alt='Brand'/>
        </Navbar.Brand>
          <Nav navbarScroll className='nav-link'>
            <Nav.Link as={Link} to='/' onClick={()=> {handleShow('/')}} className={lineStyle === '/' ? 'line': ''}>Home</Nav.Link>
            <Nav.Link as={Link}
            to='/doctors' onClick={()=> handleShow('doctors')} className={lineStyle === 'doctors' ? 'line': ''}>All Doctors</Nav.Link>
            <Nav.Link as={Link} to='/about' onClick={()=> handleShow('about')} className={lineStyle === 'about' ? 'line': ''}>About</Nav.Link>
            <Nav.Link as={Link} to='/contact' onClick={()=> handleShow('contact')} className={lineStyle === 'contact' ? 'line': ''}>Contact</Nav.Link>
          </Nav>
        

          { localStorage.getItem("PATIENT") === "true" ? <div className='userIcon' onClick={(e)=> {setUlToggle(!ulToggle);e.stopPropagation()}}>
            {
              previewImage !== undefined ? <div className='nav-img-icon' >
              <img src={previewImage} alt='ProfileUserImg'/>
            </div> : <FontAwesomeIcon icon={faCircleUser} className='user'/>
            }
            <i className="ri-arrow-drop-down-line drowpdown">
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
          </div> : <Button className='nav-Btn' onClick={()=> navigate('/signUp')}>Create account</Button>}
      </Container>
    </Navbar>
    </>
  )
}

export default NavPage
