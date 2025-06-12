import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { IoFilter } from "react-icons/io5";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Drawer from 'react-modern-drawer';
import Select from 'react-select';
import { IoIosSearch } from "react-icons/io";
import PaginationRounded from '../TestApi';
import { useGetAdminPatientsQuery, useGetAllAdminPatientsQuery } from '../features/ApiSlice'
import { useDebounce } from 'use-debounce';
import CustomDrawer from '../Components/CustomDrawer';
function Patients() {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('newly');
  const [isOpen, setIsOpen] = useState(false)
   const [tempDoctorSelection, setTempDoctorSelection] = useState([]);
      const [tempSpecialtySelection, setTempSpecialtySelection] = useState([]);
      const [searchName, setSearchName] = useState('');
      const [tempGender, setTempGender] = useState('');
      const [patientName, setPatientName] = useState([]);
      const [patientGender, setPatientGender] = useState('');
      const [deBouncedSearchName] = useDebounce(searchName, 1000)
      const {data, isLoading,isFetching} = useGetAdminPatientsQuery({page,sortBy,searchName: deBouncedSearchName,patientGender})
      const {data : allPatients} = useGetAllAdminPatientsQuery()
      console.log(data)
  const toggleDrawer = () => {
          setIsOpen((prevState) => !prevState)
        }  
        const handlePageChange = (value) =>{
            console.log(value)
            setPage(value)
        }
    const handleSortChange = (e) => {
      setSortBy(e.target.value);
  };
  const uniqueDoctors = Array.from(
  new Map(
    allPatients?.patients?.map((app) => [
      app?.name,
      {
        value: app?.name,
        label: app?.name,
      },
    ])
  ).values()
);
const handleGenderChange = (selectedOption) =>{
  setTempGender(selectedOption?.value)
  console.log(selectedOption)
}
const handleSave = () => {
    const doctorIdStr = tempDoctorSelection?.value;
    // const patientIdStr = tempSpecialtySelection?.map((item) => item.value);

  setPatientName(doctorIdStr);
  setPatientGender(tempGender)
  };
  

const uniqueGender = [
  {value : 'MALE', label: 'Male'},
  {value : 'FEMALE',label: 'Female'},
  {value : 'OTHERS',label: 'Others'}
];

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
                  title="Filter Patients"
                  onSave={handleSave}
                  direction='right'
                >
                  <label>Select Gender</label>
                  <Select
                    options={uniqueGender}
                    onChange={handleGenderChange}
                    isClearable
                  />
                </CustomDrawer>
    <div className='main-wrapper'>
                          <h3>Patients</h3>
       <div className='d-flex justify-content-between mb-2'>
        {isLoading ? "" : 
                  <div className='position-relative'>
                  <IoIosSearch className='fs-5 text-muted position-absolute' style={{top: '0.8vw', right: '10px'}}/>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  </div>}
                          <div className='d-flex gap-2'>  
                              {isLoading ? "" : <select value={sortBy} onChange={handleSortChange} className="filter-btn">
                              <option value="newly">Latest registered</option>
                              <option value="alphabetically">Patient name A-Z</option>
                            </select>}
                            {isLoading ? "" : <button className='filter-btn' onClick={toggleDrawer}><IoFilter /> Filters</button>}
                          </div>
                        </div>
      <div className='patient-wrapper'>

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
                                      {data?.patients?.length > 0 && data?.patients?.map((app, index) => (
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
                                      {data?.patients?.length === 0 && <div className='d-flex justify-content-center'>No Patient Found</div>}
                                      {
                                       data?.patients?.length > 14 && <div className="d-flex justify-content-center mt-3">
                                   <PaginationRounded onPageChange={handlePageChange}/>
                                </div>
                                      }
                                
    </>
    )}
    </div>
    </div>
    </>
  )
}

export default Patients
