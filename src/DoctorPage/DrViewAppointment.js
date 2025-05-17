import React, { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../Css/AdminStyle.scss'
import PaginationRounded from '../TestApi'
import axios from 'axios'
import moment from 'moment'
import { axiosInstance } from '../Components/Api'
function ViewAppointment() {
  const [fatchAppointments, setFatchAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const handlePageChange = (value) =>{
    console.log(value)
    setPage(value)
}
useEffect(()=>{
  console.log(page)
},[page])
useEffect(() => {
  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    setLoader(true);

    try {
      const response = await axiosInstance.get(`appointments?page=${page}`)

      if (response.status === 200) {
        setFatchAppointments(response.data.appointments);
      }

    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setLoader(false);
      setLoading(false);
    }
  };

  fetchAppointments();

}, [page]);




  useEffect(()=>{
     console.log(fatchAppointments)
  },[fatchAppointments])
  return (
    <>
    {/* {
      loader && <div className='loader-wrapper'>
      <div className='loader_modal'></div>
    </div>
    } */}
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
                            <div className="a-wrapper border px-3 py-2 w-75">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th className='text-center'>Patient</th>
                                    <th>Age</th>
                                    <th className='text-center'>Date & Time</th>
                                    <th className='text-center'>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    fatchAppointments?.map((app, index) => (
                                      <tr key={index}>
                                        <td>{app.id}</td>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="circle-icon">
                                              {
                                                app.patient.profileImage !== null
                                                  ? <img src={app.patient.profileImage} alt="Profile" width="30" height="30" style={{ borderRadius: '50%' }} />
                                                  : <FontAwesomeIcon className='font_icon' icon={faCircleUser} style={{ color: '#D6DAFF', fontSize: '1.5rem' }} />
                                              }
                                            </div>
                                            <span className="ms-2">{app.patient.name}</span>
                                          </div>
                                        </td>
                                        <td>N/A</td>
                                        <td>{moment(app.appointmentDate).format('YYYY-MM-DD h:mm a')}</td>
                                        <td className='text-center'>
                                          {
                                            moment(app.appointmentDate).isBefore(moment()) ? (
                                              <span className='badge bg-success py-2 px-3'>Completed</span>
                                            ) : app.isCancel ? (
                                              <span className='px-3 py-2 badge bg-danger'>Cancelled</span>
                                            ) : (
                                              <span className='badge px-3 py-2 bg-warning text-dark'>Pending</span>
                                            )
                                          }
                                        </td>
                                      </tr>
                                    ))
                                  }
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
