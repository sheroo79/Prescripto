
import '../Css/about.scss'
import { Container } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
function About() {
  return (
    <>
      <Container className='About-wrapper'>
         <h3>ABOUT US</h3>
              <div className='about'>
                <img src='/images/about_image.png' alt='About-img'/>
                <p>
                Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.<br/><br/>

                Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.<br/><br/>

                <span>Our Vision</span><br/><br/>
                Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                </p>
              </div>        
        <div className='choice-wrapper'>
          <h4>WHY CHOOSE US</h4>
         <div className='choice'>
            <div className='box-1'>
            <h6>EFFICIENCY:</h6>
            <p>
              Streamlined<br/> appointment<br/> scheduling that fits into<br/> your busy lifestyle.
            </p>
            </div>
            <div className='box-2'>
            <h6>CONVENIENCE:</h6>
            <p>
              Access to a network of<br/> trusted healthcare<br/> professionals in your
              <br/>area.
            </p>
            </div>
            <div className='box-3'>
            <h6>PERSONALIZATION:</h6>
            <p>
            Tailored recommendations<br/> and reminders to help you<br/> stay on top of your health.
            </p>
            </div>
         </div>
        </div>
      </Container>
    </>
  )
}

export default About
