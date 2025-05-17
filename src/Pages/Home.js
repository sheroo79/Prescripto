import React, { useEffect, useRef, useState } from 'react'
import '../Css/home.scss'
import {Container,Row,Col,Card} from 'react-bootstrap';
import {useNavigate} from  'react-router-dom'
import { axiosInstance } from '../Components/Api';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const [isData, setIsData] = useState([]);
  const specialityRef = useRef(null)
  
  const visible = 10;
  const navigate = useNavigate()

  useEffect(()=>{
   axiosInstance.get('/doctors')
   .then((res)=> setIsData(res.data.doctors))
   .catch((error)=> console.log(error, 'Data is not define'))
  },[isData])
  const handleSpecialityClick = (speciality) =>{
    navigate(`/doctors?specialities=${speciality}`)  
  }
  const handleDrDetail = (id) =>{
    navigate(`/doctorDetail/${id}`)
  }
  const scrollToSpeciality = () =>{
    specialityRef.current?.scrollIntoView({ behavior: 'smooth' });
    window.location.hash = "speciality";
  }
  const navigateToCreateAccount = ()=>{
    const GetValue = localStorage.getItem("LogedIn")
    if(GetValue === "true"){
      toast.error("Account already exists",{
        className:"toast-error"
      })
    }else{
      navigate('/signUp')
    }
    console.log(GetValue)
  }
  return (
    <>
    <Container className='home-container'>
      <div className='parent row'>
      <Col className='col-md-6 appointment'>
        <h1>
            Book Appointment
            With Trusted Doctors
        </h1> 
        <div className='img-para-wrapper'>
              <div className='img-para'>
                <img src="images/group-profile.png" alt='3Images'/>
                <p>Simply browse through our extensive list of trusted doctors,<br/>schedule your appointment hassle-free.</p>
              </div>
              <button className='book' onClick={scrollToSpeciality}>Book appointment <i class="ri-arrow-right-long-line"></i></button>
            </div>
      </Col>
        <div className='top-section col-md-6'>
          <img className='Drs3' src='images/header-img.png' alt='3Drs'/>
        </div>
      </div>
      {/* Speciality Section */}
      <div className='speciality-wrapper'>
        <h2>Find by Speciality</h2>
        <p>
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>
        <div className='Dr-fields' ref={specialityRef}>
          <div className='general' onClick={()=> handleSpecialityClick('GeneralPhysician')}>
              <img src="/images/download.svg" alt='General'/>
              <small>GeneralPhysician</small>
          </div>
          <div className='gynecologist' onClick={()=> handleSpecialityClick('Gynecologist')}>
              <img src="/images/Gynecologist-Av1zZu4d.svg" alt='Gynecologist'/>
              <small>Gynecologist</small>
          </div>
          <div className='dermotoligst' onClick={()=> handleSpecialityClick('Dermatologist')}>
              <img src="/images/Dermotoligst.svg" alt='General'/>
              <small>Dermotoligst</small>
          </div>
          <div className='pediatricians' onClick={()=> handleSpecialityClick('Pediatrician')}>
          <img src="/images/pediatricians.svg" alt='General'/>
              <small>Pediatrician</small>
          </div>
          <div className='neurologist' onClick={()=> handleSpecialityClick('Neurologist')}>
              <img src="/images/Neurologist.svg" alt='General'/>
              <small>Neurologist</small>
          </div>
          <div className='gastroenterologist' onClick={()=> handleSpecialityClick('Gastroenterologist')}>
              <img src="/images/Gastroenterologist.svg" alt='General'/>
              <small>Gastroenterologist</small>
          </div>
        </div>
      </div>
      {/* All Doctors to Book */}
      <div className='top-Dr-wrapper'>
      <h2>Top Doctors to Book</h2>
        <p className='top-dr-para'>
          Simply browse through our extensive list of trusted doctors.
        </p>
        <Row>
          {
            isData?.slice(0,visible).map((data,index)=>(
              <Col md={4} xxl={3} key={index} className='col'>
                <Card className='card' onClick={()=> handleDrDetail(data.id)}>
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
              </Col>
            ))
          }
          <div className='text-center mt-5' onClick={()=> navigate('/doctors')}>
            <button className='more'>more</button>
          </div>
        </Row>
      </div>
      {/* Trusted Dr Second Last part */}
      <div className='trusted-wrapper'>
        <div>
          <h1>Book Appointment With 100+ Trusted Doctors</h1>
          <button className='create-acc' onClick={() => navigateToCreateAccount()}>Create account</button>
          <ToastContainer theme="colored" autoClose={3000} className="custom-toast"/>
        </div>
        <img className='DzbZlMsi' src='images/appointment-img.png' alt='trust'/>
      </div>
    </Container>
    </>
  )
}

export default Home
