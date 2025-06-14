import moment from 'moment'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../Css/appointment.scss'
import PaginationRounded from '../TestApi'
import { useCancelAppointmentMutation, useGetApppointmentsQuery } from '../features/ApiSlice'
import { payFee } from '../features/FeeSlice'
function Appointments() {
    const [page, setPage] = useState(1)
    const {data, isLoading} = useGetApppointmentsQuery(page)
    const [cancelAppointment] = useCancelAppointmentMutation()
    const {loading , success, error} = useSelector(state => state.fee)
  
    console.log(loading,success,error)
    console.log(data)
    const dispatch = useDispatch()
    const [message, setMessage] = useState({})
    const [IsLoading, setIsLoading] = useState(null)
    const [isLoadingPay, setIsLoadingPay] = useState(null)
    const handlePageChange = (value) =>{
        setPage(value)
    }
    const handleCancel = async (id,cancel) => {
        if(cancel){
            toast.info("Your appointment is already cancelled.",{
            toastId : id,
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true,
              draggable: true,
              theme: "colored",
            })
            return;
        }
        console.log(id)
          setIsLoading(id);
        try {
        const response = await cancelAppointment(id).unwrap()
      console.log(response)
          if (response.status === 200 || response.status === 201) {
            toast.info("Appointment cancelled", {
              toastId : id,
              position: "top-right",
              autoClose: 4000,
              closeOnClick: true,
              draggable: true,
              theme: "colored",
            });
          } else {
            setMessage('');
          }
        } catch (error) {
          console.log(error, "Error Post method");
        } finally {
          setIsLoading(false);
        }
    };
     const handlePay = async (id) => {
      setIsLoadingPay(id)
        try {
          const result = await dispatch(payFee(id)).unwrap();
          console.log(result.url); 
          window.location.href = result.url
        } catch (err) {
          console.error("Payment failed:", err);
          }
        }

  return (
    <Container className='container-appointment'>
        <div className='header'>
            <span>My Appointments</span>
        </div>
        <div className='app-body'>
            {
                        isLoading ? (<div className='skeleton-containers'>
                          <div className='skeleton-wrappers'>
                            <div className='d-flex gap-3'>
                                <Skeleton count={1} width={88} height={90}/>
                                <Skeleton count={1} width={200} height={90}/>
                            </div>
                            <Skeleton count={1} width={150} height={40}/>
                          </div>
                          <div className='skeleton-wrappers'>
                            <div className='d-flex gap-3'>
                                <Skeleton count={1} width={88} height={90}/>
                                <Skeleton count={1} width={200} height={90}/>
                            </div>
                            <Skeleton count={1} width={150} height={40}/>
                          </div>
                          <div className='skeleton-wrappers'>
                            <div className='d-flex gap-3'>
                                <Skeleton count={1} width={88} height={90}/>
                                <Skeleton count={1} width={200} height={90}/>
                            </div>
                            <Skeleton count={1} width={150} height={40}/>
                          </div>
                        </div>) : (
                            <> 
                            {
                              !data?.appointments || data?.appointments.length === 0 ? (
                              <div className='no-appointment-message'>
                                No Appointment Found
                              </div>
                            ) : data?.appointments?.map((appoint,index)=> (
                                <div className='dr-info-wrapper' key={index}>
                                    <div className='dr-info'>
                                        <div className='doc-img-wrap'>
                                            <img src={appoint?.doctor?.profile?.profileImage}/>
                                        </div>
                                        <div className='info'>
                                            <h6>{appoint?.doctor?.profile?.name}</h6>
                                            <div className="address">
                                                <strong>Fee</strong> : <strong>{appoint.doctor?.fee}$</strong>
                                            </div>
            
                                            <div className="datetime">
                                                <strong>Date & Time:</strong>
                                                <p>{moment.utc(appoint?.appointmentDate).format('YYYY-MM-DD hh:mm a')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Cancle Appointment */}
                                    <div className='cancle'>
                                        <button className='pay-btn' onClick={()=> handlePay(appoint.id)} disabled={appoint.isPaid || appoint.isCancel}>
                                            {
                                              isLoadingPay === appoint.id ? (<div className={isLoadingPay && `loader`}></div>) : (appoint.isPaid ? "Paid" : appoint.isCancel ? "Cancelled" : "Pay here")
                                            }
                                        </button>
                                        <button className={appoint.isCancel === true ? `btn cancelled` : `btn`} onClick={()=> handleCancel(appoint.id,appoint.isCancel)}>
                                            {
                                                IsLoading === appoint.id ? (<div className={IsLoading && `loader`}></div>) : (appoint.isCancel === true ? "Appointment Cancelled" : "Cancel Appointment")
                                            }
                                        </button>
                                    </div>
                                </div>
                            ))
                            }
                            </>
                        )
                        }
        </div>
                {
                  data?.appointments?.length > 14 && (
                    <div className="d-flex justify-content-center">
                      <PaginationRounded onPageChange={handlePageChange}/>
                    </div>
                  )
                }
            <ToastContainer theme='colored' autoClose={2000} className="custom-toast" />
    </Container>
  )
}

export default Appointments
