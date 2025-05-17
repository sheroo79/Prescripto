import React, { useEffect, useState,useRef,useContext} from 'react'
import { Container, ModalFooter } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast} from 'react-toastify';
import axios from 'axios'
import '../Css/profile.scss'
import { Modal } from 'react-bootstrap';
import { UserContext } from '../Components/UserContext';

function Profile() {
const {userData, setUserData} = useContext(UserContext)
console.log(userData)
  const [editable, setEditable] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [previewImage , setPreviewImage] = useState(null)
  const [editFormData, setEditFormData] = useState({name : '',email:'',gender:'',dateOfBirth:'',profileImage:null})
  // const [userData, setUserData] = useState({
  //   name:"",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   gender: "",
  //   dateOfBirth: "",
  //   profileImage : null
  // })
  const [loader, setLoader] = useState(false)
console.log(editFormData)
  const fileInputRef = useRef(null);
  const handleChange = (e)=>{
    const { name, value } = e.target;
    setEditFormData((prevState) => ({
      ...prevState,
      [name]: value
    })
  );
    console.log("Form data updated:", editFormData);
  }
  // Get Data From Api
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", `Bearer ${token}`);
  
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }
  
    try {
      const response = await axios.get('https://doc-q-book.vercel.app/api/view-profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const user = response.data.user;
      const formattedDate = user.dateOfBirth ? user.dateOfBirth.split("T")[0] : '';
  
      setUserData({
        name: user.name || "User Name",
        email: user.email || "9434khan@gmail.com",
        phone: user.phone || "000000",
        address: user.address || "",
        gender: user.gender || "",
        dateOfBirth: formattedDate,
        profileImage : user.profileImage || null
      });
  
      // setPreviewImage(user.profileImage || null);
    } catch (error) {
      console.log(error, 'Error fetching data');
    }
  };
  
    useEffect(()=>{
      fetchData()
    },[])

useEffect(()=>{
  console.log("Edit Form Data",editFormData)
},[editFormData,previewImage])
useEffect(()=>{
  console.log("User Data",userData)
},[userData])
  const handlefileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file) {
      setEditFormData((prev)=> ({...prev,profileImage : file}))
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }
  const handleEditImg = () =>{
    const imgInput = fileInputRef.current
    console.log(imgInput)
    if(imgInput){
      imgInput.click()
    }
  }
  const handleEditClick = () =>{
    setModalVisible(true)
    setEditFormData({
      name : userData.name,
      phone : userData.phone,
      gender : userData.gender,
      dateOfBirth: userData.dateOfBirth
    })
    setPreviewImage(userData.profileImage)
    setModalVisible(true)

  }
  const handleEditSave = async () =>{
    setLoader(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    if (editFormData.name?.trim()) {
      formData.append('name', editFormData.name);
    }
  
    if (editFormData.email?.trim()) {
      formData.append('email', editFormData.email);
    }
  
    if (editFormData.phone?.trim()) {
      formData.append('phone', editFormData.phone);
    }
  
    if (editFormData.gender?.trim()) {
      formData.append('gender', editFormData.gender);
    }
  
    if (editFormData.dateOfBirth?.trim()) {
      formData.append('dateOfBirth', editFormData.dateOfBirth);
    }
  
    if (editFormData.profileImage) {
      formData.append('profileImage', editFormData.profileImage);
    }
  
    console.log("Sending:", [...formData.entries()]); 

    try {
     const response = await axios.post(`https://doc-q-book.vercel.app/api/update-profile`,formData,{
        headers:{
          "Content-Type": 'multipart/form-data',
          Authorization:`Bearer ${token}`
        }
      })
        if(response.status === 200 && response.data.user){
          // toast.info('Profile updated successfully!');
          fetchData()
            setModalVisible(false)
        } 
        if(response.data.status === 500){
          toast.info('Profile image upload failed', {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
        });
        setModalVisible(true)
        }
     
    } catch (error) {
      console.log(error, "Error Post Data")
    }finally {
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <Container className='profile-container'>
            <div>
                  {
                    userData.profileImage === null ? <div className='change-img-icon'>
                    <FontAwesomeIcon icon={faCircleUser} className='usericon'/>
                  </div> :
                  <div className='profile-img'>
                      <img src={userData.profileImage} alt='user profile img'/>
                  </div>
                  }
                <div className='userName'>
                  <h2>{userData.name}</h2>
                </div>
                <div >
                  <span className='contact-information'>CONTACT INFORMATION</span>  
                  <div className='form'>

                    <div className='informations'>
                      <span className='key'>Email id:</span>
                      <input disabled value={userData.email} className='value'/>
                    </div>

                    <div className='informations'>
                      <span className='key'>Phone:</span> 
                      <input disabled type='text' name='phone' value={userData.phone} className='value'/>
                    </div>

                    <div className='informations' style={{ marginBottom: '20px' }}>
                      <span className='key'>Address: </span>
                      <input disabled type='text' name='address' value={userData.address} className='value'/>
                    </div>

                    {/* basic informaiton */}
                    <span className='basic-information'>BASIC INFORMATION</span>

                    <div className='informations-select'>
                      <span className='key'>Gender</span>
                      <select disabled className='value' name='gender' value={userData.gender}>
                        <option value="">Not select</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>
                    <div className='informations-birthday'>
                      <span className='key'>Birthday</span>
                      <input disabled type='date' value={userData.dateOfBirth}/>
                    </div>
                    <button className='edit-btn addDr-btn' onClick={(e)=> {
                      e.stopPropagation();
                      setEditable(!editable);
                      handleEditClick()
                    }}>Edit</button>
                  </div>
                </div>
            </div>
            <Modal show={modalVisible} onHide={()=> setModalVisible(false)}>
              <Modal.Header closeButton={()=> {
                setModalVisible(false);
              }}/>
                <Modal.Title>Update Profile</Modal.Title>
                <Modal.Body>
                  <form onSubmit={(e)=> {
                    e.preventDefault();
                  }}>
                    <div className="modal-form">
                      <div className='modal-img'>
                        <div className='modal-img-wrapper'>
                          <input type='file'  ref={fileInputRef} onChange={handlefileChange} className='d-none'/>
                      {
                        previewImage === null ? <div className='change-img-icon'>
                        <FontAwesomeIcon icon={faCircleUser} className='usericon'/>
                      </div> :
                        <div className='profile-img'>
                          <img src={previewImage} alt='Image1'/>
                        </div>
                      }
                        </div>
                       <button className='btn edit-btn' onClick={handleEditImg}>Change</button>
                      </div>
                      <div className='modal-informations'>
                          <div className='modal-userName'>
                            <label className='key'>Full Name</label>
                            <input type='text' value={editFormData.name} name='name' className='value' onChange={handleChange} placeholder='Enter Name'/>
                          </div>
                        <div className='modal-email'>
                          <label className='key'>Email Id</label>
                          <input type='email' disabled value={editFormData.email} name='email' className='value' onChange={handleChange} placeholder='Enter Email'/>
                        </div>
                        <div className='modal-phone'>
                          <label className='key'>Phone</label>
                          <input type='text' name='phone' value={editFormData.phone} className='value' onChange={handleChange} placeholder='Enter Phone'/>
                        </div>
                        <div className='modal-gender'>
                          <label className="key">Gender</label>
                          <select name='gender' value={editFormData.gender} onChange={handleChange}>
                            <option value="">Not Selected</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                          </select>
                        </div>
                        <div className='modal-birthday'>
                          <label className='key'>Birthday</label>
                          <input type='date' value={editFormData.dateOfBirth} name='dateOfBirth' className='value' onChange={handleChange}/>
                        </div>
                      </div>
                    </div>
                  <button type='submit' className='addDr-btn px-3 py-2 saveBtn' onClick={()=> handleEditSave()}>
                    Save
                  </button>
                  </form>
                </Modal.Body>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </Container>
    </>
  )}
export default Profile
