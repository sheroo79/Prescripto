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
    <Container className='home-container'>
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
                                <div className='a-wrapper border px-3 py-2 d-flex justify-content-center'>
                                  <table className='appointments-table'>
                                  <thead>
                                    <tr className='text-muted'>
                                      <th>#</th>
                                      <th>Appointment Date</th>
                                      <th>Amount</th>
                                      <th>Status</th>
                                      <th>Cancellation</th>
                                      <th>Transaction Date</th>
                                    </tr>
                                  </thead>
                                  <tbody className='text-muted'>
                              {data?.transactions?.map((app, index) => (
                                <tr key={index}>
                                  <td>{app.id}</td>
                                  <td>{moment(app.appointment?.appointmentDate).format('YYYY-MM-DD h:mm a')}</td>
                                  <td>{app?.amount}$</td>
                                  <td>{app?.status}</td>
                                  <td>{app?.appointment?.isCancel === true ? "Cancelled" : "Scheduled"}</td>
                                  <td>{moment(app.createdAt).format('YYYY-MM-DD h:mm a')}</td>
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