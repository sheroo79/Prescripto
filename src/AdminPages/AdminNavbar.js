import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../Css/AdminStyle.scss';
import { useGetUserDataQuery } from '../features/ApiSlice';
import { doctorApi } from '../features/ApiSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../features/ApiSlice';

function AdminNavbar() {
  const dispatch = useDispatch()
  const {data} = useGetUserDataQuery()
  console.log(data)
  const [ulToggle, setUlToggle] = useState(null)
  const [previewImage,setPreviewImage] = useState(null)
    const navigate = useNavigate()
    const handleLogOut = () =>{
      dispatch(logout())
      toast.info("Log out successfully",{position: "top-right",
                    autoClose: 2000,
                    theme: "colored"})
                    setTimeout(() => {
        dispatch(doctorApi.util.resetApiState())
        navigate('/login')
      }, 3000);
    }
    
      useEffect(()=>{
          console.log(previewImage)
          setPreviewImage(data?.user?.profileImage)
        },[data])
      useEffect(()=>{
        window.addEventListener('click', ()=> setUlToggle(null))
        return window.removeEventListener('click', ()=> setUlToggle(null))
      },[ulToggle])
  return (
    <>

        <Navbar expand="lg" data-bs-theme="light" id='Navbar'>
            <Navbar.Brand className='brand-img'>
                <img src='https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg' onClick={()=> navigate('/admin-dashboard')} alt='Brand'/>
            </Navbar.Brand>       
            { localStorage.getItem("ADMIN") === "true" ? <div className='userIcon' onClick={(e)=> {setUlToggle(!ulToggle); e.stopPropagation()}}>
                        {
                          previewImage !== undefined ? <div className='nav-img-icon'>
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
                            <li onClick={(e)=> {e.stopPropagation();
                              navigate('/admin/payment-history');
                          }}>Payments History</li>
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
