import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import '../Css/doctors.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Container } from 'react-bootstrap'
import { useLocation, useNavigate} from 'react-router-dom';
import { axiosInstance } from '../Components/Api';
function AllDr() {
  const [isDr, setIsDr] = useState([])
  const [selectSpeciality, setSelectSpeciality] = useState([]) 
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation();
  const params = new URLSearchParams(location.search)
  const specialities = params.get("specialities")
  const selectedSpecialities = specialities ? specialities.split(",") : [];
  // console.log(specialities)
  useEffect(() => {
    const specialitiesFromURL = params.get('specialities')?.split(',') || [];
    setSelectSpeciality(specialitiesFromURL);
  }, []);
  useEffect(()=>{
    if(selectSpeciality.length > 0){
        const query = selectSpeciality.join(",")
        navigate(`/doctors?specialities=${query}`)
        console.log("query field",query)
    } else{
      navigate(`/doctors`)
    }
  },[selectSpeciality])
  useEffect(()=>{
      axiosInstance.get('/doctors')
      .then((res)=> {
        console.log(res.data.doctors)
        setIsDr(res.data.doctors)
          setLoading(false)
      })
      .catch((error)=> console.log(error))
    },[])
  
    const handleSpeciality = (field) =>{
      if(!selectSpeciality.includes(field)){
        setSelectSpeciality(prev => [...prev, field])
      }
      console.log(field)
    }

    // Clicked on the card and viewed the doctor's details.
    const handleDrDetail = (id) =>{
      navigate(`/doctorDetail/${id}`)
    }

    let filterDoctors = []
    if(selectedSpecialities.length === 0){
      filterDoctors = isDr;
    }else{
      filterDoctors = isDr.filter((data) => selectedSpecialities.includes(data.specialty));
    }
    const removeSpecialty = (fieldToRemove) =>{
    const removeField = selectSpeciality.filter((field)=> field !== fieldToRemove)
      setSelectSpeciality(removeField.length === 0 ? [] : removeField)
    }
    // if(removeField.length === 0){
    //   setSelectSpeciality([])
    // }

    useEffect(()=>{
      console.log("select Specialty ")
    },[selectSpeciality])
  return (
    <>
      <Container className='allDr-container'>
        <div className='fieldsBtn'>
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
            loading ? (<div className='skeleton-container'>
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
               filterDoctors?.map((data,index)=>(
                  <Card className='card' key={index} onClick={()=> handleDrDetail(data.id)}>
                    <div className='card-img-wrapp'>
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
      </div>
      </Container>
    </>
  )
}

export default AllDr
