import React, { useEffect, useState } from 'react'
import '../Css/drdetails.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../Components/Api';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Drdetail() {
    const [relatedDoctors, setRelatedDoctors] = useState([])
    const [doctor, setDoctor] = useState(null)
    const [selectIndex, setSelectIndex] = useState(0)
    const [weekdays, setWeekdays] = useState()
    const {id} = useParams();
    const idNumber = Number(id)
    const navigate = useNavigate()
    const [timeSlotIndex, setTimeSlotIndex] = useState()
    const [btnSlotIndex, setBtnSlotIndex] = useState()
    const [backendDate, setbackendDate] = useState(null)
    const [miniLoader, setMiniLoader] = useState(false)
    const token = localStorage.getItem('token')
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
const slots = [
  ['09:00', '09:30', '10:30', '11:30', '12:00', '13:00', '14:30', '15:30', '17:00'],
  ['09:00', '10:00', '10:30', '11:30', '12:30', '13:30', '14:00', '15:00', '16:30'],
  ['09:30', '10:00', '11:00', '12:00', '13:00', '14:00', '15:30', '16:00', '17:00'],
  ['09:00', '10:00', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30'],
  ['09:00', '09:30', '10:30', '11:30', '13:00', '14:30', '15:30', '16:30'],
  ['09:30', '10:30', '11:30', '12:30', '13:30', '14:00', '15:00', '16:00'],
  ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
];

//   console.log(slots[timeSlotIndex])
//   console.log(`${btnSlotIndex.btnValue.fullDate} ${timeSlotIndex.value}`)
useEffect(() => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7 ; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        console.log(date)
        dates.push({
            weekday : date.toLocaleDateString("en-us",{weekday:'short'}),
            day : date.getDate(),
            fullDate : moment(date).format('YYYY-MM-DD')
        })
        setWeekdays(dates)
    }
}, []);
useEffect(()=>{
    console.log(weekdays)
},[weekdays])

// console.log(doctor)
//     useEffect(() => {
//     if (doctor) {
//         console.log("✅ Doctor updated:", doctor);
//         console.log("✅ Related Doctors:", relatedDoctors);
//     }
//   }, [doctor]);
    const handleDrDetail = (id) =>{
        navigate(`/doctorDetail/${id}`)
    }

    const handleAppointment = () =>{
        const token = localStorage.getItem('token')
        setMiniLoader(true)
        if(!token){
            toast.info("Please log in to continue.")
            return;
        }
        if(btnSlotIndex === undefined || timeSlotIndex === undefined){
            setMiniLoader(false)
            toast.error("Please select both a date and a time slot before proceeding.");
            return;
        }
      
            console.log(token)
            axios.post('https://doc-q-book.vercel.app/api/appointments',{
                "doctorId": idNumber,
                // "appointmentDate": "2025-04-25 20:00"
                "appointmentDate": `${btnSlotIndex.btnValue.fullDate} ${timeSlotIndex.value}`
            },{
                headers :{
                    "Content-Type":'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then((response)=> {console.log(response);
                if(response.status === 200 || response.status === 201){
                    toast.info('Your appointment has been successfully booked!', {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                        toastId:'Your appointment has been successfully booked!'
                    });
                }
            })
            .catch ((error)=>{
                toast.info(error?.response?.data && "Time slot is not available for the doctor", {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored"
                });
                console.log(error, "Error Post Data")
            }) 
            .finally(()=>{
                setMiniLoader(false)
            })
    }
    useEffect(()=>{
        if(!token || !id) return;
        axios.get(`https://doc-q-book.vercel.app/api/appointments?doctorId=${id}`,{
            headers:{
                Authorization : `Bearer ${token}` 
            }
        }).then((response)=>{
            console.log(response.data.appointments)
                const allAppointments = response.data.appointments.map((app,index)=> {
                const dateString = app.appointmentDate.split("T")[0].split("-")[2];
                const timeString = app.appointmentDate.split("T")[1]
                const formattedTime = moment.utc(timeString, "HH:mm:ss.SSSZ").format("h:mm");
                // console.log(dateString,formattedTime)
                setbackendDate(formattedTime)
                
            })
        })
    },[])
    useEffect(()=>{
        console.log(backendDate)
    },[backendDate])
return (
    <>
    
        <Container className='Drdetails-container'>
            <div className='Drdetails-wrapper'>
            <div className='img-wrapper'>
                {
                    !doctor 
                    ? <Skeleton className='doc-skeleton'/> 
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
            <div className='slots'>
            
                <p>Booking slots</p>
                <div className='btn-wrapper'>
                    {
                        weekdays?.map((data,index)=>(
                            <button key={index} className={selectIndex === index ? `btn-slot focus` : 'btn-slot'} onClick={()=> {setSelectIndex(index);                               
                                setBtnSlotIndex({btnIndex:index,btnValue:data})
                            }}>
                                {data.weekday}<br/>{moment(data.day,"D").format("DD")}
                            </button>
                        ))
                    }
                </div>
                <div className='time-btn'>
                    {
                    slots[selectIndex].map((time,index)=>{
                        const formattedSlots = moment(time,'HH:mm').format('h:mm a') 
                        const formattedSlotsWithOutA = moment(time,'HH:mm').format('h:mm') 
                        if(formattedSlotsWithOutA == backendDate){
                            return null;
                        }
                        return (
                            <button key={index} className={timeSlotIndex?.currentIndex === index ? `btns focus` : 'btns'} onClick={()=> {setTimeSlotIndex({currentIndex: index, value: time})}}>
                                {formattedSlots}
                            </button>
                        )               
                    })
                    }
                </div>
                <button className='book-btn' onClick={()=> {handleAppointment()}}>
                    {
                        miniLoader ? <div className="loader"></div> : "Book an appointment"
                    }
                </button>
            </div>
            {/* Realted Doctors */}
            <div className='realted-field'>
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