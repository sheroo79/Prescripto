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
import { FaFemale,FaGenderless } from "react-icons/fa";
import { MdCancel, MdIncompleteCircle,MdPending } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";

function Dashboard() {
    const [fatchAppointments, setFatchAppointments] = useState([])
    const [skeletonloading, setSkeletonLoading] = useState(true)
    const token = localStorage.getItem('token')
    useEffect(()=>{
        axiosInstance.get('/doctors')
        .then((res)=>{console.log(res)})
    },[])
    useEffect(()=>{
                axios.get('https://doc-q-book.vercel.app/api/dashboard',{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }).then((response)=> {
                    console.log(response.data.data)
                    setFatchAppointments(response.data)
                    setSkeletonLoading(false)

                })
            .catch ((error)=> {
                console.log(error, "Error Fatching Data")
            })
        },[])
        useEffect(()=>{
            console.log(fatchAppointments)
        },[fatchAppointments])
  return (
    <>
        <div className='dashboard-wrapper'>
            <div className='right'>
                <div className='three-box'>
                    <div className='dr-wrapper'>
                        <div className='dr'>
                            <FontAwesomeIcon icon={faUserDoctor} className='dr-icon'/>
                            <div className='d-flex flex-column ms-2'>
                                <strong>{fatchAppointments?.data?.totalDoctors}</strong>
                                <span>Total Doctors</span>
                            </div>
                        </div>
                            <div className='d-flex justify-content-evenly'>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><BiMale /></span>
                                            <span>{fatchAppointments?.data?.doctorGenderCounts.MALE}</span>
                                        </div>
                                        <span className='male'>Male</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><FaFemale /></span>
                                            <span>{fatchAppointments?.data?.doctorGenderCounts.FEMALE}</span>
                                        </div>
                                        <span className='male'>Female</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><FaGenderless /></span>
                                            <span>{fatchAppointments?.data?.doctorGenderCounts.OTHERS}</span>
                                        </div>
                                        <span className='male'>Others</span>
                                    </div>
                            </div>
                    </div>
                    {/* Appointment Box */}
                    <div className='appointment-wrapper'>
                        <div className='dr'>
                            <i className="ri-git-repository-fill book-icon"></i>
                            <div className='d-flex flex-column ms-2'>
                                <strong>{fatchAppointments?.data?.totalAppointments}</strong>
                                <span>Total Appointments</span>
                            </div>
                        </div>
                            <div className='d-flex justify-content-evenly'>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><MdCancel /></span>
                                            <span>{fatchAppointments?.data?.cancelledAppointments}</span>
                                        </div>
                                        <span className='male'>Cancelled</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><MdIncompleteCircle /></span>
                                            <span>{fatchAppointments?.data?.completedAppointments}</span>
                                        </div>
                                        <span className='male'>Completed</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><FaSackDollar /></span>
                                            <span>{fatchAppointments?.data?.paidAppointments}</span>
                                        </div>
                                        <span className='male'>Paid</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><MdPending /></span>
                                            <span>{fatchAppointments?.data?.pendingAppointments}</span>
                                        </div>
                                        <span className='male'>Pending</span>
                                    </div>
                            </div>
                    </div>    
                     {/*Patients Box */}
                    <div className='appointment-wrapper'>
                        <div className='dr'>
                            <i className="ri-git-repository-fill book-icon"></i>
                            <div className='d-flex flex-column ms-2'>
                                <strong>{fatchAppointments?.data?.totalPatients}</strong>
                                <span>Total Patients</span>
                            </div>
                        </div>
                            <div className='d-flex justify-content-evenly'>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><BiMale /></span>
                                            <span>{fatchAppointments?.data?.patientGenderCounts.MALE}</span>
                                        </div>
                                        <span className='male'>Male</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><FaFemale /></span>
                                            <span>{fatchAppointments?.data?.patientGenderCounts.FEMALE}</span>
                                        </div>
                                        <span className='male'>Female</span>
                                    </div>
                                    <div>
                                        <div className='d-flex male'>
                                            <span className="fs-6"><FaGenderless /></span>
                                            <span>{fatchAppointments?.data?.patientGenderCounts.OTHERS}</span>
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
                                <Skeleton count={1} width={340} height={40}/>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                            </div>
                          </div>
                        </div>
                    ) : (
                <div className='latest-booking'>
                        <h6><FontAwesomeIcon icon={faArrowsTurnToDots} className='latest-icon'/> Latest Booking</h6>
                    <div className='booking'>
                        {
                                fatchAppointments?.data?.latestAppointments?.map((app,index)=>(
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
                {/* Leatest Doctors */}
                {
                    skeletonloading ? (
                        <div>
                            <div className='skeleton-wrappers mt-4'>
                            <div className='mb-2'>
                                <Skeleton count={1} width={340} height={40}/>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                            </div>
                          </div>
                        </div>
                    ) : (
                <div className='latest-booking'>
                        <h6><FontAwesomeIcon icon={faArrowsTurnToDots} className='latest-icon'/> Latest Doctors</h6>
                    <div className='booking'>
                        {
                                fatchAppointments?.data?.latestDoctors?.map((app,index)=>(
                                    <div className='booking-wrapper' key={index}> 
                                        <div className='booked'>
                                            <div className='dr-info'>
                                                <div className='dr-img'>
                                                    <img src={app.profile.profileImage} style={{transform:"scale(1.1)"}}/>
                                                </div>
                                                    <div className='d-flex flex-column'>
                                                        <span className='dr-name'>{app.profile.name}</span>
                                                        <span className='booking-date'><b>{app.specialty}</b><br/> Degree : {app.degree}</span>
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
                {/* Latest Patient */}
                {
                    skeletonloading ? (
                        <div>
                           <div className='skeleton-wrappers mt-4'>
                            <div className='mb-2'>
                                <Skeleton count={1} width={340} height={40}/>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                                <div className='d-flex align-items-center gap-2 mt-3'>
                                    <Skeleton count={1} width={40} height={40} style={{borderRadius:'50%'}}/>
                                    <Skeleton count={1} width={180} height={50}/>
                                </div>
                            </div>
                          </div>
                        </div>
                    ) : (
                <div className='latest-booking'>
                        <h6><FontAwesomeIcon icon={faArrowsTurnToDots} className='latest-icon'/> Latest Patients</h6>
                    <div className='booking'>
                        {
                                fatchAppointments?.data?.latestPatients?.map((app,index)=>(
                                    <div className='booking-wrapper' key={index}> 
                                        <div className='booked'>
                                            <div className='dr-info'>
                                                <div className='dr-img'>
                                                    {
                                                        app.profileImage !== null ? <img src={app.profileImage} style={{transform:"scale(1.1)"}}/>: <FontAwesomeIcon icon={faCircleUser} className='patien-icon'/>
                                                    }
                                                </div>
                                                    <div className='d-flex flex-column'>
                                                        <span className='dr-name'>{app.name}</span>
                                                        <span className='booking-date'>{app.email}</span>
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

export default Dashboard
