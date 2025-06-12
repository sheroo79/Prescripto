import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Container, Modal, ModalFooter } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import '../Css/profile.scss';
import { useGetUserDataQuery, useUpdateProfileMutation } from '../features/ApiSlice';


function Profile() {
  // Get Data From Api
  const token = localStorage.getItem('token')
  const {data,refetch} = useGetUserDataQuery()
  useEffect(() => {
  if (token) {
    refetch();
  }
}, [token]);
  console.log(data?.user)
  // POST data from Api
  const [updateProfile,{isLoading}]= useUpdateProfileMutation()
  const userData = useSelector((state) => state.user);
  const [editable, setEditable] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [previewImage , setPreviewImage] = useState(null)
  const [editFormData, setEditFormData] = useState({name : '',email:'',gender:'',dateOfBirth:'',profileImage:null})
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
const formattedDate = data?.user?.dateOfBirth ? data?.user.dateOfBirth.split("T")[0] : '';

useEffect(()=>{
  console.log("Edit Form Data",editFormData)
},[editFormData,previewImage])
useEffect(()=>{
  console.log("User Data",data?.user)
  setEditFormData({
      dateOfBirth: formattedDate
    })
},[data?.user])
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
    setEditFormData({
      name : data?.user?.name,
      phone : data?.user?.phone,
      email : data?.user?.email,
      gender : data?.user?.gender,
      dateOfBirth: formattedDate
    })
    setPreviewImage(data?.user?.profileImage)
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
  
    // if (editFormData.phone?.trim()) {
    //   formData.append('phone', editFormData.phone);
    // }
  
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
     const response = await updateProfile(formData).unwrap()
      console.log("Responce From Api Post",response)
      if(response.status === 200){
        toast.info('Profile updated successfully!', {
          position: "top-right",
            autoClose: 2000,
            theme: "colored"
        });
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
      <ToastContainer theme='colored' autoClose={2000} className="custom-toast" />
        <Container className='profile-container'>
            <div>
                  {
                    !data?.user?.profileImage ? (
                      <div className='change-img-icon'>
                        <FontAwesomeIcon icon={faCircleUser} className='usericon' />
                      </div>
                    ) : (
                      <div className='profile-img'>
                        <img src={data.user.profileImage} alt='user profile img' className='mt-3' />
                      </div>
                    )
                  }
                <div className='userName'>
                  <h2>{data?.user?.name}</h2>
                </div>
                <div >
                  <span className='contact-information'>CONTACT INFORMATION</span>  
                  <div className='form'>

                    <div className='informations'>
                      <span className='key'>Email id:</span>
                      <input disabled value={data?.user?.email} className='value'/>
                    </div>

                    <div className='informations'>
                      <span className='key'>Phone:</span> 
                      <input disabled type='text' name='phone' value={data?.user?.phone} className='value'/>
                    </div>

                    <div className='informations' style={{ marginBottom: '20px' }}>
                      <span className='key'>Address: </span>
                      <input disabled type='text' name='address' value={data?.user?.address} className='value'/>
                    </div>

                    {/* basic informaiton */}
                    <span className='basic-information'>BASIC INFORMATION</span>

                    <div className='informations-select'>
                      <span className='key'>Gender</span>
                      <select disabled className='value' name='gender' value={data?.user?.gender}>
                        <option value="">Not select</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>
                    <div className='informations-birthday'>
                      <span className='key'>Birthday</span>
                      <input disabled value={formattedDate}/>
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
                  <button type='submit' className='saveBtn addDr-btn' onClick={()=> handleEditSave()}>
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
