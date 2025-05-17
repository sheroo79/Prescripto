import React, { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../Css/AdminStyle.scss'
import PaginationRounded from '../TestApi'
import axios from 'axios'
import moment from 'moment'
function ViewAppointment() {
  const [fatchAppointments, setFatchAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const handlePageChange = (value) =>{
    console.log(value)
    setPage(value)
}
useEffect(()=>{
  console.log(page)
},[page])
  useEffect(()=>{
    const token = localStorage.getItem('token')
          try {
              axios.get(`https://doc-q-book.vercel.app/api/appointments?page=${page}`,{
                  headers : {
                      Authorization : `Bearer ${token}`
                  }
              }).then((response)=> {
                  if(response.status === 200){
                    setFatchAppointments(response.data.appointments)
                    setLoading(false)
                  }
              })
          } catch (error) {
              console.log("Error Fatching Data",error)
          }
  },[page])

  useEffect(()=>{
     console.log(fatchAppointments)
  },[fatchAppointments])
  return (
    <>
      <div className='Appoint-wrapper'>
        <h4>All Appointments</h4>
        {
                          loading ? (<div className='skeleton-container-appointment'>
                            <div className='skeleton-wrapper-app'>
                              <Skeleton count={1} width={780} height={40}/>
                              <div className='d-flex gap-5 mb-4'>
                                <Skeleton count={1} width={10} height={20}/>
                                <Skeleton count={1} width={60} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                                <Skeleton count={1} width={100} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                              </div>
                              <div className='d-flex gap-5 mb-4'>
                                <Skeleton count={1} width={10} height={20}/>
                                <Skeleton count={1} width={60} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                                <Skeleton count={1} width={100} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                              </div>
                              <div className='d-flex gap-5 mb-4'>
                                <Skeleton count={1} width={10} height={20}/>
                                <Skeleton count={1} width={60} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                                <Skeleton count={1} width={100} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                              </div>
                              <div className='d-flex gap-5 mb-4'>
                                <Skeleton count={1} width={10} height={20}/>
                                <Skeleton count={1} width={60} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                                <Skeleton count={1} width={100} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                              </div>
                              <div className='d-flex gap-5 mb-4'>
                                <Skeleton count={1} width={10} height={20}/>
                                <Skeleton count={1} width={60} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                                <Skeleton count={1} width={100} height={20}/>
                                <Skeleton count={1} width={20} height={20}/>
                                <Skeleton count={1} width={70} height={20}/>
                              </div>
                            </div>
                          </div>) : (
                            <>
                          <div className='a-wrapper border px-3 py-2'>
                            <table className='appointments-table'>
                            <thead>
                              <tr className='text-muted'>
                                <th>#</th>
                                <th>Patient</th>
                                <th>Age</th>
                                <th>Date & Time</th>
                                <th>Doctor</th>
                                <th>Fee</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className='text-muted'>
                              {fatchAppointments?.map((app, index) => (
                                <tr key={index}>
                                  <td>{app.id}</td>
                                  <td>
                                    <div className='d-flex align-items-center'>
                                      <div className='circle-icon'>
                                        {app.patient.profileImage !== null ? (
                                          <img src={app.patient.profileImage} alt='Patient' />
                                        ) : (
                                          <FontAwesomeIcon className='font_icon' icon={faCircleUser} style={{ color: '#D6DAFF' }} />
                                        )}
                                      </div>
                                      <span className='ms-2'>{app.patient.name}</span>
                                    </div>
                                  </td>
                                  <td>N/A</td>
                                  <td>{moment(app.appointmentDate).format('YYYY-MM-DD h:mm a')}</td>
                                  <td>
                                    <div className='d-flex align-items-center'>
                                      <div className='dr-img'>
                                        <img src={app.doctor.profile.profileImage} className='img-fluid' alt='Doctor' />
                                      </div>
                                      <span className='ms-2'>{app.doctor.profile.name}</span>
                                    </div>
                                  </td>
                                  <td>{app.doctor.fee}$</td>
                                  <td>
                                    {moment(app.appointmentDate).isBefore(moment()) ? (
                                      <span className='completed'>Completed</span>
                                    ) : app.isCancel ? (
                                      <span className='cancelled'>Cancelled</span>
                                    ) : (
                                      <span className='pending'>Pending</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                        </div>
                        <div className="d-flex justify-content-center mt-3">
                           <PaginationRounded onPageChange={handlePageChange}/>
                        </div>
                            </>
                          )}
        
      </div>
    </>
  )
}

export default ViewAppointment
