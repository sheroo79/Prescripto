import React, { useEffect,useState } from 'react'
import { axiosInstance } from '../Components/Api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faL } from '@fortawesome/free-solid-svg-icons'
import PaginationRounded from '../TestApi'
import moment from 'moment'
function Patients() {
    const [fatchPatients, setFatchPatients] = useState([])
      const [loading, setLoading] = useState(true)
      const [page, setPage] = useState(1)
    useEffect(()=>{
          axiosInstance.get('/patients')
          .then((res)=> {
            setFatchPatients(res.data.patients)
            console.log(res.data.patients)
            setLoading(false)
          })
          .catch((error)=> console.log(error))
        },[])
        const handlePageChange = (value) =>{
            console.log(value)
            setPage(value)
        }
  return (
    <div className='main-wrapper'>
      <h4>Patients</h4>
      <div className='patient-wrapper'>

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
                                <table className="a-wrapper table border px-3 py-2">
                                    <thead>
                                      <tr>
                                        <th className="patient text-muted">#</th>
                                        <th className="age text-muted">Name</th>
                                        <th className="date text-muted">Email</th>
                                        <th className="dr text-muted">Gender</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {fatchPatients?.map((app, index) => (
                                        <tr key={index}>
                                          <td className='text-muted'>{app.id}</td>
                                          <td>
                                            <div className="ch-1 d-flex align-items-center">
                                              <div className="circle-icon">
                                                {app.profileImage !== null ? (
                                                  <img src={app.profileImage} alt="profile" />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    className="font_icon"
                                                    icon={faCircleUser}
                                                    style={{ color: '#D6DAFF' }}
                                                  />
                                                )}
                                              </div>
                                              <span className="ms-1 text-muted">{app.name}</span>
                                            </div>
                                          </td>
                                          <td className='text-muted'>{app.email}</td>
                                          <td className='text-muted' style={{fontSize:'15px'}}>{app.gender || 'N/A'}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>

                                <div className="d-flex justify-content-center mt-3">
                                   <PaginationRounded onPageChange={handlePageChange}/>
                                </div>
    </>
    )}
    </div>
    </div>
                
    
  )
}

export default Patients
