import { FaCheckCircle } from "react-icons/fa";
import '../Css/appointment.scss'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
function PaymentSuccess() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cancel = queryParams.get('cancel');

  const isCancelled = cancel === "true";
  return (
    <>
        <div className="d-flex justify-content-center align-items-center bg-gray-100 m-5">
        <div className="bg-white p-8 rounded-2xl text-center successful mt-3">
          {isCancelled ? (
            <>
              {/* <FaTimesCircle className="text-red-500 text-5xl mb-2" /> */}
              <h1 className="text-2xl font-semibold text-red-700">Payment Cancelled</h1>
              <p className="text-gray-600 mt-2">You have cancelled the payment process. No charges were made.</p>
              <Link to="/appointment">Go to Appointments</Link>
            </>
          ) : (
            <>
              <FaCheckCircle className="done mb-2" />
              <h1 className="text-2xl font-semibold text-gray-800">Payment Successful</h1>
              <p className="text-gray-600 mt-2">Your appointment has been confirmed.</p>
              <Link to="/payment-history">View Payment</Link>
            </>
          )}
      </div>
    </div>
    </>
  )
}

export default PaymentSuccess
