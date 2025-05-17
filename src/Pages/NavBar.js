import React,{useContext} from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Css/navpage.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { UserContext } from '../Components/UserContext';

function NavPage() {
  const [ulToggle, setUlToggle] = useState(null)
  const [lineStyle, setLineStyle] = useState(false)
  const [previewImage,setPreviewImage] = useState(null)
  const {userData} = useContext(UserContext)
  const navigate = useNavigate()
  
  const handleShow = (link) =>{
    setLineStyle(link)
  }
  const handleLogOut = (e)=>{
    e.stopPropagation();
    localStorage.removeItem("LogedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("ADMIN")
    localStorage.removeItem("PATIENT")
    toast.info("Log out successfully")
    setTimeout(() => {
      navigate('/login')
    }, 3000);
  }

  useEffect(()=>{
    window.addEventListener("click",()=> setUlToggle(null))
    return window.removeEventListener("click",()=> setUlToggle(null))
  },[])

  const token = localStorage.getItem("token")
  useEffect(()=>{
    console.log("Token being sent:", `Bearer ${token}`);
  
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }
    axios.get('https://doc-q-book.vercel.app/api/view-profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data.user);
      const user = response.data.user;
      console.log("Navbar User",user)
        setPreviewImage(user.profileImage || null)
    })
    .catch(error => {
      console.error(error);
    });
  },[])
useEffect(()=>{
  console.log("userdata", userData)
  setPreviewImage(userData.profileImage)
},[userData])
  useEffect(()=>{
    console.log(previewImage)
  },[previewImage])
  const handleNavigate = () =>{
      navigate('/userProfile');
      setUlToggle(null)
  }
  return (
    <>
    <Navbar expand="lg" data-bs-theme="light" id='Navbar'>
      <Container className='nav-container'>
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
              previewImage !== null ? <div className='nav-img-icon' >
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
