import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useState } from 'react';
import { IoFilter } from "react-icons/io5";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-modern-drawer/dist/index.css';
import Select from 'react-select';
import CustomDrawer from '../Components/CustomDrawer';
import '../Css/AdminStyle.scss';
import { useGetAdminAppointmentQuery, useGetAllAdminAppointmentsQuery } from '../features/ApiSlice'
import PaginationRounded from '../TestApi';
function ViewAppointment() {
  const [page, setPage] = useState(1)
  const [tempDoctorSelection, setTempDoctorSelection] = useState([]);
  const [tempPatientSelection, setTempPatientSelection] = useState([]);
  const [doctorIds, setDoctorIds] = useState([]);
  const [patientIds, setPatientIds] = useState([]);
  const {data, isLoading,isFetching } = useGetAdminAppointmentQuery({doctorIds,patientIds,page})
  const {data: allAppointments} = useGetAllAdminAppointmentsQuery(page)
  console.log(data)
  const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
    }  
    console.log(isOpen)
  const handlePageChange = (value) => {
    console.log(value)
    setPage(value)
  }

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
  const uniqueAppointments = Array.from(
  new Map(
    allAppointments?.appointments?.map((app) => [
      app?.doctorId,
      {
        value: app?.doctorId,
        label: app?.doctor?.profile?.name,
      },
    ])
  ).values()
);
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
const handleClear = () =>{
  setTempPatientSelection([])
  setTempDoctorSelection([])
}
  return (
    <>
    {
          isFetching && (<div className='loader-wrapper'>
          <div className='loader_modal'></div>
        </div>)
        }
        <CustomDrawer 
          isOpen={isOpen}
          onClose={toggleDrawer}
          onSave={handleSave}
          onClear={handleClear}
        >
            <h5>Filter Appointments</h5>
                <div className='mt-3'>
                  <label>Select Doctor</label>
                  <Select
                    isMulti
                    options={uniqueAppointments}
                    value={tempDoctorSelection}
                    onChange={handleDoctorChange}
                  />
                </div>
                <div className='mt-3'>
                  <label>Select Patient</label>
                  <Select
                    isMulti
                    options={uniquePatientOptions}
                    value={tempPatientSelection}
                    onChange={handlePatientChange}
                  />
                </div>
        </CustomDrawer>
      <div className='Appoint-wrapper'>
        <div className='d-flex justify-content-between mb-2 px-1'>
          <h4>All Appointments</h4>
              {isLoading ? "" : <button className='filter-btn' onClick={toggleDrawer}><IoFilter /> Filters</button>}
        </div>
        {
                          isLoading ? (<div className='skeleton-container-appointment'>
                            <div className='skeleton-wrapper-app'>
                              <Skeleton count={1} width={760} height={40}/>
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
                              {data?.appointments?.map((app, index) => (
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
                                      <div className='dr-img-appointment'>
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
                            {
                              data?.appointments.length > 14 && <div className="d-flex justify-content-center mt-3">
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
