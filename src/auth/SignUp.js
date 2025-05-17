import React, { useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import '../Css/signUp.scss'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify';
function CreateAccout() {
    const navigate = useNavigate()
    const [user,setUser] = useState({
        name: '',
        email:'',
        password:'',
        confirm_password:''
    })
    const [error, setError] = useState({password: '', confirm_password: '',name:''})
    const handleChange = (e) =>{
        setUser({...user,[e.target.name] : e.target.value})
        setError('')
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const reguxe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(user.name.trim() === '' ||
            user.email.trim() === '' ||
            user.password.trim() === '' ||
            user.confirm_password.trim() === ''){
            setError({
                name: user.name.trim() === '' && 'Name is required',
                email: user.email.trim() === '' && 'Email is required',
                password: user.password.trim() === '' && 'Password is required',
                confirm_password: user.confirm_password.trim() === '' && 'Confirm password is required',
                  });
            return;
        }
        // if (!reguxe.test(user.password)) {
        //     setError({ password: 'Use 8+ chars with uppercase, lowercase, number & special char' });
        //     return;
        //   }
        if(user.password !== user.confirm_password){
            setError({confirm_password: 'Password does not match'})
            return; 
        }
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('confirm_password', user.confirm_password);
        try {
            const response = await axios.post('https://doc-q-book.vercel.app/api/auth/signup',formData,
                {headers:{
                    'Content-Type': 'multipart/form-data'
                }}
            )
            console.log(response, 'user is signUp')
            if(response.data.user.role === "PATIENT"){
                localStorage.setItem("PATIENT", "true")
            }
            if(response.status === 200 || response.status === 201){
                localStorage.setItem('user',JSON.stringify(response.data.user))
                localStorage.setItem("LogedIn", "true")
                
                toast.info(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored"
                });
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            }
        } catch (error) {
            console.log('not signUp', error)
            console.log(error.response.data.message, 'user is not signUp')
            if(error){
                toast.info(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored"
                });
            }
        }
    }
  return (
    <>
        <Container className='account-container'>
            <div className='account-wrapper'>
                <h4>Create Account</h4>
                <p>Please sign up to book appointment</p>
                <form onSubmit={handleSubmit}>
                <div className='in-1'>
                    <label>Full Name</label>
                    <input type='text' name='name' value={user.name} onChange={handleChange}/>
                    {error.name && <p className='error'>{error.name}</p>}
                </div>
                <div className='in-2'>
                    <label>Email</label>
                    <input type='email' name='email' value={user.email} onChange={handleChange}/>
                    {error.email && <p className='error'>{error.email}</p>}
                </div>
                <div className='in-3'>
                    <label>Password</label>
                    <input type='password' name='password' value={user.password} onChange={handleChange}/>
                    {error.password && <p className='error'>{error.password}</p>}
                </div>
                <div className='in-3'>
                    <label>Confirm Password</label>
                    <input type='password' name='confirm_password' value={user.confirm_password} onChange={handleChange}/>
                    {error.confirm_password && <p className='error'>{error.confirm_password}</p>}
                </div>
                    <button type='submit' className='Account-btn'>Create Account</button>
                </form>
                <p className='login-p'>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </Container>
        <ToastContainer/>
    </>
  )
}

export default CreateAccout
