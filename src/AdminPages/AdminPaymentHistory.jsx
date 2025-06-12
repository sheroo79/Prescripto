import moment from 'moment';
import { Container } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useGetPaymentQuery } from "../features/ApiSlice";
function PaymentHistory() {
  const {data,isLoading} = useGetPaymentQuery()
  console.log(data)
  return (
    <>
    <Container className='home-container' fluid>
      <h2>Payment History</h2>
      {
                                isLoading ? (<div className='skeleton-container-appointment'>
                                  <div className='skeleton-wrapper-app d-flex justify-content-center'>
                                    <Skeleton count={1} width={800} height={40}/>
                                    <div className='d-flex gap-5 mb-4'>
                                      <Skeleton count={1} width={10} height={20}/>
                                      <Skeleton count={1} width={60} height={20}/>
                                      <Skeleton count={1} width={20} height={20}/>
                                      <Skeleton count={1} width={70} height={20}/>
                                      <Skeleton count={1} width={100} height={20}/>
                                      <Skeleton count={1} width={20} height={20}/>
                                      <Skeleton count={1} width={70} height={20}/>
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
                                      <Skeleton count={1} width={70} height={20}/>
                                    </div>
                                  </div>
                                </div>) : (
                                  <>
                                <div className='a-wrapper d-flex justify-content-center'>
                                  <table className='appointments-table'>
                                  <thead>
                                    <tr className='text-muted'>
                                      <th className='border'>#</th>
                                      <th className="border">Patient Name</th>
                                      <th className="border">Doctor Name</th>
                                      <th className="border">Specialty</th>
                                      <th className="border">Appointment Date</th>
                                      <th className="border">Amount</th>
                                      <th className="border">Status</th>
                                      <th className="border">Cancellation</th>
                                      <th className="border">Transaction Date</th>
                                    </tr>
                                  </thead>
                                  <tbody className='text-muted'>
                              {data?.transactions?.map((app, index) => (
                                <tr key={index}>
                                  <td className="border">{app.id}</td>
                                  <td className="border">{app?.user?.name}</td>
                                  <td className="border">
                                    <div className='d-flex align-items-center'>
                                      <span className='ms-2'>{app.appointment?.doctor?.profile?.name}</span>
                                    </div>
                                  </td>
                                  <td className="border">{app?.appointment?.doctor?.specialty}</td>
                                  <td className="border">{moment(app.appointment?.appointmentDate).format('YYYY-MM-DD h:mm a')}</td>
                                  <td className="border">{app?.amount}$</td>
                                  <td className="border">{app?.status}</td>
                                  <td className="border">{app?.appointment?.isCancel === true ? "Cancelled" : "Scheduled"}</td>
                                  <td className="border">{moment(app.createdAt).format('YYYY-MM-DD h:mm a')}</td>
                                </tr>
                              ))}
                                  </tbody>
                                </table>
      
                              </div>
                                  {/* {
                                    data?.transactions.length > 14 && <div className="d-flex justify-content-center mt-3">
                                      <PaginationRounded onPageChange={handlePageChange}/>
                                    </div>
                                  } */}
                                  </>
                                )
      }
    </Container>
    </>
  )
}

export default PaymentHistory