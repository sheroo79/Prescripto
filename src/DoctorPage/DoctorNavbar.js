import {useState,useEffect, useContext} from 'react'
import '../Css/AdminStyle.scss'
import { Navbar,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import { UserContext } from '../Components/UserContext';


function AdminNavbar() {
  const {userData} = useContext(UserContext)
  const [loader, setLoader] = useState(false)
  console.log(userData)
  const [ulToggle, setUlToggle] = useState(null)
  const [previewImage,setPreviewImage] = useState(null)
    const navigate = useNavigate()
    const handleLogOut = () =>{
      localStorage.removeItem('DOCTOR')
      localStorage.removeItem('token')
      toast.info("Log out successfully",{position: "top-right",
            autoClose: 2000,
            theme: "colored"})
            setTimeout(() => {
              navigate('/login')
            }, 3000);
    }
    const data = localStorage.getItem("DOCTOR")
    console.log(data)
    useEffect(()=>{
        const token = localStorage.getItem("token")
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
          // console.log(user)
          const doctor = localStorage.getItem("DOCTOR")
          if(doctor  === "true"){
            setPreviewImage(user.profileImage || null)
          }
        })
        .catch(error => {
          console.error(error);
        });
      },[userData])
      useEffect(()=>{
        console.log(previewImage)
        window.addEventListener('click', ()=> setUlToggle(null))
      },[previewImage,ulToggle])
  return (
    <>
        <Navbar expand="lg" data-bs-theme="light" id='Navbar'>
            <Navbar.Brand className='brand-img'>
                <img src='https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg' onClick={()=> navigate('/doctor-dashboard')} alt='Brand'/>
            </Navbar.Brand>       
            { localStorage.getItem("DOCTOR") === "true" ? <div className='userIcon' onClick={(e)=> {setUlToggle(!ulToggle);e.stopPropagation()}}>
                        {
                          previewImage !== null ? <div className='nav-img-icon-dr'>
                          <img src={previewImage} alt='AdminImage' className='w-100 img-fluid'/>
                        </div> : <FontAwesomeIcon icon={faCircleUser} className='user'/>
                        }
                        <i className="ri-arrow-drop-down-line drowpdown" >
                          {
                            ulToggle && <ul>
                            <li onClick={(e)=> {e.stopPropagation();
                            setLoader(true)
                            setTimeout(() => {
                              navigate('/doctor/Doctor-profile');
                              setUlToggle(null)
                              setLoader(false)
                            }, 2000);
                          }}>My Profile</li>
                            <li onClick={()=> {
                              setLoader(true)
                              setTimeout(() => {
                                navigate('/doctor/Dr-ViewAppointment')
                                setLoader(false)
                              }, 2000);
                            }}>My Appointment</li>
                            <li onClick={(e)=> {
                              setLoader(true)
                              setTimeout(() => {
                                handleLogOut(e);
                                setLoader(false)
                              setUlToggle(null)
                              }, 2000);
                            }}>Log Out</li>
                          </ul>
                          }
                        </i>
                      </div> : <Button className='nav-Btn' onClick={()=> navigate('/signUp')}>Create account</Button>}
        </Navbar>
        <ToastContainer/>
    </>
  )
}

export default AdminNavbar
