import React, { useState,useEffect } from 'react'
import '../Css/AdminStyle.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor,faHospitalUser,faArrowsTurnToDots,faCircleUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import moment from 'moment'
import { axiosInstance } from '../Components/Api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BiMale } from "react-icons/bi";
import { FaFemale,FaGenderless, FaUserInjured} from "react-icons/fa";
import { MdCancel, MdIncompleteCircle,MdPending } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";

function DoctorDashboard() {
    const [fatchAppointments, setFatchAppointments] = useState([])
    const [skeletonloading, setSkeletonLoading] = useState(true)
    const token = localStorage.getItem('token')
    useEffect(()=>{
        axiosInstance.get('/dashboard')
        .then((res)=>{
          console.log(res.data.data)
          setFatchAppointments(res.data.data)
        }).catch((error)=> console.log(error))
        .finally(()=> setSkeletonLoading(false))
    },[])
        useEffect(()=>{
            console.log(fatchAppointments)
        },[fatchAppointments])
  return (
    <>
        <div className='dashboard-wrapper'>
            <div className='right'>
                <div className='three-box'>
                    {/* Appointment Box */}
                    <div className='appointment-wrapper'>
                        <div className='dr'>
                            <i className="ri-git-repository-fill book-icon"></i>
                            <div className='d-flex flex-column ms-2'>
                                <strong>{fatchAppointments?.totalAppointments}</strong>
                                <span>Total Appointments</span>
                            </div>
                        </div>
                            <div className='d-flex justify-content-evenly'>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><MdCancel /></span>
                                            <span>{fatchAppointments?.cancelledAppointments}</span>
                                        </div>
                                        <span className='male'>Cancelled</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><MdIncompleteCircle /></span>
                                            <span>{fatchAppointments?.completedAppointments}</span>
                                        </div>
                                        <span className='male'>Completed</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><FaSackDollar /></span>
                                            <span>{fatchAppointments?.paidAppointments}</span>
                                        </div>
                                        <span className='male'>Paid</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><MdPending /></span>
                                            <span>{fatchAppointments?.pendingAppointments}</span>
                                        </div>
                                        <span className='male'>Pending</span>
                                    </div>
                            </div>
                    </div>    
                     {/*Patients Box */}
                    <div className='appointment-wrapper'>
                        <div className='dr'>
                           <FaUserInjured className='book-icon' style={{fontSize:'4.5vw'}}/>
                            <div className='d-flex flex-column ms-2'>
                                <strong>{fatchAppointments?.totalPatients}</strong>
                                <span>Patients Gender</span>
                            </div>
                        </div>
                            <div className='d-flex justify-content-evenly'>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><BiMale /></span>
                                            <span>{fatchAppointments?.patientGenderCounts?.MALE}</span>
                                        </div>
                                        <span className='male'>Male</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><FaFemale /></span>
                                            <span>{fatchAppointments?.patientGenderCounts?.FEMALE}</span>
                                        </div>
                                        <span className='male'>Female</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><FaGenderless /></span>
                                            <span>{fatchAppointments?.patientGenderCounts?.OTHERS}</span>
                                        </div>
                                        <span className='male'>Ohters</span>
                                    </div>
                            </div>
                    </div>                    
                </div>
                {/* Lates Data */}
                <div className='latest-data'>               
                {
                    skeletonloading ? (
                        <div>
                            <div className='skeleton-wrappers mt-4'>
                            <div className='mb-2'>
                                <Skeleton count={1} width={475} height={40}/>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={430} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={430} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={430} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={430} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={430} height={50}/>
                                </div>
                            </div>
                          </div>
                        </div>
                    ) : (
                <div className='latest-booking dr_booking'>
                        <h6><FontAwesomeIcon icon={faArrowsTurnToDots} className='latest-icon'/> Latest Appointments</h6>
                    <div className='booking '>
                        {
                                fatchAppointments?.latestAppointments?.map((app,index)=>(
                                    <div className='booking-wrapper' key={index}> 
                                        <div className='booked'>
                                            <div className='dr-info'>
                                                <div className='dr-img'>
                                                    <img src={app.doctor.profile.profileImage}/>
                                                </div>
                                                    <div className='d-flex flex-column'>
                                                        <span className='dr-name'>{app.doctor.profile.name}</span>
                                                        <span className='booking-date'>Booking on {moment.utc(app.appointmentDate).format('DD MMM yyyy')} </span>
                                                        <span className='booking-date'>{moment.utc(app.appointmentDate).format('h:mm a')} </span>
                                                    </div>
                                                </div>
                                        </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                    )
                }
                </div>
                </div>
        </div>
    </>
  )
}

export default DoctorDashboard
