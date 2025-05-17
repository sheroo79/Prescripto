import React from 'react'
import { Container } from 'react-bootstrap'
import '../Css/footer.scss'
import { useNavigate } from 'react-router-dom'
function Footer() {
  const navigate = useNavigate()
  return (
    <>
        <Container>
      <div className='footer-wrapper'>
        <div className='f-1'>
          <img src='https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg' alt='f-img'/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className='f-2'>
          <h3>Company</h3>
          <ul>
            <li onClick={()=> navigate('/')}>Home</li>
            <li onClick={()=> navigate('/doctors')}>All Doctors</li>
            <li onClick={()=> navigate('/about')}>About</li>
            <li onClick={()=> navigate('/contact')}>Contact</li>
          </ul>
        </div>
        <div className='f-3'>
          <h3>Get in touch</h3>
          <ul>
            <li>+0-000-000-000</li>
              <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className='copyright'>
        <p>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
      </div>
    </Container>
    </>
  )
}

export default Footer
