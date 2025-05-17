import React, { useEffect, useState } from 'react'
import '../Css/drdetails.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../Components/Api';
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Drdetail() {
    const [relatedDoctors, setRelatedDoctors] = useState([])
    const [doctor, setDoctor] = useState(null)
    const {id} = useParams();
    const navigate = useNavigate()
    console.log(id)
    useEffect(()=>{
        const fetchData = async () =>{
        try {
           const getData = await axiosInstance.get(`/doctors/${id}`)       
            setDoctor(getData.data)
            setRelatedDoctors(getData.data.related_doctors)
        } catch (error) {
            console.log(error, 'Error Fatching Data')
        }
    }
    fetchData()
},[id])

console.log(doctor)
    useEffect(() => {
    if (doctor) {
        console.log("✅ Doctor updated:", doctor);
        console.log("✅ Related Doctors:", relatedDoctors);
    }
  }, [doctor]);
    const handleDrDetail = (id) =>{
        navigate(`/Admin-Dr-Details/${id}`)
    }
return (
    <>
    
        <Container className='Drdetails-container'>
            <div className='Drdetails-wrapper'>
            <div className='img-wrapper'>
                {
                    !doctor 
                    ? <Skeleton width='100%' height='100%' style={{position:'absolute',left:'0'}} /> 
                    : <img src={doctor?.doctor.profile.profileImage} alt='DR' />
                }
            </div>
               <div className='details'>
                    { !doctor ? <Skeleton className='sk-profile-name'/> : <h3>{doctor?.doctor.profile.name} <i className="ri-verified-badge-fill"></i></h3>}
                    {!doctor  ? <Skeleton className='sk-Dr-degree' />   : <p>{doctor?.doctor.degree} - {doctor?.doctor.specialty} <span className='year'>{doctor?.doctor.experience} Year</span></p>}
    
                    {!doctor ? <Skeleton width={20} height={15} style={{ marginBottom: '5px' }} /> : <span className='about-span'>About</span>}
                    {!doctor ? (<>
                                <Skeleton width="100%" height={10} style={{ marginBottom: '5px' }} />
                                <Skeleton width="90%" height={10} style={{ marginBottom: '5px' }} />
                                <Skeleton width="95%" height={10} style={{ marginBottom: '45px' }} />
                                 </>
                                )
                            : <p className='discription'>{doctor?.doctor.about}</p>
                        }
                    {!doctor ? <Skeleton width={180} height={20} /> : <p className='fee'>Appointment fee: {doctor?.doctor.fee}$</p>}
                </div>
            </div>
            {/* Realted Doctors */}
            <div className='realted-field mt-5'>
                <h3>Related Doctors</h3>
                <p>Simply browse through our extensive list of trusted doctors.</p>
                <div className='card-field'>
                {
                    relatedDoctors?.map((data,index)=>(
                        <Card className='card' key={index} onClick={()=> handleDrDetail(data.id)}>
                        <Card.Img variant="top" src={data.profile.profileImage} className='img-fluid card-img'/>
                            <Card.Body>
                            <span className='available'><button className='available-btn'>
                                </button> Available</span>
                            <Card.Title className='card-title'>{data.profile.name}</Card.Title>
                        <div className='card-speciality'>
                            {data.specialty}
                        </div>
                        </Card.Body>
                    </Card>
                    ))
                }
                </div>
            </div>
        </Container>
        <ToastContainer/>
    </>
  )
}

export default Drdetail