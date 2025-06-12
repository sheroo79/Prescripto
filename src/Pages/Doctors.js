import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Skeleton from 'react-loading-skeleton';
import { IoIosSearch } from "react-icons/io";
import 'react-loading-skeleton/dist/skeleton.css';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/doctors.scss';
import { useGetDoctorsQuery } from '../features/ApiSlice';
import PaginationRounded from '../TestApi';
import { useDebounce } from 'use-debounce';
function AllDr() {
  const [page, setPage] = useState(1)
  const [selectSpeciality, setSelectSpeciality] = useState([]) 
  const navigate = useNavigate()
  const location = useLocation();
  // console.log(location.pathname)
  const params = new URLSearchParams(location.search)
  const specialities = params.get("specialities")
  const [searchName, setSearchName] = useState('');
  const [deBouncedSearchName] = useDebounce(searchName, 1000)
  const {data,isLoading,isFetching} = useGetDoctorsQuery({page,searchName : deBouncedSearchName,selectSpeciality})
  const selectedSpecialities = specialities ? specialities.split(",") : [];
  console.log(data?.doctors)
  // console.log(specialities)
  const handlePageChange = (value) =>{
          console.log(value)
          setPage(value)
      }
  useEffect(() => {
    const specialitiesFromURL = params.get('specialities')?.split(',') || [];
    setSelectSpeciality(specialitiesFromURL);
  }, []);
  useEffect(()=>{
    if(selectSpeciality.length > 0){
        const query = selectSpeciality.join(",")
        navigate(`/doctors?specialities=${query}`)
        // console.log("query field",query)
    } else{
      navigate(`/doctors`)
    }
  },[selectSpeciality])

  
    const handleSpeciality = (field) =>{
      if(!selectSpeciality.includes(field)){
        setSelectSpeciality(prev => [...prev, field])
      }
    }
    console.log(selectSpeciality)

    // Clicked on the card and viewed the doctor's details.
    const handleDrDetail = (id) =>{
      navigate(`/doctorDetail/${id}`)
    }
    const removeSpecialty = (fieldToRemove) =>{
    const removeField = selectSpeciality.filter((field)=> field !== fieldToRemove)
      setSelectSpeciality(removeField.length === 0 ? [] : removeField)
    }
   
  return (
    <>
          {
        isFetching && (<div className='loader-wrapper'>
          <div className='loader_modal'></div>
        </div>)
      }
      <Container className='allDr-container'>
              {isLoading ? "" : 
              <div className='position-relative w-25 mt-2'>
              <IoIosSearch className='fs-5 mx-1 text-muted position-absolute' style={{top: '0.8vw', right: '10px'}}/>
                <input
                type="text"
                className="form-control"
                placeholder="Search Dr..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              </div>}
        <div className='fieldsBtn mb-3'>
            {
              selectSpeciality?.map((field)=>(
                <button className='btn'>{field} <i class="ri-close-line" onClick={()=> removeSpecialty(field)}></i></button>
              ))
            }
        </div>
      <div className='dr-wrapper'>
        <div className='btn-wrapper'>
          <button onClick={()=> {
            navigate('/doctors');
            setSelectSpeciality([])
          }}>
            All Doctors
          </button>
          {
            ["GeneralPhysician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map((speciality)=>(
              <button className={selectedSpecialities.includes(speciality) ? 'active-btn': ''} onClick={() => handleSpeciality(speciality)}>
                {speciality}
              </button>
            ))  
          }
        </div>
           <div className='card-wrap'>
           {
            isLoading ? (<div className='skeleton-container'>
              <div className='skeleton-wrapper'>
                <Skeleton count={1} width={220} height={210}/>
                <Skeleton count={1} width={70} height={10}/>
                <Skeleton count={1} width={130} height={15}/>
                <Skeleton count={1} width={100} height={10}/>
              </div>
              <div className='skeleton-wrapper'>
                <Skeleton count={1} width={220} height={210}/>
                <Skeleton count={1} width={70} height={10}/>
                <Skeleton count={1} width={130} height={15}/>
                <Skeleton count={1} width={100} height={10}/>
              </div>
              <div className='skeleton-wrapper'>
                <Skeleton count={1} width={220} height={210}/>
                <Skeleton count={1} width={70} height={10}/>
                <Skeleton count={1} width={130} height={15}/>
                <Skeleton count={1} width={100} height={10}/>
              </div>
            </div>) : (
               data?.doctors?.map((data,index)=>(
                  <Card className='card mt-1' key={index} onClick={()=> handleDrDetail(data.id)}>
                    <div className='card-img-wrapp '>
                        <Card.Img variant="top" src={data.profile.profileImage} className='card-img'/>
                    </div>
                    <Card.Body>
                      <span className='available'>
                        <button className='available-btn'></button> Available</span>
                      <Card.Title className='card-title'>{data.profile.name}</Card.Title>
                      <div className='card-speciality'>
                        {data.specialty}
                       </div>
                    </Card.Body>
                  </Card>
              ))
            )
           }
           </div>
           {data?.doctors?.length === 0 && <div className='text-center mx-auto'>No Doctor Found</div>}
      </div>
      {
        data && data?.doctors?.length > 14 && <div className="d-flex justify-content-center">
           <PaginationRounded onPageChange={handlePageChange}/>
      </div>
      }
      </Container>
    </>
  )
}

export default AllDr
