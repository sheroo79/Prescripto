import React, { useEffect,useState } from 'react'
import {Container} from 'react-bootstrap'
import '../Css/appointment.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import moment from 'moment'
import PaginationRounded from '../TestApi'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoonLoader } from 'react-spinners';
import { faL } from '@fortawesome/free-solid-svg-icons'
function Appointments() {
    const token = localStorage.getItem('token')
    const [fatchAppointments, setFatchAppointments] = useState([])
    const [message, setMessage] = useState({})
    const [page, setPage] = useState(0)
    const [skeletonloading, setSkeletonLoading] = useState(true)
    const [loading, setLoading] = useState(null)
    const handlePageChange = (value) =>{
        console.log(value)
        setPage(value)
    }
    useEffect(()=>{
        console.log(page)
        fetchAppointments()
    },[page])
    
        const fetchAppointments = async () =>{
            try {
                const response = await axios.get(`https://doc-q-book.vercel.app/api/appointments?page=${page}`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                    setFatchAppointments(response.data.appointments)
                    setSkeletonLoading(false)
               
            } catch (error) {
                console.log("Error Fatching Data",error)
            }
        }
    
    useEffect(()=>{
        console.log(fatchAppointments,loading)
    },[fatchAppointments,loading])

    const CancelAppointment = async (id,cancel) => {
        if(cancel){
            toast.info("Your appointment is already cancelled.",{
            toastId : id,
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true,
              draggable: true,
              theme: "colored",
            })
            return;
        }
        console.log(cancel)
        setLoading(id);
        try {
        const response = await axios.post(`https://doc-q-book.vercel.app/api/appointments/${id}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status === 200 || response.status === 201) {
            toast.info("Appointment cancelled", {
              toastId : id,
              position: "top-right",
              autoClose: 4000,
              closeOnClick: true,
              draggable: true,
              theme: "colored",
            });
          } else {
            setMessage('');
          }
          fetchAppointments()
        } catch (error) {
          console.log(error, "Error Post method");
        } finally {
          setLoading(false);
          
        }
      };
      
    console.log(message)
  return (
    <Container className='container-appointment'>
        <div className='header'>
            <span>My Appointments</span>
        </div>
        <div className='app-body'>
            {
                        skeletonloading ? (<div className='skeleton-containers'>
                          <div className='skeleton-wrappers'>
                            <div className='d-flex gap-3'>
                                <Skeleton count={1} width={88} height={90}/>
                                <Skeleton count={1} width={200} height={90}/>
                            </div>
                            <Skeleton count={1} width={150} height={40}/>
                          </div>
                          <div className='skeleton-wrappers'>
                            <div className='d-flex gap-3'>
                                <Skeleton count={1} width={88} height={90}/>
                                <Skeleton count={1} width={200} height={90}/>
                            </div>
                            <Skeleton count={1} width={150} height={40}/>
                          </div>
                          <div className='skeleton-wrappers'>
                            <div className='d-flex gap-3'>
                                <Skeleton count={1} width={88} height={90}/>
                                <Skeleton count={1} width={200} height={90}/>
                            </div>
                            <Skeleton count={1} width={150} height={40}/>
                          </div>
                        </div>) : (
                            fatchAppointments?.map((appoint,index)=> (
                                <div className='dr-info-wrapper' key={index}>
                                    <div className='dr-info'>
                                        <div className='doc-img-wrap'>
                                            <img src={appoint.doctor.profile.profileImage}/>
                                        </div>
                                        <div className='info'>
                                            <h6>{appoint.doctor.profile.name}</h6>
                                            <div className="address">
                                                <strong>Fee</strong> : <strong>{appoint.doctor.fee}$</strong>
                                            </div>
            
                                            <div className="datetime">
                                                <strong>Date & Time:</strong>
                                                <p>{moment.utc(appoint.appointmentDate).format('YYYY-MM-DD hh:mm a')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Cancle Appointment */}
                                    <div className='cancle'>
                                        <button className={appoint.isCancel === true ? `btn cancelled` : `btn`} onClick={()=> CancelAppointment(appoint.id,appoint.isCancel)}>
                                            {
                                                loading === appoint.id ? (<div className={loading && `loader`}></div>) : (appoint.isCancel === true ? "Appointment Cancelled" : "Cancel Appointment")
                                            }
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                        }
        </div>
                <div className="d-flex justify-content-center">
                    <PaginationRounded onPageChange={handlePageChange}/>
                </div>
            <ToastContainer/>
    </Container>
  )
}

export default Appointments
