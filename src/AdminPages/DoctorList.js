import React from 'react'
import { Card } from 'react-bootstrap'
import { useState,useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { axiosInstance } from '../Components/Api'
import { useNavigate } from 'react-router-dom'
function DoctorList() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isDr, setIsDr] = useState([])
 useEffect(()=>{
      axiosInstance.get('/doctors')
      .then((res)=> {
        setIsDr(res.data.doctors)
          setLoading(false)
      })
      .catch((error)=> console.log(error))
    },[])
    const handleDrDetail = (id) =>{
      navigate(`/Admin-Dr-Details/${id}`)
    }
  return (
    <>
                <div className='doctor-list'>
                  <h3>All Doctors</h3>
                <div className='card-wrapper'>
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
                     isDr?.map((data,index)=>(
                        <Card className='card' key={index} onClick={()=> handleDrDetail(data.id)}>
                          <Card.Img variant="top" src={data.profile.profileImage} className='card-img'/>
                          <Card.Body>
                            <Card.Title className='card-title'>{data.profile.name}</Card.Title>
                            <div className='card-speciality'>
                              {data.specialty}
                             </div>
                            <span className='available text-muted' >
                             <input type='checkbox' checked/> Available</span>
                          </Card.Body>
                        </Card>
                    ))
                  )
                 }
                </div>
                </div>
    </>
  )
}

export default DoctorList
