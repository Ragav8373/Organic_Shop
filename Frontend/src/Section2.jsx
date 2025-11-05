import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Section2(){
  const navigate = useNavigate();
  return(
    <div className='section2'>
    <Container fluid>
      <Row className='row2' style={{gap:'20px'}}>
        <Col sm={12} md={4} lg={4} xl={4} xxl={4} className='box1 '>
        <div className='text5'>
          <div className='r1'></div>
          <p className='pa1'>100% Organic</p>
          <h3 className='text3'>Quality Organic
            <br />
          Food Store</h3>
          {/* <button className='button1'>SHOP NOW</button> */}
           <button className="button1" onClick={() => navigate("/products")}>SHOP NOW</button>
        </div>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4} xxl={4} className='box2'>
        <div className='r1'></div>
        <div className='text5'>
        <p className='pa2'>100% Organic</p>
          <h3 className='text4'>Healthy Products
            <br />
            Everyday
            </h3>
            {/* <button className='button2'>SHOP NOW</button> */}
            <button className="button2" onClick={() => navigate("/products")}>SHOP NOW</button>
        </div>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4} xxl={4} className='box3'>
        <div className='text5'>
          <div className='r3'></div>
            <p className='pa2'>100% Organic</p>
             <h3 className='text4'>Pure Natural
            <br />
            Products</h3>
            {/* <button className='button3'>SHOP NOW</button> */}
            <button className="button3" onClick={() => navigate("/products")}>SHOP NOW</button>
        </div>
        </Col>  
      </Row>
    </Container>
  </div>
  )
   
}
export default Section2;