import React from 'react'
import '../Css/contact.scss'
import { Container } from 'react-bootstrap'

function Contact() {
  return (
    <>
      <Container className='contact-wrapper'>
        <h3>CONTACT US</h3>
                      <div className='contact'>
                      <img src="images/contact_image.png" alt='contact'/>
                        <div className='contact-para'>
                        <h5>OUR OFFICE</h5>
                          <p>
                          00000 Willms Station<br/>
                          Suite 000, Washington, USA<br/><br/>
            
                          Tel: (000) 000-0000<br/>
                          Email: greatstackdev@gmail.com<br/><br/>
            
                          <h4>CAREERS AT PRESCRIPTO</h4><br/>
            
                            Learn more about our teams and job openings.
                          </p>
                          <button className='explore-btn'>Explore Jobs</button>
                        </div>
                    </div>
      </Container>
    </>
  )
}

export default Contact
