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
      localStorage.removeItem('ADMIN')
      localStorage.removeItem('token')
      toast.info("Log out successfully",{position: "top-right",
                    autoClose: 2000,
                    theme: "colored"})
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }
    const data = localStorage.getItem("ADMIN")
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
          const Admin = localStorage.getItem("ADMIN")
          if(Admin  === "true"){
            setPreviewImage(user.profileImage || null)
          }
        })
        .catch(error => {
          console.error(error);
        });
      },[])
      useEffect(()=>{
        setPreviewImage(userData.profileImage)
      },[userData])
      useEffect(()=>{
        console.log(previewImage)
        // console.log(userData)
      },[previewImage,])
      useEffect(()=>{
        window.addEventListener('click', ()=> setUlToggle(null))
        return window.removeEventListener('click', ()=> setUlToggle(null))
      },[ulToggle])
  return (
    <>
    {
      loader && <div className='loader-wrapper'>
      <div className='loader_modal'></div>
    </div>
    }
        <Navbar expand="lg" data-bs-theme="light" id='Navbar'>
            <Navbar.Brand className='brand-img'>
                <img src='https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg' onClick={()=> navigate('/admin-dashboard')} alt='Brand'/>
            </Navbar.Brand>       
            { localStorage.getItem("ADMIN") === "true" ? <div className='userIcon' onClick={(e)=> {setUlToggle(!ulToggle); e.stopPropagation()}}>
                        {
                          previewImage !== null ? <div className='nav-img-icon'>
                          <img src={previewImage} alt='AdminImage'/>
                        </div> : <FontAwesomeIcon icon={faCircleUser} className='user'/>
                        }
                        <i className="ri-arrow-drop-down-line drowpdown">
                          {
                            ulToggle && <ul>
                            <li onClick={(e)=> {e.stopPropagation();
                              navigate('/admin-profile');
                              setUlToggle(null)
                          }}>My Profile</li>
                            <li onClick={()=> {
                                navigate('/view-appointment')
                            }}>My Appointment</li>
                            <li onClick={(e)=> {
                                handleLogOut(e);
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
