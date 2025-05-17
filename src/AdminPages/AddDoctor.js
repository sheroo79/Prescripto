import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast} from 'react-toastify';
function AddDoctor() {
  const Ref = useRef()
  const [drImage, setdrImage] = useState(null)
  const [miniLoader, setMiniLoader] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    specialty:'',
    degree:'',
    addresses:'',
    experience:'',
    fee:'',
    about:'',
    gender: '',
    profileImage:null
  })
  const handleChange = (e) =>{
    setFormData((prev)=> ({...prev, [e.target.name]: e.target.value}))
    console.log(e.target.name)
  }
  useEffect(()=>{
    console.log(formData)
  },[formData,drImage])

  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    if (!file) {
      console.log("No file selected.");
      return;
    }
    if(file){
        setFormData((prev)=> ({...prev,profileImage : file}))
    }
    const reader = new FileReader()
    reader.onloadend = ()=>{
      setdrImage(reader.result)
    }
    reader.readAsDataURL(file)
  }
  const handleClickIcon = () =>{
    Ref.current.click()
  }
  const handleSubmit = () =>{
    if(formData.name === ''){
      toast.info('Name is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.email === ''){
      toast.info('Email is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.password === ''){
      toast.info('Password is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.specialty === ''){
      toast.info('Speciality is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.fee === ''){
      toast.info('Fee is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.experience === ''){
      toast.info('Experience is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.gender === ''){
      toast.info('Gender is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.addresses === ''){
      toast.info('Addresses is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.about === ''){
      toast.info('About is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
  } else if(formData.profileImage === null){
      toast.info('Profile Image is Requarid', {
        autoClose: 3000,
        theme: "colored"
    });
    return;
    }
    setMiniLoader(true)
    const form = new FormData()
    form.append("name",formData.name)
    form.append("email",formData.email)
    form.append("password",formData.password)
    form.append("specialty",formData.specialty)
    form.append("fee",formData.fee)
    form.append("experience",formData.experience)
    form.append("addresses",formData.addresses)
    form.append("about",formData.about)
    form.append("degree",formData.degree)
    form.append("gender",formData.gender)
    form.append("profileImage",formData.profileImage)
    console.log([...form.entries()]);
    const token = localStorage.getItem('token')
    console.log(token)
    
      axios.post('https://doc-q-book.vercel.app/api/doctors',form,{
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": 'multipart/form-data'
        }
      })
      .then((response)=> {console.log(response)
          if(response.data.status === 400){
            toast.info("Please check your form inputs. Something is invalid.", {
              autoClose: 3000,
              theme: "colored"
          });
        } else {
          toast.info("Doctor added successfully!", {
            autoClose: 3000,
            theme: "colored"
          });
          setFormData({
            name: '',
            email: '',
            password:'',
            specialty:'',
            degree:'',
            addresses:'',
            experience:'',
            fee:'',
            about:'',
            gender: '',
            profileImage: null
          });
          setdrImage(null)
        }
      })
     .catch ((error)=> {
       console.log(error, "Error Post Data")
     }).finally(()=>{
      setMiniLoader(false)
     })
    

  }
  
  return (
    <section className='Add-Dr-wrapper'>
      {
      miniLoader && <div className='loader-wrapper'>
      <div className='loader_modal'></div>
    </div>
    }
      <h5>Add Doctor</h5>
      <div className='add-dr-wrapper'>
          <div className='d-flex align-items-center gap-3'>
            <div className='user-img'>
            <div className="overlay" onClick={handleClickIcon}>
              <label>
                <i className="icon"><i className="ri-pencil-fill text-white"></i></i>
              </label>
            </div>  
              {drImage !== null ? <img src={drImage} alt='Dr-img'/> : <i className="ri-user-3-fill" onClick={handleClickIcon}></i>}
              <input type='file' ref={Ref} className='d-none' onChange={handleFileChange}/>
            </div>      
            <span className='text-muted'>Upload Image</span>
          </div>
          <div className='input-wrapper'>
            <div className='inp-1'>
              <label>Name</label>
              <input type='text' placeholder='Name' name='name' value={formData.name} onChange={handleChange}/>
            </div>
            <div className='inp-1'>
              <label>Select Speciality</label>
              <select value={formData.specialty} name='specialty' onChange={handleChange}>
                <option value="GeneralPhysician">GeneralPhysician</option>
                <option value="Dermatologist">Dermotoligist</option>
                <option value="Gynecologist">Gynalogist</option>
                <option value="Gastroenterologist">Gastrologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </div>
            <div className='inp-1'>
              <label>Email</label>
              <input type='text' value={formData.email} placeholder='email' name='email' onChange={handleChange}/>
            </div>
            <div className='inp-1'>
              <label>Password</label>
              <input type='text' placeholder='password' value={formData.password} name='password' onChange={handleChange}/>
            </div>
            <div className='inp-1'>
              <label>Degree</label>
              <input type='text' placeholder='degree' name='degree' value={formData.degree} onChange={handleChange}/>
            </div>
            <div className='inp-1'>
              <label>Gender</label>
              <select value={formData.gender} name='gender' onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            </div>
            <div className='inp-1'>
              <label>Address</label>
              <input type='text' placeholder='address' value={formData.addresses} name='addresses' onChange={handleChange}/>
            </div>
            <div className='inp-1'>
              <label>Experience</label>
              <select id="experience" name='experience' value={formData.experience} onChange={handleChange}>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
                <option>4 Years</option>
                <option>5 Years</option>
                <option>6 Years</option>
                <option>7 Years</option>
                <option>8 Years</option>
                <option>9 Years</option>
                <option>10 Years</option>
              </select>
            </div>
            <div className='inp-1'>
              <label>Fee</label>
              <input type='text' placeholder='Doctor Fee' name='fee' value={formData.fee} onChange={handleChange}/>
            </div>
            <div className='inp-1'>
              <label>About</label>
              <textarea cols={70} rows={5} placeholder='write about doctor' value={formData.about} name='about' onChange={handleChange}>

              </textarea>
              <button type='submit' className='btn addDr-btn' onClick={handleSubmit}>Add Doctor</button>
            </div>
          </div>
      </div>
      <ToastContainer/>
    </section>
  )
}

export default AddDoctor
