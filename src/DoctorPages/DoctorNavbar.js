import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../Css/AdminStyle.scss';
import { doctorApi, useGetUserDataQuery } from '../features/ApiSlice';
import { logout } from '../features/ApiSlice';
function AdminNavbar() {
  const dispatch = useDispatch()
  const {data} = useGetUserDataQuery()
  console.log(data)
  const [loader, setLoader] = useState(false)
  const [ulToggle, setUlToggle] = useState(null)
  const [previewImage,setPreviewImage] = useState(null)
    const navigate = useNavigate()
    const handleLogOut = () =>{
      dispatch(logout())
      toast.info("Log out successfully",{
            autoClose: 2000,
            theme: "colored"})
            setTimeout(() => {
              navigate('/login')
              dispatch(doctorApi.util.resetApiState())
            }, 3000);
    }
      useEffect(()=>{
        setPreviewImage(data?.user?.profileImage)
        console.log(previewImage)
        window.addEventListener('click', ()=> setUlToggle(null))
      },[data,ulToggle])
  return (
    <>
        <Navbar expand="lg" data-bs-theme="light" id='Navbar'>
            <Navbar.Brand className='brand-img'>
                <img src='https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg' onClick={()=> navigate('/doctor-dashboard')} alt='Brand'/>
            </Navbar.Brand>       
            { localStorage.getItem("DOCTOR") === "true" ? <div className='userIcon' onClick={(e)=> {setUlToggle(!ulToggle);e.stopPropagation()}}>
                        {
                          previewImage ? <div className='nav-img-icon-dr'>
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
        <ToastContainer theme='colored' autoClose={2000} className="custom-toast" />
    </>
  )
}

export default AdminNavbar
