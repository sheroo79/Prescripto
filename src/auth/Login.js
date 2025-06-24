import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../Css/signUp.scss'
import { loginUser } from '../features/ApiSlice'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error,role } = useSelector((state) => state.auth)
  const [user, setUser] = useState({ email: '', password: '' })
  const [formError, setFormError] = useState({ email: '', password: '' })
    console.log(role)
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    setFormError({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.email === '') {
      setFormError({ email: 'Email is required' })
      return
    } else if (user.password === '') {
      setFormError({ password: 'Password is required' })
      return
    }
    dispatch(loginUser(user))
    
  }
  useEffect(()=>{
    const Admin = localStorage.getItem('ADMIN')
    const Patient = localStorage.getItem('PATIENT')
    const Doctor = localStorage.getItem('DOCTOR')
    if (error) {
      toast.error("Invalid email or password", { className: "toast-error" })
    }
    console.log(Patient)
    if (role === 'ADMIN') {
      toast.success("Login successfully!",{
        className:"toast-success",
        toastId : "Login successfully!",
      })
      setTimeout(() => navigate('/admin-dashboard'), 2000)
      return;
    }
    if (role === 'PATIENT') {
      toast.success("Login successfully!",{
        className:"toast-success",
        toastId : "Login successfully!",
      })
      setTimeout(() => navigate('/'), 2000)
      return;
    }
    if (role === 'DOCTOR') {
      toast.success("Login successfully!",{
        className:"toast-success",
        toastId : "Login successfully!",
      })
      setTimeout(() => navigate('/doctor/doctor-dashboard'), 2000)
      return;
    }
  },[loading, error])

  return (
    <>
      {loading && (
        <div className='loader-wrapper'>
          <div className='loader_modal'></div>
        </div>
      )}
      <ToastContainer theme='colored' autoClose={2000} className='custom-toast' />
      <Container className='account-container'>
        <div className='account-wrapper'>
          <h4>Login</h4>
          <p>Please login to book appointment</p>
          <form onSubmit={handleSubmit}>
            <div className='in-2'>
              <label>Email</label>
              <input type='email' name='email' onChange={handleChange} />
              {formError.email && <p className='error'>{formError.email}</p>}
            </div>
            <div className='in-3'>
              <label>Password</label>
              <input type='password' name='password' onChange={handleChange} />
              {formError.password && <p className='error'>{formError.password}</p>}
            </div>
            <button type='submit' className='Account-btn'>LogIn</button>
          </form>
          <p className='login-p'>Create a new account? <Link to="/signUp" className="text-blue-500 underline">Click here</Link></p>
        </div>
      </Container>
    </>
  )
}

export default Login
