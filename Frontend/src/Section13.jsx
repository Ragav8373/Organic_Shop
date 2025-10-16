// import { Button, Col,Container, Row} from 'react-bootstrap';
// import {  FaLocationArrow , FaPhoneSquare, FaEnvelope } from 'react-icons/fa';
// import { Link } from 'react-router-dom';


// function Section13(){
//     return(
//         <div className="section13">
//             <div className='sec8bg'>
//              <h1 className='sec8h1'>Contact Us</h1>
//              <ul className='sec8ul'>
//              <li className='sec8li1'>
//                  <Link to='/'  style={{ color: '#f8ca38' ,textDecoration:'none'}} className='link'>Home</Link>
//                  </li>
//              <li>Contact</li>
//              </ul>
//             </div>
//             <div>
//                 <Container>
//                     <Row className='sec13r1'>
//                         <Col sm={6} md={6} lg={6} xl={7}>
//                           <div className='sec13b1'>
//                             <p className='sec13p1'>Send us email</p>
//                             <h2 className='sec13h2'>Feel free to write</h2>
//                             <Row>
//                                 <Col className='mb-3'>
//                                 <input type="text" placeholder='Enter Name' className='sec13input' />
//                                 </Col>
//                                 <Col className='mb-3'>
//                                 <input type="email" placeholder='Enter Email' className='sec13input'/>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col className='mb-3'>
//                                 <input type="text" placeholder='Enter Subject' className='sec13input'/>
//                                 </Col>
//                                 <Col className='mb-3'>
//                                 <input type="text" placeholder='Enter Phone'  className='sec13input'/>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col className='mb-3'>
//                                 <textarea name="" id="" placeholder='Enter Message' className='sec13text'></textarea>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                 <Button className='sec13btn1'>Send message</Button>
//                                 </Col>
//                                 <Col>
//                                 <Button className='sec13btn2'>reset</Button>
//                                 </Col>
//                             </Row>
//                           </div>
//                         </Col>
//                         <Col sm={6} md={6} lg={6} xl={5} >
//                         <div>
//                             <p className='sec13p2'>Need any help?</p>
//                             <h2 className='sec13h22'>Get in touch with us</h2>
//                             <p className='sec13p3'>Lorem ipsum is simply free text available dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt simply free labore dolore magna.
//                             </p>
//                         </div>
//                         <div>
//                           <ul className='sec23ul1'>
//                             <li>
//                                 <Row>
//                                     <Col lg={3} className='sec13icon11'><FaPhoneSquare className='sec13icon1'/></Col>
//                                     <Col lg={9} className='sec13text1'> 
//                                     <h6 className='sec13h6'> Have any question?</h6>
//                                     <p className='sec13p4 p4'>91+ 6380962804</p>
//                                     </Col>
//                                 </Row>
//                             </li>
//                             <li>
//                                 <Row>
//                                     <Col  lg={3} className='sec13icon11'><FaEnvelope className='sec13icon1'/></Col>
//                                     <Col  lg={9} className='sec13text1'>
//                                     <h6 className='sec13h6'>Write email</h6>
//                                     <p className='sec13p4 p4' >Organicshop@company.com</p>
//                                     </Col>
//                                 </Row>
//                             </li>
//                             <li>
//                                 <Row>
//                                     <Col  lg={3} className='sec13icon11'><FaLocationArrow  className='sec13icon1'/></Col>
//                                     <Col  lg={9} className='sec13text1'>
//                                     <h6 className='sec13h6'> Visit anytime</h6>
//                                     <p className='sec13p4 '>66 road, gp street, Cbe</p>
//                                     </Col>
//                                 </Row>
//                             </li>
//                           </ul>
//                         </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </div>
//     )
// }
// export default Section13;
// src/Components/Section13.js
import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaLocationArrow, FaPhoneSquare, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './Section13.css'; // Optional

function Section13() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post(`${process.env.REACT_APP_API_URL}/contact`, formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to send message. Try again later.');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
  };

  return (
    <div className="section13">
      <div className='sec8bg'>
        <h1 className='sec8h1'>Contact Us</h1>
        <ul className='sec8ul'>
          <li className='sec8li1'>
            <Link to='/' style={{ color: '#f8ca38', textDecoration: 'none' }}>Home</Link>
          </li>
          <li>Contact</li>
        </ul>
      </div>

      <Container>
        <Row className='sec13r1'>
          {/* Form Section */}
          <Col sm={6} md={6} lg={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className='sec13b1'>
                <p className='sec13p1'>Send us email</p>
                <h2 className='sec13h2'>Feel free to write</h2>

                <Row>
                  <Col className='mb-3'>
                    <input
                      type="text"
                      name="name"
                      placeholder='Enter Name'
                      className='sec13input'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col className='mb-3'>
                    <input
                      type="email"
                      name="email"
                      placeholder='Enter Email'
                      className='sec13input'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className='mb-3'>
                    <input
                      type="text"
                      name="subject"
                      placeholder='Enter Subject'
                      className='sec13input'
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className='mb-3'>
                    <input
                      type="text"
                      name="phone"
                      placeholder='Enter Phone'
                      className='sec13input'
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className='mb-3'>
                    <textarea
                      name="message"
                      placeholder='Enter Message'
                      className='sec13text'
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Button type="submit" className='sec13btn1'>Send message</Button>
                  </Col>
                  <Col>
                    <Button type="button" className='sec13btn2' onClick={handleReset}>Reset</Button>
                  </Col>
                </Row>
              </div>
            </form>
          </Col>

          {/* Contact Info */}
          <Col sm={6} md={6} lg={6} xl={5}>
            <div>
              <p className='sec13p2'>Need any help?</p>
              <h2 className='sec13h22'>Get in touch with us</h2>
              <p className='sec13p3'>
                Lorem ipsum is simply free text available dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt simply free labore dolore magna.
              </p>
            </div>
            <ul className='sec23ul1'>
              <li>
                <Row>
                  <Col lg={3} className='sec13icon11'><FaPhoneSquare className='sec13icon1' /></Col>
                  <Col lg={9}>
                    <h6 className='sec13h6'>Have any question?</h6>
                    <p className='sec13p4'>+91 6380962804</p>
                  </Col>
                </Row>
              </li>
              <li>
                <Row>
                  <Col lg={3} className='sec13icon11'><FaEnvelope className='sec13icon1' /></Col>
                  <Col lg={9}>
                    <h6 className='sec13h6'>Write email</h6>
                    <p className='sec13p4'>organicshop@company.com</p>
                  </Col>
                </Row>
              </li>
              <li>
                <Row>
                  <Col lg={3} className='sec13icon11'><FaLocationArrow className='sec13icon1' /></Col>
                  <Col lg={9}>
                    <h6 className='sec13h6'>Visit anytime</h6>
                    <p className='sec13p4'>66 Road, GP Street, Coimbatore</p>
                  </Col>
                </Row>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Section13;
