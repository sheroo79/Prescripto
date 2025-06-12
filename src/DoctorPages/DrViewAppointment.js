import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { IoFilter } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../Css/AdminStyle.scss'
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Select from 'react-select';
import PaginationRounded from '../TestApi'
import { useGetAdminAppointmentQuery, useGetAllAdminAppointmentsQuery } from '../features/ApiSlice';
function ViewAppointment() {
  const [page, setPage] = useState(1)
  const [tempDoctorSelection, setTempDoctorSelection] = useState([]);
    const [tempPatientSelection, setTempPatientSelection] = useState([]);
    const [doctorIds, setDoctorIds] = useState([]);
    const [patientIds, setPatientIds] = useState([]);
    const {data, isLoading,isFetching, refetch } = useGetAdminAppointmentQuery({doctorIds,patientIds,page})
    const {data: allAppointments} = useGetAllAdminAppointmentsQuery(page)
  console.log(data)
  const [isOpen, setIsOpen] = useState(false)
      const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
      }  
  const handlePageChange = (value) =>{
    console.log(value)
    setPage(value)
}
useEffect(()=>{
  refetch()
},[])
useEffect(()=>{
  console.log(page)
},[page])
const handleDoctorChange = (selectedOption) =>{
  setTempDoctorSelection(selectedOption)
  console.log(selectedOption)
}
const handlePatientChange = (selectedOption) => {
  setTempPatientSelection(selectedOption);
};
const handleSave = () => {
    const doctorIdStr = tempDoctorSelection.map((item) => item.value);
    const patientIdStr = tempPatientSelection.map((item) => item.value);

  setDoctorIds(doctorIdStr);
  setPatientIds(patientIdStr);
  };
const uniquePatientOptions = Array.from(
  new Map(
    allAppointments?.appointments?.map((app) => [
      app?.patientId,
      {
        value: app?.patientId,
        label: app?.patient?.name,
      },
    ])
  ).values()
);
  return (
    <>
    {
          isFetching && (<div className='loader-wrapper'>
          <div className='loader_modal'></div>
        </div>)
        }
        <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
            >
                <h5>Filter Appointments</h5>
                <div className='mt-3'>
                  <label>Select Patient</label>
                  <Select
                    isMulti
                    options={uniquePatientOptions}
                    onChange={handlePatientChange}
                  />
                </div>
              <button className="addDr-btn px-4" onClick={()=> {
                handleSave();
                toggleDrawer()
              }}>Filter</button>
        </Drawer>
      <div className='Appoint-wrapper'>
                <div className='d-flex justify-content-between mb-2 px-1'>
                  <h4>All Appointments</h4>
                      {isLoading ? "" : <button className='filter-btn' onClick={toggleDrawer}><IoFilter /> Filters</button>}
                </div>
        {
                          isLoading ? (<div className='skeleton-container-appointment'>
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
                                    data?.appointments?.map((app, index) => (
                                      <tr key={index}>
                                        <td>{app.id}</td>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="circle-icon">
                                              {
                                                app.patient?.profileImage !== null
                                                  ? <img src={app.patient?.profileImage} alt="Profile" width="30" height="30" style={{ borderRadius: '50%' }} />
                                                  : <FontAwesomeIcon className='font_icon' icon={faCircleUser} style={{ color: '#D6DAFF', fontSize: '1.5rem' }} />
                                              }
                                            </div>
                                            <span className="ms-2">{app.patient?.name}</span>
                                          </div>
                                        </td>
                                        <td>N/A</td>
                                        <td>{moment(app?.appointmentDate).format('YYYY-MM-DD h:mm a')}</td>
                                        <td className='text-center'>
                                          {
                                            moment(app?.appointmentDate).isBefore(moment()) ? (
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

                        {
                          data?.appointments?.length > 14 && <div className="d-flex justify-content-center mt-3">
                           <PaginationRounded onPageChange={handlePageChange}/>
                        </div>
                        }
                            </>
                          )}
        
      </div>
    </>
  )
}

export default ViewAppointment
