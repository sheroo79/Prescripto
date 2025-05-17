import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import '../Css/signUp.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const [error, setError] = useState({email: '', password: ''})   
    const handleChange = (e) =>{
        setUser({...user,[e.target.name] : e.target.value})
        setError('')
    }
    const handleSubmit = async (e) =>{
        setLoader(true)
        e.preventDefault();    
        // const formData = new FormData();
        // formData.append('email', user.email);
        // formData.append('password', user.password);
        if(user.email === ""){
            setError({email: 'Email is required'})
            setLoader(false)
            return;
        }else if(user.password === ""){
            setError({password: 'Password is required'})
            setLoader(false)
            return;
        }
        try {
            const response = await axios.post('https://doc-q-book.vercel.app/api/auth/login',user)
            console.log(response.data, 'user is Login')
                if(response.status === 200 || response.status === 201){
                    localStorage.setItem('token',response.data.token)
                    // localStorage.setItem("LogedIn", "true")
                    
                    toast.success("Login successfully!",{
                        className:"toast-success"
                    })
                }
                if(response.data.user.role === "ADMIN"){
                    console.log("Yes This is Admin")
                    localStorage.setItem("ADMIN", "true")
                    setTimeout(() => {
                        navigate('/admin-dashboard')
                    }, 3000)
                }
                if(response.data.user.role === "PATIENT"){
                    console.log("Yes This is Patient")
                    localStorage.setItem("PATIENT", "true")
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                }
                if(response.data.user.role === "DOCTOR"){
                    console.log("Yes This is DOCTOR")
                    localStorage.setItem("DOCTOR", "true")
                    setTimeout(() => {
                        navigate('/doctor/doctor-dashboard')
                    }, 3000)
                }
        } catch (error) {
            console.log('Not Login',error)
            toast.error("Invalid email or password. Please try again.",{
                className:"toast-error"
            })
        }finally{
            setLoader(false)
        }
    }

  return (
    <>
    {
      loader && <div className='loader-wrapper'>
      <div className='loader_modal'></div>
    </div>
    }
    <ToastContainer theme='colored' autoClose={2000} className="custom-toast" />
        <Container className='account-container'>
            <div className='account-wrapper'>
                <h4>Login</h4>
                <p>Please login up to book appointment</p>
                <form onSubmit={handleSubmit}>
                <div className='in-2'>
                    <label>Email</label>
                    <input type='email' name='email' onChange={handleChange}/>
                    {error.email && <p className='error'>{error.email}</p>}
                </div>
                <div className='in-3'>
                    <label>Password</label>
                    <input type='password' name='password' onChange={handleChange}/>
                    {error.password && <p className='error'>{error.password}</p>}
                </div>
                    <button type='submit' className='Account-btn'>LogIn</button>
                </form>
                <p className='login-p'>Create an new account? <Link to="/signUp">Click here</Link></p>
            </div>
        </Container>
    </>
  )
}

export default Login
