import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDebounce } from 'use-debounce';
import CustomDrawer from '../Components/CustomDrawer';
import '../Css/AdminStyle.scss';
import { useGetAdminDoctorQuery, useGetAllDoctorsQuery } from '../features/ApiSlice'
import PaginationRounded from '../TestApi';
function DoctorList() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [sortBy, setSortBy] = useState('newly');
  const [tempDoctorSelection, setTempDoctorSelection] = useState([]);
  const [tempSpecialtySelection, setTempSpecialtySelection] = useState([]);
  const [tempGender, setTempGender] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [gender, setGender] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [deBouncedSearchName] = useDebounce(searchName, 1000)
  const { data, isLoading, isFetching } = useGetAdminDoctorQuery({ page, searchName : deBouncedSearchName, specialty, sortBy, gender })
  const { data: allDoctors } = useGetAllDoctorsQuery()
  
  const handlePageChange = (value) => {
    console.log(value)
    setPage(value)
  }
  const handleDrDetail = (id) => {
    navigate(`/Admin-Dr-Details/${id}`)
  }
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const handleSpecialtyChange = (selectedOption) => {
    setTempSpecialtySelection(selectedOption);
    console.log(selectedOption)
  };
  const handleGenderChange = (selectedOption) => {
    setTempGender(selectedOption)
    console.log(selectedOption)
  }
  const handleSave = () => {
    // const doctorIdStr = tempDoctorSelection?.value;
    const patientIdStr = tempSpecialtySelection?.map((item) => item.value);
    const genderStr = tempGender?.map((item) => item.value);

    // setDoctorName(doctorIdStr);
    setSpecialty(patientIdStr);
    setGender(genderStr)
  };
  const uniqueDoctors = Array.from(
    new Map(
      allDoctors?.doctors?.map((app) => [
        app?.profile?.name,
        {
          value: app?.profile?.name,
          label: app?.profile?.name,
        },
      ])
    ).values()
  );
  const uniqueSpeciality = Array.from(
    new Map(
      allDoctors?.doctors?.map((app) => [
        app?.specialty,
        {
          value: app?.specialty,
          label: app?.specialty,
        },
      ])
    ).values()
  );

  const uniqueGender = [
    { value: 'MALE', label: 'MALE' },
    { value: 'FEMALE', label: 'FEMALE' }
  ];
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const handleClear = () => {
    setTempDoctorSelection([])
    setTempGender([])
    setTempSpecialtySelection([])
  }
console.log(searchName)
  return (
    <>
      {
        isFetching && (<div className='loader-wrapper'>
          <div className='loader_modal'></div>
        </div>)
      }
      <CustomDrawer isOpen={isOpen}
                    onClose={toggleDrawer}
                    onSave={handleSave}
                    onClear={handleClear}
                    >
        <h5>Filter Doctors</h5>

        <div className='mt-3'>
          <label>Select Speciality</label>
          <Select
            isMulti
            options={uniqueSpeciality}
            onChange={handleSpecialtyChange}
            value={tempSpecialtySelection}
            isSearchable
          />
        </div>
        <div className='mt-3'>
          <label>Select Gender</label>
          <Select
            isMulti
            options={uniqueGender}
            value={tempGender}
            onChange={handleGenderChange}
          />
        </div>
      </CustomDrawer>
      <div className='doctor-list'>
        <h3>All Doctors</h3>
        <div className='mb-2 px-1 d-flex justify-content-between align-items-center position-relative'>
          {isLoading ? "" : 
          <div className='mx-3 position-relative'>
          <IoIosSearch className='fs-5 mx-1 text-muted position-absolute' style={{top: '0.8vw', right: '10px'}}/>
            <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          </div>}
          <div className='d-flex gap-2 px-3'>
            {isLoading ? "" : <select value={sortBy} onChange={handleSortChange} className="filter-btn">
              <option value="newly">Latest registered</option>
              <option value="alphabetically">Doctor name A-Z</option>
            </select>}
            {isLoading ? "" : <button className='filter-btn' onClick={toggleDrawer}><IoFilter /> Filters</button>}
          </div>
        </div>
        <div className='card-wrapper'>
          {
            isLoading ? (<div className='skeleton-container'>
              <div className='skeleton-wrapper'>
                <Skeleton count={1} width={220} height={210} />
                <Skeleton count={1} width={70} height={10} />
                <Skeleton count={1} width={130} height={15} />
                <Skeleton count={1} width={100} height={10} />
              </div>
              <div className='skeleton-wrapper'>
                <Skeleton count={1} width={220} height={210} />
                <Skeleton count={1} width={70} height={10} />
                <Skeleton count={1} width={130} height={15} />
                <Skeleton count={1} width={100} height={10} />
              </div>
              <div className='skeleton-wrapper'>
                <Skeleton count={1} width={220} height={210} />
                <Skeleton count={1} width={70} height={10} />
                <Skeleton count={1} width={130} height={15} />
                <Skeleton count={1} width={100} height={10} />
              </div>
            </div>) : (
              data?.doctors?.map((data, index) => (
                <Card className='card' key={index} onClick={() => handleDrDetail(data.id)}>
                  <Card.Img variant="top" src={data.profile.profileImage} className='card-img' />
                  <Card.Body>
                    <Card.Title className='card-title'>{data.profile.name}</Card.Title>
                    <div className='card-speciality'>
                      {data.specialty}
                    </div>
                    <span className='available text-muted' >
                      <input type='checkbox' checked /> Available</span>
                  </Card.Body>
                </Card>
              ))
            )
          }
          {data?.doctors?.length === 0 && (
            <div className='no-doctor'>No Doctor Found</div>
          )}
        </div>
        {
          data && data.doctors.length > 14 && <div className="d-flex justify-content-center">
            <PaginationRounded onPageChange={handlePageChange} />
          </div>
        }
      </div>
    </>
  )
}

export default DoctorList
